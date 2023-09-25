import { Outlet } from "react-router-dom";
import DmartNavbar from './DmartNavbar';
import './Layout.css';

export function Layout () {
  return(
    <div className="container">
      <DmartNavbar className="navbar"/>
      <Outlet className="content"/>
    </div>
  )
}