import React from 'react';
import { useLocation } from 'react-router-dom';

function Dontshow({ children }) {
  const location = useLocation();
  const hiddenRoutes = ['/adminLogin']; // hide on these routes

  const shouldHide = hiddenRoutes.includes(location.pathname);

  if (shouldHide) return null;

  return <>{children}</>;
}

export default Dontshow;
