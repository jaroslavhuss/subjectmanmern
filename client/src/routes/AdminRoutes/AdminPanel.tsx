import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminContainer from "../../admin-components/AdminContainer";
import { FETCH_URL } from "./CONSTANT_CALL";
import { UserInterface } from "../../interface/UserInterface";
const AdminPanel = () => {
    const user = useSelector((data: any) => {
        return data.auth.user;
    })
    const [listOfStudents, setListOfStudents] = useState<UserInterface[]>([]);
    useEffect(() => {
        getAllStudents()
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
        } catch (error) {

        }
    }
    return (
        <AdminContainer>
            <p>
                Admin: {user.name}
            </p>
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
