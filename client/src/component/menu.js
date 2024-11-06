import React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import HouseIcon from "@mui/icons-material/House";
import MedicationIcon from "@mui/icons-material/Medication";
import LogoutIcon from "@mui/icons-material/Logout";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ElderlyIcon from "@mui/icons-material/Elderly";
import ContactsIcon from "@mui/icons-material/Contacts";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { matchPath, useLocation } from "react-router-dom";
import ElderlyPage from "../main/elderly";
import RoomPage from "../main/room";
import { useEffect } from "react";
import CreateRoom from "../main/room/create";
import EditRoom from "../main/room/edit";
import { SnackbarProvider } from "notistack";
import MedicinePage from "../main/medic";
import CreateMedicine from "../main/medic/create";
import EditMedicine from "../main/medic/edit";

const NAVIGATION = [
  {
    kind: "header",
    title: "หน้าแรก",
  },
  {
    segment: "dashboard",
    title: "ภาพรวม",
    icon: <DashboardIcon />,
  },

  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "จัดการข้อมูล",
  },
  {
    segment: "house",
    title: "ข้อมูลบ้านพัก",
    icon: <HouseIcon />,
    children: [
      {
        segment: "room",
        title: "ห้องพัก",
        icon: <BedroomChildIcon />,
      },
    ],
  },
  {
    segment: "medicine",
    title: "ข้อมูลยา",
    icon: <MedicationIcon />,
  },
  {
    segment: "profile",
    title: "ข้อมูลบุคคล",
    icon: <FolderIcon />,
    children: [
      {
        segment: "employee",
        title: "เจ้าหน้าที่",
        icon: <SupervisorAccountIcon />,
      },
      {
        segment: "elderly",
        title: "ผู้สูงอายุ",
        icon: <ElderlyIcon />,
      },
      {
        segment: "relative",
        title: "ญาติ",
        icon: <ContactsIcon />,
      },
    ],
  },
  {
    segment: "contact",
    title: "ข้อมูลสัญญา",
    icon: <ImportContactsIcon />,
  },
  { kind: "divider" },
  {
    segment: "logout",
    title: "ออกจากระบบ",
    icon: <LogoutIcon />,
  },
  { kind: "divider" },
];

const demoTheme = extendTheme({
  typography: {
    fontFamily:
      'IBM Plex Sans Thai, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 15,
  },

  // colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
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
    const path = location.pathname;

    // ตรวจสอบ path สำหรับ room
    const roomMatch = matchPath("/house/room/edit/:roomId", path);

    // ตรวจสอบ path สำหรับ medicine
    const medicineMatch = matchPath("/medicine/edit/:medicId", path);

    if (path === "/house/room") {
      setCurrentComponent(<RoomPage />);
    } else if (path === "/house/room/create") {
      setCurrentComponent(<CreateRoom />);
    } else if (roomMatch) {
      const { roomId } = roomMatch.params; // ดึง roomId ออกมา
      setCurrentComponent(<EditRoom roomId={roomId} />); // ส่ง roomId ให้กับ EditRoom
    } else if (path === "/medicine") {
      setCurrentComponent(<MedicinePage />);
    } else if (path === "/medicine/create") {
      setCurrentComponent(<CreateMedicine />);
    } else if (medicineMatch) {
      const { medicId } = medicineMatch.params; // ดึง medicId ออกมา
      setCurrentComponent(<EditMedicine medicId={medicId} />); // ส่ง medicId ให้กับ EditMedicine
    } else if (path === "/profile/elderly") {
      setCurrentComponent(<ElderlyPage />);
    } else {
      setCurrentComponent(null);
    }
  }, [location]);

  return (
    <div className="ibm-plex-sans-thai-extralight">
      <SnackbarProvider maxSnack={3}>
        <AppProvider
          navigation={NAVIGATION}
          theme={demoTheme}
          window={window}
          branding={{
            logo: <img src="/logo/camillian-logo.png" alt="" />,
            title: "บ้านพักผู้สูงอายุ คามิลเลี่ยน",
          }}
        >
          <DashboardLayout sx={{ backgroundColor: "#f8f9fa" }}>
            <PageContainer
              style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div style={{ marginTop: "20px" }}>{currentComponent}</div>
            </PageContainer>
          </DashboardLayout>
        </AppProvider>
      </SnackbarProvider>
    </div>
  );
}
