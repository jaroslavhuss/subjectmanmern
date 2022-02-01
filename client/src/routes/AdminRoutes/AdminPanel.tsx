import { useSelector } from "react-redux";
import AdminContainer from "../../admin-components/AdminContainer";

const AdminPanel = () => {
    const user = useSelector((data: any) => {
        return data.auth.user;
    })

    return (
        <AdminContainer>
            <p>
                Admin: {user.name}
            </p>
        </AdminContainer>);
};

export default AdminPanel;
