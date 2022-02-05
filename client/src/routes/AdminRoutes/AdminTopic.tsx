import { useState } from 'react';
import { useEffect } from 'react';
import AdminContainer from '../../admin-components/AdminContainer';
import { FETCH_URL } from './CONSTANT_CALL';
import "./GlobalCSS.scss"
import { TopicInterface } from '../../interface/TopicInterface';
import { setError } from "../../store/reducers/errorReducer";
import { useDispatch } from 'react-redux';

const AdminTopic = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [topics, setTopics] = useState<TopicInterface[]>([]);
    const [filteredTopics, setfilteredTopics] = useState<TopicInterface[]>([]);
    const [search, setSearch] = useState<string>("");
    const [currentTopic, setCurrentTopic] = useState<TopicInterface>();
    useEffect(() => {
        getAlltopics();
    }, [loaded]);
    const getAlltopics = async () => {
        try {
            const token: string | null = localStorage.getItem("token");
            const res: any = await fetch(FETCH_URL + "/api/topic/list", {
                method: "get",
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
                topic: TopicInterface[]
            } = await res.json();
            setTopics(data.topic);
            setfilteredTopics(data.topic)
        } catch (error: any) {
            if (error) {
                dispatch(setError(error.message));
            }
        }

    }
    const updateTopic = async () => {
        const token: string | null = localStorage.getItem("token");
        try {
            console.log(currentTopic)
            const res = await fetch(FETCH_URL + "/api/topic/update", {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ topic: currentTopic })
            })
            const data = await res.json();
            if (data.success) {
                setLoaded(!loaded);
                setCurrentTopic({
                    _id: "",
                    dificulty: 0,
                    digitalContent: "",
                    languages: {
                        cs: {
                            name: "",
                            description: "",
                        },
                        en: {
                            name: "",
                            description: "",
                        }
                    }
                });
            }
            if (!data.success) {
                throw new Error(data.errorMap.err)
            }
        } catch (error: any) {
            if (error) {
                dispatch(setError(error.message));
            }
        }


    }
    const deleteTopic = async () => {
        const token: string | null = localStorage.getItem("token");
        try {
            const res = await fetch(FETCH_URL + "/api/topic/delete", {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ topic: currentTopic })
            })
            const data = await res.json();
            if (data.success) {
                setLoaded(!loaded);
                setCurrentTopic({
                    _id: "",
                    dificulty: 0,
                    digitalContent: "",
                    languages: {
                        cs: {
                            name: "",
                            description: "",
                        },
                        en: {
                            name: "",
                            description: "",
                        }
                    }
                });
            }
            if (!data.success) {
                throw new Error(data.errorMap.err)
            }
        } catch (error: any) {
            if (error) {
                dispatch(setError(error.message));
            }
        }
    }
    const createTopic = async () => {
        const token: string | null = localStorage.getItem("token");
        const modifiedTopic = { ...currentTopic };
        delete modifiedTopic._id;
        try {
            const res = await fetch(FETCH_URL + "/api/topic/create", {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ topic: modifiedTopic })
            })
            const data = await res.json();
            if (data.success) {
                setLoaded(!loaded);
                setCurrentTopic({
                    _id: "",
                    dificulty: 0,
                    digitalContent: "",
                    languages: {
                        cs: {
                            name: "",
                            description: "",
                        },
                        en: {
                            name: "",
                            description: "",
                        }
                    }
                });
            }
            if (!data.success) {
                throw new Error(data.errorMap.err)
            }
        } catch (error: any) {
            if (error) {
                dispatch(setError(error.message));
            }
        }
    }
    return (
        <AdminContainer>
            <h1 className='headline'>Topics</h1>
            <div className="container" style={{ display: 'flex', flexDirection: "row" }}>
                <div className="left-panel">
                    <h2 style={{ textAlign: "center" }}>Search topics ({filteredTopics.length})</h2>
                    <input style={{
                        margin: 10,
                        padding: 10,
                        width: "100%"
                    }} value={search} onChange={(e: any) => {
                        const patters = new RegExp(e.target.value, "gi");
                        setSearch(e.target.value)
                        const filtered = topics.filter((topic: TopicInterface) => {
                            return topic.languages.en.name.match(patters);
                        })
                        setfilteredTopics(filtered);
                    }} />
                    {
                        filteredTopics.map((topic: TopicInterface, index) => (
                            <div onClick={() => {
                                setCurrentTopic(filteredTopics[index]);

                            }} key={index} className='topic-item'>
                                <span style={{ color: "red" }}>{topic._id}</span><br /><span>{topic.languages.en.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="right-panel">
                    {currentTopic &&
                        <div style={{ position: "fixed", width: "100%", padding: 10, margin: 10, maxWidth: "60%" }}>

                            <span>ID: {currentTopic._id}</span> <br />
                            <span>EN name <input style={{ width: "100%" }} value={currentTopic.languages.en.name} onChange={(e: any) => {
                                setCurrentTopic((prevState: any) => ({
                                    ...prevState,
                                    languages: {
                                        cs: {
                                            ...currentTopic.languages.cs,
                                        },
                                        en: {
                                            ...currentTopic.languages.en,
                                            name: e.target.value
                                        }
                                    }
                                }))
                            }} /></span> <br />
                            <span>EN Description <input style={{ width: "100%" }} value={currentTopic.languages.en.description} onChange={(e: any) => {
                                setCurrentTopic((prevState: any) => ({
                                    ...prevState,
                                    languages: {
                                        cs: {
                                            ...currentTopic.languages.cs,
                                        },
                                        en: {
                                            ...currentTopic.languages.en,
                                            description: e.target.value
                                        }
                                    }
                                }))
                            }} /></span><br />
                            <span>CZ name <input style={{ width: "100%" }} value={currentTopic.languages.cs.name} onChange={(e: any) => {
                                setCurrentTopic((prevState: any) => ({
                                    ...prevState,
                                    languages: {
                                        cs: {
                                            ...currentTopic.languages.cs,
                                            name: e.target.value
                                        },
                                        en: {
                                            ...currentTopic.languages.en,
                                        }
                                    }
                                }))
                            }} /></span> <br />
                            <span>CZ Description <input style={{ width: "100%" }} value={currentTopic.languages.cs.description} onChange={(e: any) => {
                                setCurrentTopic((prevState: any) => ({
                                    ...prevState,
                                    languages: {
                                        cs: {
                                            ...currentTopic.languages.cs,
                                            description: e.target.value
                                        },
                                        en: {
                                            ...currentTopic.languages.en,
                                        }
                                    }
                                }))
                            }} /></span><br />
                            <span>Difficulty:<input type="number" style={{ width: "100%" }} value={currentTopic.dificulty} onChange={(e: any) => {
                                e.target.value > 0 && setCurrentTopic({ ...currentTopic, dificulty: parseInt(e.target.value) })
                            }} /></span><br />
                            <span>Digital Content<input style={{ width: "100%" }} value={currentTopic.digitalContent} onChange={(e) => {
                                setCurrentTopic({ ...currentTopic, digitalContent: e.target.value })
                            }} /></span>
                            <br /><br />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className="button-custom" style={{ margin: 4, padding: 4 }} onClick={updateTopic}>update</div>
                                <div className="button-custom" style={{ margin: 4, padding: 4 }} onClick={deleteTopic}>delete</div>
                                <div className="button-custom" style={{ margin: 4, padding: 4 }} onClick={createTopic}>create new topic</div>
                            </div>

                        </div>}
                </div>
            </div>
        </AdminContainer>
    )
};

export default AdminTopic;
