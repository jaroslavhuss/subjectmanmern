import { useNavigate, Route } from "react-router-dom";



const Private = ({ component: Component, ...rest }: any) => {
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            element={(props: any) => {
                localStorage.getItem("authToken") ? <Component {...props} /> : navigate("/login")
            }
            }
        />
    );
};

export default Private;
