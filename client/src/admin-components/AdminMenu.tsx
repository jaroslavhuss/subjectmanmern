import { Link, useNavigate } from "react-router-dom"
import "./AdminMenu.scss"

const AdminMenu = () => {
    const navigate = useNavigate();
    return (
        <div className='row-admin-panel'>
            <div className="module">
                <Link to="/admin-panel">Admin Dashboard</Link>
                <Link to="/subjects">Subjects</Link>
                <Link to="/tutors">Tutors</Link>
                <Link to="/topics">Topics</Link>
                <span onClick={() => {
                    localStorage.clear();
                    navigate("/")
                }}>Log-out</span>
            </div>
        </div>
    );
};

export default AdminMenu;
