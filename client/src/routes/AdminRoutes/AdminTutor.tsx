import AdminContainer from '../../admin-components/AdminContainer';
import { FETCH_URL } from './CONSTANT_CALL';
import "./GlobalCSS.scss"
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Searcher from "../../molecules/Searcher";
import { Lang } from "../../langauges/Dictionary"
import "./AdminTutor.scss"
import InputText from '../../atoms/forms/InputText';
import axios from "axios"
import { setError } from "../../store/reducers/errorReducer";
interface ITutor {
    _id: string,
    name: string,
    surname: string,
    titleAfter: string,
    titleBefore: string
}

const AdminTutor = () => {
    const [tutors, setTutors] = useState<Array<ITutor>>();
    const [tutorsForSearch, setTutorsForSearch] = useState<Array<ITutor>>();
    const [_id, setID] = useState<string>("");
    const lang = useSelector((data: any) => { return data.language.language })
    const [formType, setFormType] = useState<string>("new");
    const [useDelete, setUseDelete] = useState<boolean>(false);
    const [opendTutorName, setOpendTutorName] = useState<string>("");
    const [opendTutorSurnName, setOpendTutorSurname] = useState<string>("");
    const [opendTutorTitleBefore, setOpendTutorTitleBefore] = useState<string>(" ");
    const [opendTutorTitleAfter, setOpendTutorTitleAfter] = useState<string>(" ");

    const getAllTutors = async (): Promise<any> => {
        const token: string | null = localStorage.getItem("token");
        const res: any = await fetch(FETCH_URL + "/api/tutor/list", {
            method: "get",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const allTutors: {
            errorMap: object,
            tutor: any,
            success: boolean
        } = await res.json();
        setTutors(allTutors.tutor);

        const restructuredTutorName = allTutors.tutor.map((tutor: ITutor) => (
            {
                _id: tutor._id,
                name: tutor.name + " " + tutor.surname
            }));
        setTutorsForSearch(restructuredTutorName)
    }

    useEffect(() => {
        getAllTutors()
    }, []);

    //id listener for search
    const setIDCallback = (id: any) => {
        changeForm("edit")
        let searchTutor = tutors!.find((tutor: ITutor) => tutor._id === id);
        if (searchTutor) {
            setOpendTutorName(searchTutor.name)
            setOpendTutorSurname(searchTutor.surname)
            setOpendTutorTitleBefore(searchTutor.titleBefore ? searchTutor.titleBefore : " ")
            setOpendTutorTitleAfter(searchTutor.titleAfter ? searchTutor.titleAfter : " ")
            setID(id)
        }
    }

    const clearForm = () => {
        setOpendTutorName("")
        setOpendTutorSurname("")
        setOpendTutorTitleBefore(" ")
        setOpendTutorTitleAfter(" ")
        setID("")
    }

    const changeForm = (type: string) => {
        clearForm()
        setFormType(type)
    }

    //form submit decider
    const submitForm = async (e: any) => {

        e.preventDefault()
        if (formType === "new") {
            postTutor()
            clearForm()
            setFormType("new")
        }

        if (formType === "edit" && useDelete) {
            deleteTutor()
            clearForm()
            setFormType("new")
        }

        if (formType === "edit" && !useDelete) {
            updateTutor()
            clearForm()
            setFormType("new")
        }
    }

    //Create new Tutor
    const postTutor = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(FETCH_URL + "/api/tutor/create", {
                tutor: {
                    titleBefore: opendTutorTitleBefore,
                    name: opendTutorName,
                    surname: opendTutorSurnName,
                    titleAfter: opendTutorTitleAfter
                }
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            getAllTutors()

        }
        catch (error: any) {
            setError(error.message)
        }
    }

    //Delete Tutor
    const deleteTutor = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(FETCH_URL + "/api/tutor/delete", {
                tutor: {
                    _id: _id,
                    titleBefore: opendTutorTitleBefore,
                    name: opendTutorName,
                    surname: opendTutorSurnName,
                    titleAfter: opendTutorTitleAfter
                }
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            getAllTutors()

        }
        catch (error: any) {
            setError(error.message)
        }
    }

    //Update Tutor
    const updateTutor = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(FETCH_URL + "/api/tutor/update", {
                tutor: {
                    _id: _id,
                    titleBefore: opendTutorTitleBefore,
                    name: opendTutorName,
                    surname: opendTutorSurnName,
                    titleAfter: opendTutorTitleAfter
                }
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            getAllTutors()
        }
        catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <AdminContainer>
            <div>
                <h2 className="page-title">{Lang.adminTutorTitle[lang]}</h2>
                <div className="dashborad-wrapper">
                    <div className="dashboard">
                        <div className="dashboard__left">
                            <div className='right-btn-panel'>
                                <button className="button-custom button-custom-small" onClick={() => { changeForm("new") }}>
                                    {Lang.adminNewBtn[lang]}
                                </button>
                            </div>

                            <hr className='separator'></hr>
                            <Searcher

                                setIDCallback={setIDCallback}
                                items={tutorsForSearch!}
                                title={Lang.adminTutorsSearchField[lang]}
                            />
                        </div>
                        <div className="dashboard__right">

                            <h3 className="dashboard__right__title">
                                {Lang.adminRightTitle[lang]} - {formType === "new" ? Lang.adminFormTypeNew[lang] : Lang.adminFormTypeEdit[lang]}
                            </h3>

                            <div className="right-admin__wrapper">

                                <form onSubmit={submitForm} autoComplete="off" >

                                    {/* TITLE BEFORE */}
                                    <InputText
                                        label={Lang.adminRightTitleBefore[lang]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setOpendTutorTitleBefore(e.target.value) }}
                                        htmlFor="opendTutorTitleBefore"
                                        type="text"
                                        name="opendTutorTitleBefore"
                                        value={opendTutorTitleBefore}>
                                    </InputText>

                                    {/* NAME */}
                                    <InputText
                                        label={Lang.name[lang]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setOpendTutorName(e.target.value) }}
                                        htmlFor="name"
                                        type="text"
                                        name="name"
                                        value={opendTutorName}>
                                    </InputText>

                                    {/* SURNAME */}
                                    <InputText
                                        label={Lang.surname[lang]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setOpendTutorSurname(e.target.value) }}
                                        htmlFor="surname"
                                        type="text"
                                        name="surname"
                                        value={opendTutorSurnName}>
                                    </InputText>

                                    {/* TITLE AFTER */}
                                    <InputText
                                        label={Lang.adminRightTitleAfter[lang]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setOpendTutorTitleAfter(e.target.value) }}
                                        htmlFor="opendTutorTitleBefore"
                                        type="text"
                                        name="opendTutorTitleBefore"
                                        value={opendTutorTitleAfter}>
                                    </InputText>

                                    {/* FORM ACTIONS */}
                                    <div className='right-submit-panel' >
                                        {formType === "new" && <button className="button-custom button-custom-big" type="submit" onClick={() => setUseDelete(false)} > {Lang.adminSubmitBtn[lang]} </button>}
                                        {formType === "edit" &&
                                            <span>
                                                <button className="button-custom button-custom-big" type="submit" onClick={() => setUseDelete(true)} >
                                                    {Lang.adminDeletetBtn[lang]}
                                                </button>

                                                <span className='padder' ></span>

                                                <button className="button-custom button-custom-big" type="submit" onClick={() => setUseDelete(false)} >
                                                    {Lang.adminEdittBtn[lang]}
                                                </button>
                                            </span>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    )
};

export default AdminTutor;
