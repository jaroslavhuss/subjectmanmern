import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css"
import AppBar from "../molecules/AppBar";

const StudentsDashboard = () => {
    const authState = useSelector((data: any) => { return data.auth })
    const navigate = useNavigate();
    useEffect(() => { if (!authState.isAuthenticated) navigate("/") }, [authState, navigate]);

    return <>
        {authState.isAuthenticated &&
            <div>
                <AppBar></AppBar>
                <h1>Studentský Dashboard</h1>
                <div className="flex-row">
                    <div className="left-panel">
                        <label htmlFor="subject-search">
                            <h3>Vyhledávač předmětu</h3>
                            <input type="text" name="subject-search" />
                        </label>
                    </div>
                    <div className="right-panel">
                        <h3>Zapsané předměty</h3>
                    </div>
                </div>
            </div>}
    </>;
};

export default StudentsDashboard;
