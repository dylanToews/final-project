import {Outlet} from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  )
}

export default Layout;