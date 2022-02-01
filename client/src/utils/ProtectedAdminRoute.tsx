import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRouteAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<string>("");
    const data = useSelector((data: any) => {
        return data.auth.user.authLevel
    })
    useEffect(() => {
        setIsAdmin(data)
    }, [data]);
    if (isAdmin === "Student") {
        return <Navigate to="/" />;
    }
    return <Outlet />
}
export default ProtectedRouteAdmin;
