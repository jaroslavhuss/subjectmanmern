import { Lang } from "../langauges/Dictionary"
import { useDispatch, useSelector } from "react-redux";
import Translate from "../utils/Translate";
import { useState } from "react";
import validator from "validator";
import "./Register.css"
import { authUserFailed } from "../store/reducers/auth";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);

    const dispatch = useDispatch();
    const lang = useSelector((data: any) => {
        return data.language.language
    })
    const submitForm = async (e: any) => {
        e.preventDefault();
        if (username.length <= 5) {
            //
            dispatch(authUserFailed())
            setErrorMessage("Username is missing")
            setErrorStatus(false)
        } else if (!validator.isEmail(email)) {
            setErrorMessage("Email is missing or this is invalid email")
            setErrorStatus(false)
            dispatch(authUserFailed())
        } else if (password.length < 1 && password.length > 5) {
            setErrorMessage("Password is missing or its length is lesser than 6 characters")
            setErrorStatus(false)
            dispatch(authUserFailed())
        } else if (confirmedPassword.length < 1) {
            dispatch(authUserFailed())
            setErrorMessage("Confirmed password is missing")
            setErrorStatus(false)
        } else if (password !== confirmedPassword) {
            setErrorMessage("Password does not match the confirmed password")
            setErrorStatus(false)
            dispatch(authUserFailed())
        }
        else {
            try {
                const response = await fetch("http://localhost:5001/auth-api/register", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "post",
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                })
                const data: { success: boolean, errorMap: { err: [] }, token: string } = await response.json();
                if (!data.success) {
                    setErrorStatus(false);
                    setErrorMessage(JSON.stringify(data.errorMap.err))
                    dispatch(authUserFailed())
                } else {

                    navigate("/login");
                }
            } catch (error) {
                setErrorStatus(false);
                //@ts-ignore
                setErrorMessage(JSON.stringify(error.message))
                dispatch(authUserFailed())
            }
        }
    };

    return (
        <div className="column-center">
            <h3><Translate translationChunk='register' /></h3>
            <form onSubmit={submitForm} className="column-center">
                <label htmlFor="username">
                    {
                        //@ts-ignore
                        Lang.usernameRegister[lang]
                    }
                    <br />
                    <input onChange={(e) => { setUsername(e.target.value) }} type="text" name="username" />
                </label>
                <label htmlFor="email">
                    {
                        //@ts-ignore
                        Lang.emailRegister[lang]
                    }
                    <br />
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" />
                </label>
                <label htmlFor="password">
                    {
                        //@ts-ignore
                        Lang.passwordRegister[lang]
                    }
                    <br />
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" />
                </label>
                <label htmlFor="password-cofirm">
                    {
                        //@ts-ignore
                        Lang.passwordConfirmRegister[lang]
                    }
                    <br />
                    <input onChange={(e) => { setConfirmedPassword(e.target.value) }} type="password" name="password-cofirm" />
                </label>
                <input type="submit" value={
                    //@ts-ignore
                    Lang.submitBtnRegister[lang]
                } />
            </form>
            {!errorStatus && <div style={{
                fontSize: 10,
                color: "red",
                padding: 10,
                maxWidth: 600,
                margin: "0 auto"
            }}>{errorMessage}</div>}

        </div>
    );
};

export default Register;
