import FaceIcon from '@mui/icons-material/Face';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import RegisterCitizen from './components/citizenship/RegisterCitizen';
import AddOwner from "./components/citizenship/AddOwner";
import RemoveOwner from "./components/citizenship/RemoveOwner";
import ChangePresident from "./components/citizenship/ChangePresident";
import RegisterElectee from "./components/election/RegisterElectee";
import RegisterElector from "./components/election/RegisterElector";
import Elect from "./components/election/Elect";
import StartFinish from "./components/election/StartFinish";
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
    path: '/add-owner',
    id: 'add_owner',
    name: 'Add Owner',
    icon: <HowToVoteIcon/>,
    page: <AddOwner/>,
  },
  {
    path: '/remove-owner',
    id: 'remove_owner',
    name: 'Remove Owner',
    icon: <HowToVoteIcon/>,
    page: <RemoveOwner/>,
  },
  {
    path: '/change-president',
    id: 'change_president',
    name: 'Change President',
    icon: <HowToVoteIcon/>,
    page: <ChangePresident/>,
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
