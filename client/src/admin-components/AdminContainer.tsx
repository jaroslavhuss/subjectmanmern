import React, { useEffect } from "react";
import AdminMenu from "./AdminMenu"
import "./AdminContainer.scss"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminContainer = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const authState = useSelector((data: any) => { return data.auth });
    useEffect(() => {
        if (!authState.isAuthenticated) navigate("/")
    }, [authState, navigate]);
    return (
        <div className="admin-container">
            <AdminMenu />
            {children}
        </div>
    );
};

export default AdminContainer;
