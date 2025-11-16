import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Login } from "../../mod-general-structure/pages/Login";
import { Home } from "../../mod-general-structure/pages/Home";
import { Audit } from "../../mod-general-structure/pages/Audit";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Auditoria" element={<Audit />} />
      </Routes>
    </BrowserRouter>
  );
}
