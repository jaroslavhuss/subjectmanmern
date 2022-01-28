import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.scss"
import AppBar from "../molecules/AppBar";
import axios from "axios"
import Searcher from "../molecules/Searcher";
import { Lang } from "../langauges/Dictionary"

const StudentsDashboard = () => {
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<[]>([]);

    useEffect(() => { if (!authState.isAuthenticated) navigate("/") 
        getSubjects()
    }, [authState, navigate]);
    
    const getSubjects = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get('http://localhost:5001/api/subjects', { 
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setSubjects(res.data.subjects);
        } 
        catch (error) {
            console.log(error);
        }           
    }

    return <>
        { authState.isAuthenticated &&
            <div>
                <AppBar />
                    <h2 className="page-title">Dashboard</h2>
                    <div className="dashborad-wrapper">
                         <div className="dashboard">
                            <div className="dashboard__left">
                                <Searcher items={ subjects } title={ Lang.dashboardSearchTitle[lang] } />
                            </div>
                            <div className="dashboard__right">
                                <h3 className="dashboard__right__title">{ Lang.dashboardEnrolledSubjects[lang] }</h3>
                            </div>
                        </div>
                    </div>
            </div>
        }
    </>;
};

export default StudentsDashboard;
