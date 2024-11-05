import React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import HouseIcon from '@mui/icons-material/House';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ContactsIcon from '@mui/icons-material/Contacts';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useLocation } from 'react-router-dom';
import ElderlyPage from '../main/elderly';
import RoomPage from '../main/room';
import { useEffect } from 'react';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'หน้าแรก',
  },
  {
    segment: 'dashboard',
    title: 'ภาพรวม',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'จัดการข้อมูล',
  },
  {
    segment: 'house',
    title: 'ข้อมูลบ้านพัก',
    icon: <HouseIcon />,
    children: [
      {
        segment: 'room',
        title: 'ห้องพัก',
        icon: <BedroomChildIcon />,
      },
    ],
  },
  {
    segment: 'profile',
    title: 'ข้อมูลบุคคล',
    icon: <FolderIcon />,
    children: [
      {
        segment: 'employee',
        title: 'เจ้าหน้าที่',
        icon: <SupervisorAccountIcon />,
      },
      {
        segment: 'elderly',
        title: 'ผู้สูงอายุ',
        icon: <ElderlyIcon />,
      },
      {
        segment: 'relative',
        title: 'ญาติ',
        icon: <ContactsIcon />,
      },
    ],
  },
  { kind: 'divider' },
];

const demoTheme = extendTheme({
  typography: {
    fontFamily: 'IBM Plex Sans Thai, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 15
  },
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  
});

export default function TemplateMain(props) {
  const { window } = props;
  const location = useLocation();
  const [currentComponent, setCurrentComponent] = React.useState(null);

  useEffect(() => {
    const componentMap = {
      '/house/room': <RoomPage />,
      '/profile/elderly': <ElderlyPage />,
      // Add more paths and components as needed
    };

    setCurrentComponent(componentMap[location.pathname] || null);
  }, [location]);

  return (
    <div className='ibm-plex-sans-thai-extralight'>
    <AppProvider
      navigation={NAVIGATION} // ส่ง navigate ไปยัง NAVIGATION
      theme={demoTheme}
      window={window}
      branding={{
        logo: <img src="/logo/camillian-logo.png" alt="" />,
        title: 'บ้านพักผู้สูงอายุ คามิลเลี่ยน',
      }}
    >
      <DashboardLayout>
        <PageContainer style={{ maxWidth: '1500px', width: '100%', margin: '0 auto' }}>
          {currentComponent}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    </div>
  );
}
