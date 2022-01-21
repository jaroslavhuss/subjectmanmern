import { Lang } from "../langauges/Dictionary"
import { useSelector } from "react-redux";
import Translate from "../utils/Translate";
import { useState } from "react";
import validator from "validator";
import "./Register.css"

const Register = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);

    const lang = useSelector((data: any) => {
        return data.language.language
    })
    const submitForm = async (e: any) => {
        e.preventDefault();
        if (username.length <= 5) {
            //
            setErrorMessage("Username is missing")
            setErrorStatus(false)
        } else if (!validator.isEmail(email)) {
            setErrorMessage("Email is missing or this is invalid email")
            setErrorStatus(false)
        } else if (password.length < 1 && password.length > 5) {
            setErrorMessage("Password is missing or its length is lesser than 6 characters")
            setErrorStatus(false)
        } else if (confirmedPassword.length < 1) {
            setErrorMessage("Confirmed password is missing")
            setErrorStatus(false)
        } else if (password !== confirmedPassword) {
            setErrorMessage("Password does not match the confirmed password")
            setErrorStatus(false)
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
            <h3><Translate translationChunk='register' /></h3>
            <form onSubmit={submitForm} className="column-center">
                <label htmlFor="username">
                    {
                        //@ts-ignore
                        Lang.usernameRegister[lang]
                    }
                    <br />
                    <input required onChange={(e) => { setUsername(e.target.value) }} type="text" name="username" />
                </label>
                <label htmlFor="email">
                    {
                        //@ts-ignore
                        Lang.emailRegister[lang]
                    }
                    <br />
                    <input required onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" />
                </label>
                <label htmlFor="password">
                    {
                        //@ts-ignore
                        Lang.passwordRegister[lang]
                    }
                    <br />
                    <input required onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" />
                </label>
                <label htmlFor="password-cofirm">
                    {
                        //@ts-ignore
                        Lang.passwordConfirmRegister[lang]
                    }
                    <br />
                    <input required onChange={(e) => { setConfirmedPassword(e.target.value) }} type="password" name="password-cofirm" />
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
