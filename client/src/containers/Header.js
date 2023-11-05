import React from 'react';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import { IoNotifications } from 'react-icons/io5';

export default function Header() {
    return (
        // <div className="header">
        //     <Link to="/" className='link-theme' style={{ marginLeft: "8px" }} >Home</Link>
        //     <p><Link to="/Planner" className='link-theme'>Planner</Link></p>
        //     <p><Link to="/Stats" className='link-theme'>Stats</Link></p>

        //     {/* TODO check if user is logged in, if not logged in, then change header and give Log In button */}
        //     <Link to="/Account" className='link-theme' style={{ marginRight: "8px" }}><RiAccountCircleFill style={{ fontSize: "1.5em" }} ></RiAccountCircleFill></Link>
        // </div>
        <div class="navbar bg-base-200">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/Planner">Planner</Link></li>
                        <li><Link to="/Stats">Stats</Link></li>
                    </ul>
                </div>
                <Link to="/" class="normal-case text-xl"><image src="../images/logo-color.png"></image></Link>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/Planner">Planner</Link></li>
                    <li><Link to="/Stats">Stats</Link></li>
                </ul>
            </div>
            <div class="navbar-end">
                {/* Alert button */}
                <button class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <IoNotifications style={{width: "100%", height: "100%"}} />
                        <span class="indicator-item"></span>
                    </div>
                </button>
                {/* Profile button */}
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-8 rounded-full">
                            <RiAccountCircleFill style={{width: "100%", height: "100%"}} />
                        </div>
                    </label>
                    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><Link to="/Account">Profile</Link></li>
                        <li><Link to="/Settings">Settings</Link></li>
                        <li><Link to="">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}