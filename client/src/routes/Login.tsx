import { Lang } from "../langauges/Dictionary"
import { useSelector } from "react-redux";
import Translate from "../utils/Translate";
import { useState } from "react";
import validator from "validator";

import "./Login.css"

const Login = () => {

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
                if (!data.success) {
                    setErrorStatus(false);
                    setErrorMessage(JSON.stringify(data.errorMap.err))
                } else {
                    localStorage.setItem("token", data.token)

                }
            } catch (error) {
                console.log(error)
            }
        }




    };

    return (
        <div className="column-center">
            <h3><Translate translationChunk='login' /></h3>
            <form onSubmit={submitForm} className="column-center">

                <label htmlFor="email">
                    {
                        //@ts-ignore
                        Lang.emailLogin[lang]
                    }
                    <br />
                    <input required onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" />
                </label>
                <label htmlFor="password">
                    {
                        //@ts-ignore
                        Lang.passwordLogin[lang]
                    }
                    <br />
                    <input required onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" />
                </label>

                <input type="submit" value={
                    //@ts-ignore
                    Lang.submitBtnLogin[lang]
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

export default Login;
