import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            Company Admin <sup>Mitwort</sup>
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr class="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li class="nav-item active">
          <Link class="nav-link" to="/dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <center>Dashboard</center>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr class="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div class="sidebar-heading">Post</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/dashboard/publication">
            <i class="fas fa-fw fa-cog"></i>
            <span>publications</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/dashboard/statistics">
            <i class="fas fa-fw fa-wrench"></i>
            <span>statistics</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr class="sidebar-divider" />
        {/* 
      <!-- Heading --> */}
        <div class="sidebar-heading">Addons</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/dashboard/todolist">
            <i class="fas fa-fw fa-folder"></i>
            <span>To-Do List</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        {/* <li class="nav-item">
          <a class="nav-link" href="charts.html">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Charts</span>
          </a>
        </li> */}

        {/* <!-- Divider --> */}
        <hr class="sidebar-divider d-none d-md-block" />
      </ul>
      {/* <!-- End of Sidebar --> */}
    </>
  );
};

export default Sidebar;
