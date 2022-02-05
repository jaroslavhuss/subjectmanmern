import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.scss"
import AppBar from "../molecules/AppBar";
import axios from "axios"
import Searcher from "../molecules/Searcher";
import { Lang } from "../langauges/Dictionary"
import { Icon } from '@iconify/react';
import { setError } from "../store/reducers/errorReducer"

interface ITopics {
    _id: string,
    description: string,
    dificulty: number
    name: string
}

interface ITutor {
    _id: string,
    name: string,
    surname: string,
    titleBefore: string,
    titleAfter: string,
}

interface ISubject {
    _id: string,
    credits: number,
    degree: string,
    forms: Array<string>,
    languages?: any,
    links: Array<string>,
    severity: Array<string>,
    topics: Array<ITopics>,
    tutorials: {
        daily: Array<Array<ITopics>>,
        distant: Array<Array<ITopics>>,
    },
    tutors: Array<ITutor>
}

const StudentsDashboard = () => {
    const dispatch = useDispatch();
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<Array<ISubject>>([]);
    const [subsribedSubjects, setSubsribedSubjects] = useState<Array<ISubject>>();
    const [_id, setID] = useState<string>("");

    useEffect(() => {
        if (!authState.isAuthenticated) navigate("/")
        getSubcribedSubjects()
    }, [authState, navigate]);

    //get subjects of user that is loged in
    const getSubcribedSubjects = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post('http://localhost:5001/api/user/subject/read', {}, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            setSubsribedSubjects(res.data.subjects);
            setSubjects(res.data.restOfSubjects);
        }
        catch (error: any) {
            if (error) {
                dispatch(setError(error.message))
            }
        }
    }

    //id listener for search
    const setIDCallback = (id: SetStateAction<string>) => {
        setID(id)
    }

    return <>
        {authState.isAuthenticated &&
            <div>
                <AppBar />

                <h2 className="page-title">{Lang.dashboardTitle[lang]}</h2>
                <div className="dashborad-wrapper">
                    <div className="dashboard">
                        <div className="dashboard__left">
                            <Searcher
                                setIDCallback={setIDCallback}
                                items={subjects}
                                title={Lang.dashboardSearchTitle[lang]}
                                dropDownContent={
                                    <div className="dashboard-drop-down" >
                                        <Link className="dashboard-drop-down_link" to={`/subjectDetail/${_id}`}>
                                            <span>
                                                <Icon inline={true} icon="mdi:file" />
                                                {Lang.dashboardSubjectDetail[lang]}
                                            </span>
                                        </Link>
                                    </div>
                                }
                            />
                        </div>
                        <div className="dashboard__right">
                            <h3 className="dashboard__right__title">{Lang.dashboardEnrolledSubjects[lang]}</h3>
                            <div className="dashboard__right__wraper">

                                {/* check if we have loaded subjects */}
                                {subsribedSubjects === undefined ? "LOADING" :

                                    /* rendering of enrolled subjects */
                                    subsribedSubjects.map((item: ISubject) => (
                                        <Link key={item._id} className="dashboard__right__item-link" to={`/subjectDetail/${item._id}`}>
                                            <div className="dashboard__right__subsribed">
                                                <div className="dashboard__right__subsribed__item-name">{item?.languages[lang]?.name}</div>
                                                <div className="dashboard__right__subsribed__item-goal">{item?.languages[lang]?.goal}</div>
                                            </div>
                                        </Link>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>;
};

export default StudentsDashboard;
