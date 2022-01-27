import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubjectInterface } from "../interface/subject";
import "./StudentDashboard.css"
import AppBar from "../molecules/AppBar";

const StudentsDashboard = () => {
    const authState = useSelector((data: any) => { return data.auth })
    const navigate = useNavigate();
    useEffect(() => { if (!authState.isAuthenticated) navigate("/") }, [authState, navigate]);

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
                <AppBar></AppBar>
                <h1>Studentský Dashboard</h1>
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
