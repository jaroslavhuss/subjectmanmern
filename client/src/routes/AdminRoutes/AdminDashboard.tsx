/* eslint-disable */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../admin-components/AdminContainer";
import { FETCH_URL } from "./CONSTANT_CALL";
import { UserInterface } from "../../interface/UserInterface";
import { setError } from "../../store/reducers/errorReducer";
const AdminPanel = () => {
    let user = useSelector((data: any) => {
        return data.auth.user;
    })
    const [listOfStudents, setListOfStudents] = useState<UserInterface[]>([]);
    useEffect(() => {
        getAllStudents()
        return () => {
            user = {};
        }
    });

    const getAllStudents = async () => {
        try {
            const token: string | null = localStorage.getItem("token")
            const res = await fetch(`${FETCH_URL}/api/users/get/all`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const users = await res.json()
            setListOfStudents(users.users);
        } catch (error: any) {
            setError(error.message)
        }
    }
    return (
        <AdminContainer>
            <h1 style={{ margin: 10 }}>
                Admin: <span style={{ color: "red" }}>{user.name} {user.surname}</span>
            </h1>
            <div className="listOfStudents" style={{ display: "flex", flexWrap: "wrap" }}>
                {listOfStudents.map(({ name, email, surname, form, language, level, Subjects }: UserInterface, key) => (
                    <div style={{ flex: "30%", border: "1px solid white", padding: 10, margin: 4, display: "flex", flexDirection: "column" }} className="student-box" key={key}>
                        <span>Name: {name} {surname}</span>
                        <span>Email: {email}</span>
                        <span>Study Form: {form} | {language}</span>
                        <span>Level of study: {level}</span>
                        <span>Subscribed subjects: {Subjects.length}</span>
                    </div>
                ))}
            </div>
        </AdminContainer>);
};

export default AdminPanel;
