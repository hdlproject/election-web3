import FaceIcon from '@mui/icons-material/Face';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import RegisterCitizen from './components/citizenship/RegisterCitizen';
import RegisterElectee from "./components/election/RegisterElectee";
import RegisterElector from "./components/election/RegisterElector";
import Elect from "./components/election/Elect";
import StartFinish from "./components/election/StartFinish";
import AddMinter from "./components/money/AddMinter";
import RemoveMinter from "./components/money/RemoveMinter";
import Mint from "./components/money/Mint";
import Burn from "./components/money/Burn";
import Transfer from "./components/money/Transfer";

export const routes = [
  {
    path: '/register-citizen',
    id: 'register_citizen',
    name: 'Register Citizen',
    icon: <FaceIcon/>,
    page: <RegisterCitizen/>,
  },

  {
    path: '/register-electee',
    id: 'register_electee',
    name: 'Register Electee',
    icon: <FaceIcon/>,
    page: <RegisterElectee/>,
  },
  {
    path: '/register-elector',
    id: 'register_elector',
    name: 'Register Elector',
    icon: <FaceIcon/>,
    page: <RegisterElector/>,
  },
  {
    path: '/elect',
    id: 'elect',
    name: 'Elect',
    icon: <HowToVoteIcon/>,
    page: <Elect/>,
  },
  {
    path: '/start-finish',
    id: 'start_finish',
    name: 'Start Finish',
    icon: <HowToVoteIcon/>,
    page: <StartFinish/>,
  },

  {
    path: '/add-minter',
    id: 'add_minter',
    name: 'Add Minter',
    icon: <HowToVoteIcon/>,
    page: <AddMinter/>,
  },
  {
    path: '/remove-minter',
    id: 'remove_minter',
    name: 'Remove Minter',
    icon: <HowToVoteIcon/>,
    page: <RemoveMinter/>,
  },
  {
    path: '/mint',
    id: 'mint',
    name: 'Mint',
    icon: <HowToVoteIcon/>,
    page: <Mint/>,
  },
  {
    path: '/burn',
    id: 'burn',
    name: 'Burn',
    icon: <HowToVoteIcon/>,
    page: <Burn/>,
  },
  {
    path: '/transfer',
    id: 'transfer',
    name: 'Transfer',
    icon: <HowToVoteIcon/>,
    page: <Transfer/>,
  },
];
