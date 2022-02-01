import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./SubjectDetail.scss"
import AppBar from "../molecules/AppBar";
import axios from "axios"
import BasicButton from "../atoms/BasicButton";
import { Lang } from "../langauges/Dictionary"

interface ISubjectLanguage {
    description: string,
    goal: string,
    langForm: Array<string>,
    langSeverity: string,
    name: string
}

type ISubjectLanguageFixer = object & {
    cs: ISubjectLanguage,
    en: ISubjectLanguage
}

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
    languages?: Array<any | ISubjectLanguageFixer>,
    links: Array<string>,
    severity: Array<string>,
    topics: Array<ITopics>,
    tutorials: {
        daily: Array<Array<ITopics>>,
        distant: Array<Array<ITopics>>,
    },
    tutors: Array<ITutor>
}

const SubjectDetail = () => {
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const navigate = useNavigate();
    const { _id } = useParams();
    const [subscribed = false, setSubscribed] = useState<boolean>();
    const [subject, setSubject] = useState<ISubject>();
    const [subscribedSubjects = [], setSubscribedSubjects] = useState<Array<ISubject>>();

    useEffect(() => { if (!authState.isAuthenticated) navigate("/")
        getSubscribedSubjects();
    }, [authState, navigate, subscribed]);

    useEffect(() => {
        if (!authState.isAuthenticated) navigate("/")
        getSubject();
    }, [authState, navigate, subscribedSubjects]);

    const getSubscribedSubjects = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post('http://localhost:5001/api/user/subject/read', {}, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            setSubscribedSubjects(res.data.subjects);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getSubject = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get('http://localhost:5001/api/subjects', {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    id: _id
                }
            });
            setSubject(res.data.subject);

            const subject = subscribedSubjects.find((s) => s._id === _id);
            if (subject) {
                setSubscribed(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const subscribeSubject = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post('http://localhost:5001/api/user/subject/subscribe', {
                subject: {
                    subjectId: _id
                }
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setSubscribed(true);
        } catch (error) {
            console.log(error);
        }
    };

    const unsubscribeSubject = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post('http://localhost:5001/api/user/subject/unsubscribe', {
                subject: {
                    subjectId: _id
                }
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setSubscribed(false);
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        {authState.isAuthenticated &&
            <div>
                <AppBar />
                <h2 className="page-title">{Lang.detailTitle[lang]}</h2>
                <div className="subject-detail-wrapper">
                    <div className="subject-detail-body">


                        {/* HEADER */}
                        <h2 className="subject-detail__header" > {subject?.languages![0][lang].name} </h2>
                        <div className="subject-detail__header__details-small">
                                {/* ACTIONS */}
                                <span className="subject-detail__header__details__item">
                                    {!subscribed &&
                                        <BasicButton onClick={subscribeSubject}>{ `${ Lang.detailSubscribe[lang] }` }</BasicButton>
                                    }
                                    {subscribed &&
                                        <BasicButton onClick={unsubscribeSubject}>{ `${ Lang.detailUnSubscribe[lang] }` }</BasicButton>
                                    }
                                </span>
                            </div>

                            <div className="subject-detail__header__details-big">
                            {/* CREDITS */}
                            <span className="subject-detail__header__details__item">
                                {`${Lang.detailCredits[lang]}: ${subject?.credits}`}
                            </span>

                            {/* DEGREE */}
                            <span className="subject-detail__header__details__item">
                                {`${Lang.detailLevel[lang]}: ${subject?.degree}`}
                            </span>

                            {/* FORM */}
                            <span className="subject-detail__header__details__item">
                                {`${Lang.detailForm[lang]}: ${subject?.languages![0][lang].langForm}`}
                            </span>

                            {/* SEVERITY*/}
                            <span className="subject-detail__header__details__item">
                                {`${Lang.detailSubjectType[lang]}: ${subject?.languages![0][lang].langSeverity}`}
                            </span>
                        </div>

                        {/* GOAL */}
                        <div className="subject-detail__header__details-small">
                            <div className="subject-detail__header__details__headline-green">{Lang.detailGoal[lang]} :</div>
                            <div>{subject?.languages![0][lang].goal}</div>
                        </div>

                        {/* Description */}
                        <div className="subject-detail__header__details-small">
                            <div className="subject-detail__header__details__headline-blue">{Lang.detailDescription[lang]} :</div>
                            <div>{subject?.languages![0][lang].description}</div>
                        </div>

                        {/* TMP JUST FOR TESTING */}
                        <p> {subject?.links[0]} </p>
                        <p> {subject?.topics[2].name} </p>
                        <p> {subject?.topics[2].description} </p>
                        <p> {subject?.topics[2].dificulty} </p>
                        <p> {subject?.topics[2]._id} </p>
                        <p> {subject?.tutorials.daily[0][0].name} </p>
                        <p> {subject?.tutorials.daily[0][0].description} </p>
                        <p> {subject?.tutorials.daily[0][0].dificulty} </p>
                        <p> {subject?.tutorials.daily[0][0]._id} </p>
                        <p> {subject?.tutors[0]._id} </p>
                        <p> {subject?.tutors[0].name} </p>
                        <p> {subject?.tutors[0].surname} </p>
                        <p> {subject?.tutors[0].titleAfter} </p>
                        <p> {subject?.tutors[0].titleBefore} </p>
                    </div>
                </div>
            </div>
        }
    </>;
};

export default SubjectDetail;
