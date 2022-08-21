import FaceIcon from '@mui/icons-material/Face';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import RegisterCitizen from './components/RegisterCitizen';

export const routes = [
  {
    path: '/citizenship',
    id: 'citizenship',
    name: 'Citizenship',
    icon: <FaceIcon/>,
    page: <RegisterCitizen/>,
  },
  {
    path: '/election',
    id: 'election',
    name: 'Election',
    icon: <HowToVoteIcon/>,
  },
];
