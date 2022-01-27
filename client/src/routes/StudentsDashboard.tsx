import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubjectInterface } from "../interface/subject";
import "./StudentDashboard.css"
const StudentsDashboard = () => {
    const authState = useSelector((data: any) => {
        return data.auth;
    })
    const lang = useSelector((data: any) => {
        return data.language.language
    })
    const navigate = useNavigate();
    useEffect(() => {
        if (!authState.isAuthenticated)
            navigate("/")
    }, [authState, navigate]);

    const [filteredSubjects, setFilteredSubjects] = useState<[]>([]);
    const [subjectSearch, setSubjectSearch] = useState<string>("");

    const getFilteredSubjects = (value: string): void => {
        setSubjectSearch(value);
        const pattern = new RegExp(value, "gi");
        const filtered = authState.subjects.filter((subject: SubjectInterface) => {
            //@ts-ignore
            return subject.languages[0][lang].name.match(pattern);
        }
        )
        setFilteredSubjects(filtered);
    }

    return <>
        {authState.isAuthenticated &&
            <div>
                <h1>Studentský Dashboard</h1>
                <p>Student: {authState.user.name} {authState.user.surname} | {authState.user.email}</p>
                <p>Forma studia: {authState.user.form}</p>
                <p>Level studia: {authState.user.level}</p>
                <p>Jazyk studia: {authState.user.language}</p>
                <div className="flex-row">
                    <div className="left-panel">
                        <label htmlFor="subject-search">
                            <h3>Vyhledávač předmětu</h3>
                            <input value={subjectSearch} type="text" name="subject-search" onChange={(e) => {
                                getFilteredSubjects(e.target.value);
                            }} />
                        </label>
                        {
                            filteredSubjects.map((sub, index) => (
                                <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                                    <div>{
                                        //@ts-ignore
                                        sub.languages[0][lang].name
                                    }</div>
                                    <div onClick={() => {
                                        console.log(index)
                                    }
                                    } tabIndex={index}>Zapsat</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="right-panel">
                        <h3>Zapsané předměty</h3>

                    </div>
                </div>
            </div>}
    </>;
};

export default StudentsDashboard;
