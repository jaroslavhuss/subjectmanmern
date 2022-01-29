import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.scss"
import AppBar from "../molecules/AppBar";
import axios from "axios"
import Searcher from "../molecules/Searcher";
import { Lang } from "../langauges/Dictionary"
import { Icon } from '@iconify/react';

const StudentsDashboard = () => {
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<[]>([]);
    const [subsribedSubjects, setSubsribedSubjects] = useState<{}[]>();
    const [_id, setID] = useState<string>("");

    useEffect(() => { if (!authState.isAuthenticated) navigate("/") 
        getSubjects()
        getSubcribedSubjects()
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

    //get subjects of user that loged in
    const getSubcribedSubjects = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post('http://localhost:5001/api/user/subject/read', { 
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setSubsribedSubjects(res.data.subjects);
            console.log(res.data.subjects)
        } 
        catch (error) {
            console.log(error);
        }           
    }

    const setIDCallback = (id: SetStateAction<string>) =>{
        setID(id)
    }

    return <>
        { authState.isAuthenticated &&
            <div>
                <AppBar />
                    <h2 className="page-title">{ Lang.dashboardTitle[lang] }</h2>
                    <div className="dashborad-wrapper">
                         <div className="dashboard">
                            <div className="dashboard__left">                        
                                <Searcher
                                    setIDCallback = { setIDCallback }
                                    items={ subjects } 
                                    title={ Lang.dashboardSearchTitle[lang] } 
                                    dropDownContent={ 
                                        <div className="dashboard-drop-down" >
                                            <Link className="dashboard-drop-down_link" to={`/subjectDetail/${_id}`}>
                                                <span>
                                                <Icon inline={true} icon="mdi:file"/>
                                                    { Lang.dashboardSubjectDetail[lang] }
                                                </span> 
                                            </Link>
                                        </div>
                                     }
                                />
                                
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
