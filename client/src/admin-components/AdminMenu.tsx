import React from 'react';
import { Link } from "react-router-dom"
import "./AdminMenu.scss"
const AdminMenu = () => {
    return (
        <div className='row-admin-panel'>
            <div className="module">
                <Link to="/admin-panel">Admin Dashboard</Link>
                <Link to="/subjects">Subjects</Link>
                <Link to="/tutors">Tutors</Link>
                <Link to="/topics">Topics</Link>
            </div>
        </div>
    );
};

export default AdminMenu;
