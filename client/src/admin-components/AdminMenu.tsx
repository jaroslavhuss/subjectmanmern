import { Link, useNavigate } from "react-router-dom"
import "./AdminMenu.scss"

const AdminMenu = () => {
    const navigate = useNavigate();
    return (
        <div className='row-admin-panel'>

            <Link className="menu-btn" to="/admin-panel">Dashboard</Link>
            <Link className="menu-btn" to="/subjects">Subjects</Link>
            <Link className="menu-btn" to="/tutors">Tutors</Link>
            <Link className="menu-btn" to="/topics">Topics</Link>
            <Link className="menu-btn" to="/">Studen's&nbsp;dashboard</Link>
            <span className="menu-btn-logoff" onClick={() => {
                localStorage.clear();
                navigate("/")
            }}>Log-out</span>

        </div>
    );
};

export default AdminMenu;
