#!/usr/bin/env bash
# Sync selected contract ABI JSON files from backend/abi to chain-sdk/abi
# Usage: bash scripts/sync-abi.sh [--all]
# If --all is provided, copies every JSON in backend/abi. Otherwise only core contracts.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SDK_ROOT="$SCRIPT_DIR/.."
BACKEND_ABI_DIR="$SDK_ROOT/../backend/abi"
DEST_ABI_DIR="$SDK_ROOT/abi"
CORE_CONTRACTS=(Citizenship Money Election Badge)

if [ ! -d "$BACKEND_ABI_DIR" ]; then
  echo "Source ABI directory not found: $BACKEND_ABI_DIR" >&2
  echo "Run: (cd backend && npm run abi) first." >&2
  exit 1
fi

mkdir -p "$DEST_ABI_DIR"

if [[ "${1:-}" == "--all" ]]; then
  echo "Copying ALL ABI JSON artifacts..."
  cp -f "$BACKEND_ABI_DIR"/*.json "$DEST_ABI_DIR" 2>/dev/null || true
else
  echo "Copying core contract ABIs: ${CORE_CONTRACTS[*]}";
  for name in "${CORE_CONTRACTS[@]}"; do
    src="$BACKEND_ABI_DIR/$name.json"
    if [ -f "$src" ]; then
      cp -f "$src" "$DEST_ABI_DIR/$name.json"
      echo "Copied $name.json"
    else
      echo "Warning: $name.json not found in backend/abi (generate ABIs first)" >&2
    fi
  done
fi

echo "ABI sync complete -> $DEST_ABI_DIR"
