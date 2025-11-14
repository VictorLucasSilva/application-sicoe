import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from '../../mod-general-structure/pages/Login';
import { Home } from '../../mod-general-structure/pages/Home';
import { Audit } from '../../mod-general-structure/pages/Audit';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Auditoria' element={<Audit />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}