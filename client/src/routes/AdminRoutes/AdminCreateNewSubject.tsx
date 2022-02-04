import { useState } from 'react';
import AdminContainer from '../../admin-components/AdminContainer';
import { FETCH_URL } from './CONSTANT_CALL';
import { SubjectInterface } from "../../interface/subject"
import { useNavigate } from 'react-router-dom';
import validate from "validator"
import { subjectExample } from "./SubjectExample"
interface TutorI {
    name: string, surname: string, titleAfter: string | null, titleBefore: string | null,
    _id: string
}
interface TopicI {
    dificulty: number,
    digitalContent: string
    languages: {
        cs: {
            description: string
            name: string
        },
        en: {
            description: string
            name: string
        }
    }
    tmpId: string
    _id: string
}
interface LinksI {
    links: string[]
}
const AdminCreateNewSubject = () => {
    const navigation = useNavigate();
    //Tutors
    const [showCustomTutorSearchAdd, setShowCustomTutorSearchAdd] = useState<boolean>(false);
    const [listOfTutors, setListOfTutors] = useState<TutorI[]>([]);
    const [tutorErrorMessage, setTutorErrorMessage] = useState<string>("");
    const [showTutorErrorMessage, setShowTutorErrorMessage] = useState<boolean>(false);
    //Topics
    const [showCustomTopicSearchAdd, setShowCustomTopicSearchAdd] = useState<boolean>(false);
    const [listOfTopics, setListOfTopics] = useState<TopicI[]>([]);
    const [topicErrorMessage, setTopicErrorMessage] = useState<string>("");
    const [showTopicErrorMessage, setShowTopicErrorMessage] = useState<boolean>(false);

    const [subjectToUpdate, setSubjectToUpdate] = useState<any>(subjectExample);

    const getListOfTutors = async () => {
        const token: string | null = localStorage.getItem("token");
        const res = await fetch(FETCH_URL + "/api/tutor/list", {
            method: "get",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const tutors: { succes: boolean, errorMap: {}, tutor: TutorI[] } = await res.json();
        setListOfTutors(tutors.tutor);
        setShowCustomTutorSearchAdd(true);
    }
    const getListOfTopics = async () => {
        const token: string | null = localStorage.getItem("token");
        const res = await fetch(FETCH_URL + "/api/topic/list", {
            method: "get",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const topics: { succes: boolean, errorMap: {}, topic: TopicI[] } = await res.json();
        setListOfTopics(topics.topic);
        setShowCustomTopicSearchAdd(true);
    }
    const addTutor = (index: number) => {
        try {
            const idsArray: string[] = subjectToUpdate.tutors.map((tutor: TutorI) => (tutor._id));
            const isTutorSubscribed: boolean = idsArray.includes(listOfTutors[index]._id);
            if (isTutorSubscribed) {
                throw new Error("This topic is already subscribed");
            } else {
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    tutors: [...subjectToUpdate.tutors, listOfTutors[index]]
                }))
            }

        } catch (error: any) {
            if (error) {
                setShowTutorErrorMessage(true);
                setTutorErrorMessage(error.message);
                setTimeout(() => {
                    setShowTutorErrorMessage(false);
                    setTutorErrorMessage("");
                }, 1000)
            }
        }
    }
    const addTopic = (index: number) => {
        try {
            const idsArray: string[] = subjectToUpdate.topics.map((topic: TopicI) => (topic._id));
            const isTopicSubscribed: boolean = idsArray.includes(listOfTopics[index]._id);
            if (isTopicSubscribed) {
                throw new Error("This topic is already subscribed");
            } else {
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    topics: [...subjectToUpdate.topics, listOfTopics[index]]
                }))
            }

        } catch (error: any) {
            if (error) {
                setShowTopicErrorMessage(true);
                setTopicErrorMessage(error.message);
                setTimeout(() => {
                    setShowTopicErrorMessage(false);
                    setTopicErrorMessage("");
                }, 1000)
            }
        }
    }
    const removeTutor = (index: number) => {
        try {

            const isTutorSubscribed: boolean = subjectToUpdate.tutors.length <= 1;
            if (isTutorSubscribed) {
                throw new Error("At least one tutor has to be assigned to one subject");
            } else {

                const filteredArray = subjectToUpdate.tutors.filter((tutor: TutorI) => {
                    return tutor._id !== subjectToUpdate.tutors[index]._id;
                })
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    tutors: [...filteredArray]
                }))
            }
        } catch (error: any) {
            if (error) {
                setShowTutorErrorMessage(true);
                setTutorErrorMessage(error.message);
                setTimeout(() => {
                    setShowTutorErrorMessage(false);
                    setTutorErrorMessage("");
                }, 1000)
            }
        }
    }
    const removeTopic = (index: number) => {
        try {

            const isTopicSubscribed: boolean = subjectToUpdate.topics.length <= 1;
            if (isTopicSubscribed) {
                throw new Error("At least one topic has to be assigned to one subject");
            } else {

                const filteredArray = subjectToUpdate.topics.filter((topic: TopicI) => {
                    return topic._id !== subjectToUpdate.topics[index]._id;
                })

                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    topics: [...filteredArray]
                }))

            }

        } catch (error: any) {
            if (error) {
                setShowTopicErrorMessage(true);
                setTopicErrorMessage(error.message);
                setTimeout(() => {
                    setShowTopicErrorMessage(false);
                    setTopicErrorMessage("");
                }, 1000)
            }
        }
    }
    const addNewLink = () => {
        const promp: string | null = prompt("Insert new link");
        //@ts-ignore
        const isUrl: boolean = validate.isURL(promp);
        try {
            if (!isUrl) {
                throw new Error("This is not a valid URL");
            }
            setSubjectToUpdate((prev: any) => ({
                ...prev,
                links: [...subjectToUpdate.links, promp]
            }))

        } catch (error: any) {
            if (error) {
                setShowTopicErrorMessage(true);
                setTopicErrorMessage(error.message);
                setTimeout(() => {
                    setShowTopicErrorMessage(false);
                    setTopicErrorMessage("");
                }, 1000)
            }
        }
    }

    const removeLink = (index: number) => {
        try {

            const isLink: boolean = subjectToUpdate.links.length <= 1;
            if (isLink) {
                throw new Error("At least one link has to be assigned to one subject");
            } else {
                const filteredArray = subjectToUpdate.links.filter((link: LinksI) => {
                    return link !== subjectToUpdate.links[index];
                })
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    links: [...filteredArray]
                }))
            }
        } catch (error: any) {
            if (error) {
                setShowTopicErrorMessage(true);
                setTopicErrorMessage(error.message);
                setTimeout(() => {
                    setShowTopicErrorMessage(false);
                    setTopicErrorMessage("");
                }, 1000)
            }
        }
    }
    const subjectCreate = async () => {
        const token: string | null = localStorage.getItem("token");
        const theSubject: SubjectInterface = { ...subjectToUpdate };
        console.log(theSubject);
        try {
            //Credits check
            if (theSubject.credits <= 0 && !theSubject.credits) {
                throw new Error("Invalid value for credits!");
            }
            //Degree check
            if (!theSubject.degree && theSubject.degree.match(/Ing.|Bc./gi)) {
                throw new Error("Invalid degree - it has to be either Bc. or Ing.")
            }
            if (!theSubject.languages.cs.name) {
                throw new Error("CZ name can not be empty")
            }
            if (!theSubject.languages.en.name) {
                throw new Error("EN name can not be empty")
            }
            if (!theSubject.languages.cs.description) {
                throw new Error("CZ Description can not be empty")
            }
            if (!theSubject.languages.en.description) {
                throw new Error("EN Description can not be empty")
            }
            if (!theSubject.languages.cs.goal) {
                throw new Error("CZ Goal can not be empty")
            }
            if (!theSubject.languages.en.goal) {
                throw new Error("EN Goal can not be empty")
            }
            if (theSubject.links.length <= 0) {
                throw new Error("At least one link has to be selected!")
            }
            if (theSubject.topics.length <= 0) {
                throw new Error("At least one topic must be selected!")
            }
            if (theSubject.tutors.length <= 0) {
                throw new Error("At least one tutor has to be selected!")
            }
            const res = await fetch(FETCH_URL + "/api/subject/create", {
                method: "post",
                body: JSON.stringify({ subject: theSubject }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data: {
                success: boolean,
                errorMap: {
                    err: string
                },
                subject: SubjectInterface
            } = await res.json();
            if (!data.success) {
                throw new Error(data.errorMap.err)
            }
            navigation("/subjects")

        } catch (error: any) {
            setShowTopicErrorMessage(true);
            setTopicErrorMessage(error.message);
            setTimeout(() => {
                setShowTopicErrorMessage(false);
                setTopicErrorMessage("");
            }, 1000)
        }

    }
    const removeStudyForm = (index: number) => {
        const conf = window.confirm("Do you really wish to delete this study form?");
        if (conf) {
            try {
                const isAtLeastOneSelected = subjectToUpdate.forms.length <= 1;
                if (isAtLeastOneSelected) {
                    throw new Error("At least one study form must be selected!");
                }
                const filteredArray = subjectToUpdate.forms.filter((form: string[]) => {
                    return form !== subjectToUpdate.forms[index];
                })
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    forms: [...filteredArray]
                }))

            } catch (error: any) {
                if (error) {
                    setShowTopicErrorMessage(true);
                    setTopicErrorMessage(error.message);
                    setTimeout(() => {
                        setShowTopicErrorMessage(false);
                        setTopicErrorMessage("");
                    }, 1000)
                }
            }
        }
    }

    const addStudyForm = () => {
        const getForms: string[] = subjectToUpdate.forms;
        try {
            if (getForms.length >= 2) {
                throw new Error("Both forms are already added. You can not add more!")
            }
            if (getForms.length === 1) {
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    forms: subjectToUpdate.forms[0] === "daily" ? [...subjectToUpdate.forms, "distant"] : [...subjectToUpdate.forms, "daily"]
                }))
            }
            if (getForms.length === 0) {
                setSubjectToUpdate((prev: any) => ({
                    ...prev,
                    forms: ["daily", "distant"]
                }))
            }
        } catch (error: any) {
            if (error) {
                setShowTopicErrorMessage(true);
                setTopicErrorMessage(error.message);
                setTimeout(() => {
                    setShowTopicErrorMessage(false);
                    setTopicErrorMessage("");
                }, 1000)
            }
        }

    }
    return (
        <AdminContainer>
            <div className="main-row">
                <div className="cz-side">
                    <h2>[CZ] Subject update</h2>
                    <div className="object-change">
                        <p><span className='property-name'>Sujbect's name (CZ)</span>: {subjectToUpdate.languages.cs.name}</p>
                        <input value={subjectToUpdate.languages.cs.name} onChange={(e: any) => {
                            setSubjectToUpdate((prevState: any) => ({
                                ...prevState,
                                languages: {
                                    cs: {
                                        ...subjectToUpdate.languages.cs,
                                        name: e.target.value
                                    },
                                    en: {
                                        ...subjectToUpdate.languages.en
                                    }
                                }
                            }))

                        }} />
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Sujbect's Goal (CZ)</span>: {subjectToUpdate.languages.cs.goal}</p>
                        <input value={subjectToUpdate.languages.cs.goal} onChange={(e: any) => {
                            setSubjectToUpdate((prevState: any) => ({
                                ...prevState,
                                languages: {
                                    cs: {
                                        ...subjectToUpdate.languages.cs,
                                        goal: e.target.value
                                    },
                                    en: {
                                        ...subjectToUpdate.languages.en
                                    }
                                }
                            }))

                        }} />
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Sujbect's Description (CZ)</span>: {subjectToUpdate.languages.cs.description}</p>
                        <input value={subjectToUpdate.languages.cs.description} onChange={(e: any) => {
                            setSubjectToUpdate((prevState: any) => ({
                                ...prevState,
                                languages: {
                                    cs: {
                                        ...subjectToUpdate.languages.cs,
                                        description: e.target.value
                                    },
                                    en: {
                                        ...subjectToUpdate.languages.en
                                    }
                                }
                            }))

                        }} />
                    </div>
                </div>
                <div className="cz-side">
                    <h2>[EN] Subject update</h2>
                    <div className="object-change">
                        <p><span className='property-name'>Sujbect's name (EN)</span>: {subjectToUpdate.languages.en.name}</p>
                        <input value={subjectToUpdate.languages.en.name} onChange={(e: any) => {
                            setSubjectToUpdate((prevState: any) => ({
                                ...prevState,
                                languages: {
                                    cs: {
                                        ...subjectToUpdate.languages.cs

                                    },
                                    en: {
                                        ...subjectToUpdate.languages.en,
                                        name: e.target.value
                                    }
                                }
                            }))

                        }} />
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Sujbect's Goal (EN)</span>: {subjectToUpdate.languages.en.goal}</p>
                        <input value={subjectToUpdate.languages.en.goal} onChange={(e: any) => {
                            setSubjectToUpdate((prevState: any) => ({
                                ...prevState,
                                languages: {
                                    cs: {
                                        ...subjectToUpdate.languages.cs
                                    },
                                    en: {
                                        ...subjectToUpdate.languages.en,
                                        goal: e.target.value
                                    }
                                }
                            }))

                        }} />
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Sujbect's Description (EN)</span>: {subjectToUpdate.languages.en.description}</p>
                        <input value={subjectToUpdate.languages.en.description} onChange={(e: any) => {
                            setSubjectToUpdate((prevState: any) => ({
                                ...prevState,
                                languages: {
                                    cs: {
                                        ...subjectToUpdate.languages.cs
                                    },
                                    en: {
                                        ...subjectToUpdate.languages.en,
                                        description: e.target.value
                                    }
                                }
                            }))

                        }} />
                    </div>
                </div>
            </div>
            <div className="main-column">
                <div className="cz-side">
                    <h2>Additional settings</h2>
                    <div className="object-change">
                        <p><span className='property-name'>Credits: </span> {subjectToUpdate.credits}</p>
                        <input type="number" value={subjectToUpdate.credits} onChange={(e: any) => {
                            if (e.target.value > 0) {
                                setSubjectToUpdate({ ...subjectToUpdate, credits: parseInt(e.target.value) })
                            }

                        }} />
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Degree: </span> {subjectToUpdate.degree}</p>
                        <br />
                        <select style={{ width: "100%" }} onChange={(e) => {
                            setSubjectToUpdate({ ...subjectToUpdate, degree: e.target.value })
                        }}>
                            {subjectToUpdate.degree === "Bc." &&
                                <>
                                    <option value={subjectToUpdate.degree}>{subjectToUpdate.degree}</option>
                                    <option value="Ing.">Ing.</option>
                                </>
                            }
                            {subjectToUpdate.degree === "Ing." &&
                                <>
                                    <option value={subjectToUpdate.degree}>{subjectToUpdate.degree}</option>
                                    <option value="Bc.">Bc.</option>
                                </>
                            }
                        </select>
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Study forms: </span></p>

                        {subjectToUpdate.forms.map((form: string, index: number) => {
                            return (
                                <div onClick={() => {
                                    removeStudyForm(index);
                                }} key={index} style={{ padding: 5, margin: 5, background: "white", color: "black", textAlign: "center", cursor: "pointer" }}>
                                    {form}
                                </div>
                            )
                        })}
                        <div className="button-custom" style={{ padding: 10, textAlign: "center", margin: 5 }} onClick={() => {
                            addStudyForm();
                        }}>Add Forms</div>
                    </div>
                    <div className="object-change">
                        <p><span className='property-name'>Severity: </span></p>
                        <select onChange={(e) => {
                            console.log(e.target.value)
                            setSubjectToUpdate({ ...subjectToUpdate, severity: e.target.value })
                        }} style={{ width: "100%" }}>
                            {subjectToUpdate.severity === "compulsory" &&
                                <>
                                    <option value={subjectToUpdate.severity}>{subjectToUpdate.severity}</option>
                                    <option value='compulsory_optional'>'compulsory_optional'</option>
                                    <option value='optional'>'optional'</option>
                                </>
                            }
                            {subjectToUpdate.severity === "compulsory_optional" &&
                                <>
                                    <option value={subjectToUpdate.severity}>{subjectToUpdate.severity}</option>
                                    <option value='compulsory'>'compulsory'</option>
                                    <option value='optional'>'optional'</option>
                                </>
                            }
                            {subjectToUpdate.severity === "optional" &&
                                <>
                                    <option value={subjectToUpdate.severity}>{subjectToUpdate.severity}</option>
                                    <option value='compulsory_optional'>'compulsory_optional'</option>
                                    <option value='compulsory'>'compulsory'</option>
                                </>
                            }

                        </select>

                        <br />
                    </div>
                </div>
                <div className="cz-side">
                    <div className="object-change">
                        <h3 className="h3-headline">Tutors:</h3>
                        {
                            subjectToUpdate.tutors.map((tutor: TutorI, index: number) => (
                                <div key={index} onClick={() => {

                                }}>{tutor._id} {"\n"} ({tutor.titleBefore} {tutor.name} {tutor.surname} {tutor.titleAfter})
                                    <div className="row">
                                        <span onClick={() => { removeTutor(index) }} className="update button-custom button-custom-smal remove">Remove this tutor</span>
                                    </div>
                                </div>
                            ))
                        }
                        <hr />
                        <div className="add-new-tutor-container">
                            <span onClick={() => getListOfTutors()} className="update button-custom">Add New Tutor</span>
                            {showCustomTutorSearchAdd && <span onClick={() => setShowCustomTutorSearchAdd(false)} className="update button-custom">Hide Tutors</span>}
                        </div>
                        {showCustomTutorSearchAdd && <div className="listOfTutors">
                            {listOfTutors.map((tutor: TutorI, index) => (
                                <div className='tutor_detail' key={index} onClick={() => { addTutor(index) }}>
                                    <span className='property-name'>Add:</span> {tutor._id} {tutor.name} {tutor.surname}
                                </div>
                            ))}
                        </div>}

                        {showTutorErrorMessage && <div className='tutor-error-message'><span className="message">{tutorErrorMessage}</span></div>}
                    </div>

                </div>
                <div className="cz-side">
                    <div className="object-change">
                        <h3 className="h3-headline">Topics:</h3>
                        {
                            subjectToUpdate.topics.map((topic: TopicI, index: number) => (
                                <div key={index} onClick={() => {

                                }}>{topic._id} {"\n"} ({topic.languages.en.name} )
                                    <div className="row">
                                        <span onClick={() => {
                                            removeTopic(index)
                                        }} className="update button-custom button-custom-smal remove">Remove this Topic</span>
                                    </div>
                                </div>
                            ))
                        }
                        <hr />
                        <div className="add-new-tutor-container">
                            <span onClick={
                                () => getListOfTopics()
                            } className="update button-custom">Add New Topic</span>
                            {showCustomTopicSearchAdd && <span onClick={() => setShowCustomTopicSearchAdd(false)} className="update button-custom">Hide Topics</span>}
                        </div>
                        {showCustomTopicSearchAdd && <div className="listOfTutors" style={{ maxHeight: 600, overflow: "scroll" }}>
                            {listOfTopics.map((topic: TopicI, index) => (
                                <div className='tutor_detail' key={index} onClick={() => {
                                    addTopic(index)
                                }}>
                                    <span className='property-name'>Add:</span> {topic._id} {topic.languages.en.name}
                                </div>
                            ))}
                        </div>}

                        {showTopicErrorMessage && <div className='tutor-error-message'><span className="message">{topicErrorMessage}</span></div>}
                    </div>

                </div>
                <div className="cz-side">
                    <div className="object-change">
                        <h3 className="h3-headline">Links:</h3>
                        {
                            subjectToUpdate.links.map((link: LinksI, index: number) => (
                                <div key={index}>{index + 1}: {link}
                                    <div className="row">
                                        <span onClick={() => {
                                            removeLink(index);
                                        }} className="update button-custom button-custom-smal remove">Remove this Link</span>
                                    </div>
                                </div>
                            ))
                        }
                        <hr />
                        <div className="add-new-tutor-container">
                            <span onClick={addNewLink} className="update button-custom">Add New Link</span>
                        </div>


                        {showTopicErrorMessage && <div className='tutor-error-message'><span className="message">{topicErrorMessage}</span></div>}
                    </div>

                </div>
            </div>
            <div onClick={subjectCreate} className="update-button">
                Create new subject
            </div>
        </AdminContainer >
    );
};

export default AdminCreateNewSubject;
