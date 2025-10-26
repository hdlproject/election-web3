#!/usr/bin/env bash
# Compile Truffle contracts and extract ABIs into backend/abi using only npx.
# Installs jq if missing (Homebrew) and installs dependencies if node_modules absent.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."
ARTIFACTS_DIR="$PROJECT_ROOT/build/contracts"
OUT_DIR="$PROJECT_ROOT/abi"

# Ensure jq
if ! command -v jq >/dev/null 2>&1; then
  echo "jq not found. Attempting Homebrew install..." >&2
  if command -v brew >/dev/null 2>&1; then
    brew install jq || { echo "Failed to install jq." >&2; exit 1; }
  else
    echo "Homebrew not found. Install jq manually and re-run." >&2
    exit 1
  fi
fi

# Ensure dependencies (simple heuristic)
if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
  echo "node_modules not found. Installing project dependencies..." >&2
  if [ -f "$PROJECT_ROOT/yarn.lock" ]; then
    (cd "$PROJECT_ROOT" && yarn install --silent)
  else
    (cd "$PROJECT_ROOT" && npm install --no-audit --no-fund)
  fi
fi

echo "Compiling contracts via npx truffle compile..."
npx truffle compile

mkdir -p "$OUT_DIR"

if [ ! -d "$ARTIFACTS_DIR" ]; then
  echo "Artifacts directory not found after compile: $ARTIFACTS_DIR" >&2
  exit 1
fi

count=0
shopt -s nullglob
for f in "$ARTIFACTS_DIR"/*.json; do
  contract_name="$(jq -r '.contractName // empty' "$f")"
  if [ -z "$contract_name" ]; then
    echo "Skipping (no contractName): $f"
    continue
  fi
  if jq -e '.abi' "$f" >/dev/null 2>&1; then
    jq '.abi' "$f" > "$OUT_DIR/${contract_name}.json"
    echo "Wrote ABI: $OUT_DIR/${contract_name}.json"
    count=$((count+1))
  else
    echo "Skipping (no abi): $f"
  fi
done
shopt -u nullglob

echo "ABI extraction complete. Total: $count file(s) -> $OUT_DIR"
