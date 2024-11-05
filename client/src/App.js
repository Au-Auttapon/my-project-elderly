// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import TemplateMain from "./component/menu"; // ปรับตาม component ของคุณ

const App = () => {
  return (
    <div className="ibm-plex-sans-thai-extralight">
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Routes>
            <Route path="/*" element={<TemplateMain />} />
            {/* เส้นทางอื่น ๆ */}
          </Routes>
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
