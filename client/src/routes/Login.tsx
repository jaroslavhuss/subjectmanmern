import { Lang } from "../langauges/Dictionary"
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import validator from "validator";
import "./Login.scss"
import { authUserSuccess } from "../store/reducers/auth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setAuthToken } from "../utils/setAuthToken";
import Box from "../atoms/Box";
import Logo from "../atoms/Logo"
import InputText from "../atoms/forms/InputText";
import FormErrors from "../atoms/forms/FormErrors";
import LanguageSwitch from "../atoms/forms/LanguageSwitch";

const Login = () => {
    const authState = useSelector((data: any) => { return data.auth; })
    const navigate = useNavigate();
    useEffect(() => { if (authState.isAuthenticated) { navigate("/dashboard") } }, [authState, navigate]);

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);
    const lang = useSelector((data: any) => { return data.language.language })

    const submitForm = async (e: any) => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            setErrorMessage("Email is missing or this is invalid email")
            setErrorStatus(false)
        } else if (password.length < 1 && password.length > 5) {
            setErrorMessage("Password is missing or its length is lesser than 6 characters")
            setErrorStatus(false)
        }
        else {
            try {
                const response = await fetch("http://localhost:5001/auth-api/login", {
                    headers: { 'Content-Type': 'application/json' },
                    method: "post",
                    body: JSON.stringify({ email, password })
                })

                const data: { success: boolean, errorMap: { err: [] }, token: string } = await response.json();

                if (!data.success) {
                    setErrorStatus(false);
                    setErrorMessage(JSON.stringify(data.errorMap.err))
                    localStorage.removeItem("token");
                } else {
                    localStorage.setItem("token", data.token)
                    const getUsersData = await setAuthToken(data.token);

                    dispatch(authUserSuccess({
                        token: data.token,
                        user: getUsersData.user
                    }))
                }
            } catch (error) {
                setErrorStatus(false);
                //@ts-ignore
                setErrorMessage(JSON.stringify(error.message))
                localStorage.removeItem("token");
                dispatch(authUserSuccess(""))
            }
        }
    };
    return (
        <div className="column-center">
            <Logo />
            <Box header={
                <div> 
                    <span className="header-title">{Lang.login[lang]}</span>
                    <span className="header-languge-switch"><LanguageSwitch></LanguageSwitch></span>  
                </div> 
            }>

            <form onSubmit={submitForm} className="column-center">

            {/* EMAIL */}
            <InputText 
                label={ Lang.emailLogin[lang] } 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                htmlFor="email"  
                type="email" 
                name="email">
            </InputText>

            {/* PASSWORD */}
            <InputText 
                label={ Lang.passwordLogin[lang] } 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void  => { setPassword(e.target.value) }}
                htmlFor="password"  
                type="password" 
                name="password">
            </InputText>

            <span className="login-submit"><input className="submit" type="submit" value={ Lang.submitBtnLogin[lang] } /></span>
            </form>

            {/* ERRORS */}
            {!errorStatus && <FormErrors error={ errorMessage } ></FormErrors>}

            {/* FOOTER*/}
            <p className="login-registration"> {Lang.registrationText[lang]} <Link to="/registration"> {Lang.registration[lang]} </Link></p>
            <p className="credits"> {Lang.credits[lang]} </p>
            </Box>
        </div> 
    );
};

export default Login;