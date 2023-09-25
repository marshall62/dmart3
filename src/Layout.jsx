import { Outlet } from "react-router-dom";
import DmartNavbar from './DmartNavbar';
import './Layout.css';

export function Layout () {
  return(
    <div className="container">
      <DmartNavbar className="navbar"/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}