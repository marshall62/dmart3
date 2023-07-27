import { Outlet } from "react-router-dom";
import DmartNavbar from './DmartNavbar';

export function Layout () {
  return(
    <>
      <DmartNavbar/>
      <Outlet/>
    </>
  )
}