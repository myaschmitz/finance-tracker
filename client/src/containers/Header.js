import React from 'react';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';

export default function Header() {
    return (
        <div className="header">
            <Link to="/" className='link-theme' style={{ marginLeft: "8px" }} >Home</Link>
            <p><Link to="/Planner" className='link-theme'>Planner</Link></p>
            <p><Link to="/Stats" className='link-theme'>Stats</Link></p>

            {/* TODO check if user is logged in, if not logged in, then change header and give Log In button */}
            <Link to="/Account" className='link-theme' style={{ marginRight: "8px" }}><RiAccountCircleFill style={{ fontSize: "1.5em" }} ></RiAccountCircleFill></Link>
        </div>
    )
}