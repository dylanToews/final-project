import {Outlet} from "react-router-dom";
import NavbarComponents from "../components/navbar";

const Layout = () => {
  return (
    <>
      <NavbarComponents />
      <Outlet />
    </>
  )
}

export default Layout;