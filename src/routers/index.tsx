import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Login } from "../mod-general-structure/pages/Login";
import { Home } from "../mod-general-structure/pages/Home";
import { Audit } from "../mod-general-structure/pages/Audit";
import { Email } from "../mod-general-structure/pages/Email";
import { User } from "../mod-general-structure/pages/User";
import { ContratosHome } from "../mod-general-structure/pages/Contracts";

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
        <Route path="/auditoria" element={<Audit />} />
        <Route path="/email" element={<Email />} />
        <Route path="/usuario" element={<User/>} />
        <Route path="/contratos/home" element={<ContratosHome/>} />
      </Routes>
    </BrowserRouter>
  );
}
