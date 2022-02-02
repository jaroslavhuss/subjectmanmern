/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminContainer from '../../admin-components/AdminContainer';
import { SubjectInterface } from '../../interface/subject';
import { updateSubject } from '../../store/reducers/updateSubject';
import { FETCH_URL } from './CONSTANT_CALL';

import "./GlobalCSS.scss"
const AdminSubject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<SubjectInterface[]>([]);
    const [showAdminComponent, setShowAdminComponent] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState({});
    const lang = useSelector((data: any) => { return data.language.language })

    const getAllSubjects = async (): Promise<any> => {
        const token: string | null = localStorage.getItem("token");
        const res: any = await fetch(FETCH_URL + "/api/subjects", {
            method: "get",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const allSubjects: {
            errorMap: object,
            subjects: SubjectInterface[],
            success: boolean
        } = await res.json();
        setSubjects(allSubjects.subjects);
        console.log(allSubjects)
    }
    useEffect(() => {
        getAllSubjects()
    }, []);

    const subjectUpdate = (index: number) => {
        dispatch(updateSubject(subjects[index]));
        navigate("/subject-update")
    }
    const subjectDelete = (index: number) => {
        //Zde bude delete metoda
    }
    return (
        <AdminContainer>
            <h1 className='headline'>Subjects</h1>
            <div className="subjectList">
                {subjects.map((subitem: SubjectInterface, index) => {
                    return (
                        <div key={index} className="each-subject">
                            <h2 style={{ cursor: "pointer", marginBottom: 10 }} onClick={(e: any) => {
                                let className: any = e.target.nextElementSibling.getAttribute("class");
                                className === "hidden-area" ? e.target.nextElementSibling.classList.remove("hidden-area") : e.target.nextElementSibling.classList.add("hidden-area");
                            }}>
                                {
                                    //@ts-ignore
                                    subitem.languages[lang].name
                                }
                            </h2>

                            <div className="hidden-area" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="admin-change-components" style={{ margin: 20 }}>
                                    <span className="update button-custom" onClick={() => {
                                        subjectUpdate(index);
                                    }}>Update</span>
                                    <span className="delete button-custom" onClick={() => {
                                        subjectDelete(index);
                                    }}>Delete</span>
                                </div>
                                <span>Credits: {subitem.credits}</span>
                                <span>Degree: {subitem.degree}</span>
                                <span>Forms: {subitem.forms[0]} | {subitem.forms[1]}</span>
                                <span>Links: {subitem.links.map((link, index) => (<a key={index} target="_blank" rel="noreferrer" href={link}>{index + 1}:link</a>))}</span>
                                <span>Severity: {subitem.severity}</span>
                                <h3 style={{ margin: 10, color: "lightcoral" }}>Topics</h3>
                                {subitem.topics.map((topic, key) => (
                                    <div key={key}>{
                                        //@ts-ignore
                                        topic.languages[lang].name
                                    } | {topic.dificulty} | {topic.digitalContent.length > 0 && <a href={topic.digitalContent}>Digital content</a>}</div>
                                ))}
                                <h3 style={{ margin: 10, color: "lightcoral" }}>Tutors</h3>
                                {subitem.tutors.map((tutor, index) => (
                                    <div key={index}>{tutor.titleBefore !== null && tutor.titleBefore} {tutor.name} {tutor.surname} {tutor.titleAfter !== null && tutor.titleAfter}</div>
                                ))}
                                <h3 style={{ margin: 10, color: "lightcoral" }}>Tutorials</h3>
                                <h4 style={{ margin: 10, color: "lightpink" }}>Daily</h4>
                                {
                                    subitem.tutorials.daily.map((daily: [], key) => (
                                        <div key={key}>
                                            <span style={{ color: "purple", fontWeight: "bold", margin: 10, fontSize: 15 }}>{key + 1}. Tutorial</span>
                                            {
                                                daily.map((subdaily: {
                                                    dificulty: number, digitalContent: string, languages: {
                                                        cs: {
                                                            description: string;
                                                            name: string
                                                        },
                                                        en: {
                                                            description: string;
                                                            name: string
                                                        }
                                                    }
                                                }, key2) => (
                                                    <div key={key2}>
                                                        <div className="name">{
                                                            //@ts-ignore
                                                            subdaily.languages[lang].name
                                                        }</div>
                                                        <div className="name">{
                                                            //@ts-ignore
                                                            subdaily.languages[lang].description
                                                        }</div>
                                                        <div className="difficulty">Difficulty: {subdaily.dificulty}</div>
                                                        <br />

                                                    </div>
                                                ))
                                            }

                                        </div>
                                    ))
                                }
                                <h4 style={{ margin: 10, color: "lightpink" }}>Distant</h4>
                                {
                                    subitem.tutorials.distant.map((distant: [], key) => (
                                        <div key={key}>
                                            <span style={{ color: "purple", fontWeight: "bold", margin: 10, fontSize: 15 }}>{key + 1}. Tutorial</span>
                                            {
                                                distant.map((subdaily: {
                                                    dificulty: number, digitalContent: string, languages: {
                                                        cs: {
                                                            description: string;
                                                            name: string
                                                        },
                                                        en: {
                                                            description: string;
                                                            name: string
                                                        }
                                                    }
                                                }, key2) => (
                                                    <div key={key2}>
                                                        <div className="name">{
                                                            //@ts-ignore
                                                            subdaily.languages[lang].name
                                                        }</div>
                                                        <div className="name">{
                                                            //@ts-ignore
                                                            subdaily.languages[lang].description
                                                        }</div>
                                                        <div className="difficulty">Difficulty: {subdaily.dificulty}</div>
                                                        <br />

                                                    </div>
                                                ))
                                            }

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })}
            </div>

        </AdminContainer>
    )
};

export default AdminSubject;
