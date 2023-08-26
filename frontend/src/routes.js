import FaceIcon from '@mui/icons-material/Face';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import RegisterCitizen from './components/RegisterCitizen';
import RegisterElectee from "./components/RegisterElectee";
import RegisterElector from "./components/RegisterElector";
import Elect from "./components/Elect";

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
];
