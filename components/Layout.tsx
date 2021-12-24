import { ReactElement } from "react";

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return <div className="bg-black h-screen overflow-hidden">{children}</div>;
};

export default Layout;
