import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div key={key} className="animate-fadeUp">
      {children}
    </div>
  );
}
