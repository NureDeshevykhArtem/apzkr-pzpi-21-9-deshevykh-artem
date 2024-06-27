import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import logo from '../static/logo.png';
import "../App.css";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand className="app-logo" href="/">
                    <img
                        alt=""
                        src={logo}
                        width="40"
                        height="50"
                        className="d-inline-block align-center"
                    />{' '}
                    Partner Finding App
                </Navbar.Brand>
            </Navbar>
            <div className='sidebar'>
                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a
                            href="/"
                            className="text-decoration-none"
                            style={{ color: "inherit" }}
                        >
                            Navigation
                        </a>
                    </CDBSidebarHeader>

                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <NavLink exact to="/" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="home">
                                    Home
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/pets" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="paw">
                                    Pets
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/users" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="user">
                                    Users
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/managers" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="users">
                                    Managers
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/admins" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="user-shield">
                                    Admins
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/petmaterequests" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="handshake">
                                    Pet Mate Requests
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/petmatematches" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="heart">
                                    Pet Mate Matches
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/messages" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="comments">
                                    Messages
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/reviews" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="star">
                                    Reviews
                                </CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                </CDBSidebar>
            </div>
        </div>
    );
}

export default Navigation;