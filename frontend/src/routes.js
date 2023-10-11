import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import Person3Icon from '@mui/icons-material/Person3';
import Person4Icon from '@mui/icons-material/Person4';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TransferIcon from '@mui/icons-material/TransferWithinAStation';
import PaidIcon from '@mui/icons-material/Paid';
import Badge from '@mui/icons-material/Badge';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import RegisterCitizen from './components/citizenship/RegisterCitizen';
import AddOwner from './components/citizenship/AddOwner';
import RemoveOwner from './components/citizenship/RemoveOwner';
import ChangePresident from './components/citizenship/ChangePresident';
import RegisterElectee from './components/election/RegisterElectee';
import RegisterElector from './components/election/RegisterElector';
import Elect from './components/election/Elect';
import StartFinish from './components/election/StartFinish';
import Mint from './components/money/Mint';
import Burn from './components/money/Burn';
import Transfer from './components/money/Transfer';
import ChangeMinister from './components/badge/ChangeMinister';
import SetMinisterBadgeId from './components/badge/SetMinisterBadgeId';
import React from 'react';

export const routes = [
  {
    id: 'citizen',
    name: 'Citizen',
    icon: <PeopleAltIcon/>,
    pages: [
      {
        path: '/register-citizen',
        id: 'register_citizen',
        name: 'Register Citizen',
        icon: <PersonIcon/>,
        page: <RegisterCitizen/>,
      },
      {
        path: '/add-owner',
        id: 'add_owner',
        name: 'Add Owner',
        icon: <Person3Icon/>,
        page: <AddOwner/>,
      },
      {
        path: '/remove-owner',
        id: 'remove_owner',
        name: 'Remove Owner',
        icon: <Person3Icon/>,
        page: <RemoveOwner/>,
      },
      {
        path: '/change-president',
        id: 'change_president',
        name: 'Change President',
        icon: <Person4Icon/>,
        page: <ChangePresident/>,
      },
    ],
  },


  {
    id: 'election',
    name: 'Election',
    icon: <HowToVoteIcon/>,
    pages: [
      {
        path: '/register-electee',
        id: 'register_electee',
        name: 'Register Electee',
        icon: <HowToRegIcon/>,
        page: <RegisterElectee/>,
      },
      {
        path: '/register-elector',
        id: 'register_elector',
        name: 'Register Elector',
        icon: <PersonIcon/>,
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
        icon: <PlayCircleFilledIcon/>,
        page: <StartFinish/>,
      },
    ],
  },


  {
    id: 'money',
    name: 'Money',
    icon: <PaidIcon/>,
    pages: [
      {
        path: '/mint',
        id: 'mint',
        name: 'Mint',
        icon: <AddCircleIcon/>,
        page: <Mint/>,
      },
      {
        path: '/burn',
        id: 'burn',
        name: 'Burn',
        icon: <RemoveCircleIcon/>,
        page: <Burn/>,
      },
      {
        path: '/transfer',
        id: 'transfer',
        name: 'Transfer',
        icon: <TransferIcon/>,
        page: <Transfer/>,
      },
    ],
  },


  {
    id: 'badge',
    name: 'Badge',
    icon: <MilitaryTechIcon/>,
    pages: [
      {
        path: '/set-minister-badge-id',
        id: 'set_minister_badge_id',
        name: 'Set Minister Badge Id',
        icon: <AddModeratorIcon/>,
        page: <SetMinisterBadgeId/>,
      },
      {
        path: '/change-minister',
        id: 'change_minister',
        name: 'Change Minister',
        icon: <RemoveModeratorIcon/>,
        page: <ChangeMinister/>,
      },
    ],
  },
];
