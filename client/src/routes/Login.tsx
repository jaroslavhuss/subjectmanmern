import { Lang } from "../langauges/Dictionary"
import { useSelector, useDispatch } from "react-redux";
import Translate from "../utils/Translate";
import { useState } from "react";
import validator from "validator";
import "./Login.css"
import { authUserSuccess } from "../store/reducers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/setAuthToken";
import Box from "../atoms/Box";
import Logo from "../atoms/Logo"

const Login = () => {
    const authState = useSelector((data: any) => {
        return data.auth;
    })

    const navigate = useNavigate();
    useEffect(() => {
        console.log(authState);
        if (authState.isAuthenticated) {
            navigate("/dashboard")
        }

    }, [authState, navigate]);

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);
    const lang = useSelector((data: any) => {
        return data.language.language
    })

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
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "post",
                    body: JSON.stringify({
                        email,
                        password
                    })
                })
                const data: { success: boolean, errorMap: { err: [] }, token: string } = await response.json();
                console.log(data)
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
            <Box header={<Translate translationChunk='login' />}>
            <form onSubmit={submitForm} className="column-center">

            {/* EMAIL */}
            <div className="form-field">
                <label className="form-field__label" htmlFor="email" >{ Lang.emailLogin[lang] }</label>
                <br />
                <input className="form-field__input" required onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" />
            </div>

            {/* PASSWORD */}
            <div className="form-field">
                <label className="form-field__label" htmlFor="password"> {Lang.passwordLogin[lang] } </label>
                <br />
                <input className="form-field__input" required onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" />
            </div>

            <input type="submit" value={ Lang.submitBtnLogin[lang] } />
            </form>
            {!errorStatus && <div style={{
                fontSize: 10,
                color: "red",
                padding: 10,
                maxWidth: 600,
                margin: "0 auto"
            }}>{errorMessage}</div>}
            </Box>
        </div>
        
    );
};

export default Login;