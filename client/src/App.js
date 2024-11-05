// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateMain from "./component/menu"; // ปรับตาม component ของคุณ

const App = () => {
  return (
    <div className="ibm-plex-sans-thai-extralight">
      <Router>
        <Routes>
          <Route path="/*" element={<TemplateMain />} />
          {/* เส้นทางอื่น ๆ */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
