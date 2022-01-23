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
    //const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [form, setForm] = useState<string>("");
    const [level, setLevel] = useState<string>("");
    const [prefferedLanguage, setPrefferedLanguage] = useState<string>("");
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
        if (name === "" && surname === "" && form === "" && level === "" && prefferedLanguage === "") {
            setErrorMessage("All fields are mandatory")
            setErrorStatus(false)
            dispatch(authUserFailed())
        }
        else if (password !== confirmedPassword) {
            setErrorMessage("Passwords does not match!")
            setErrorStatus(false)
            dispatch(authUserFailed())
        }
        else if (!validator.isEmail(email)) {
            setErrorMessage("Email is missing or this is invalid email")
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
                        name,
                        surname,
                        level,
                        form,
                        language: prefferedLanguage,
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
            <form onSubmit={submitForm} className="column-center" autoComplete="off" style={{ textAlign: "center" }}>
                <label htmlFor="name">
                    Name <br />
                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="name" />
                </label>
                <label htmlFor="surname">
                    Surname <br />
                    <input value={surname} onChange={(e) => { setSurname(e.target.value) }} type="text" name="surname" />
                </label>
                <label htmlFor="form">
                    Form <br />
                    <select onChange={(e) => {
                        setForm(e.target.value)
                    }
                    }>
                        <option value="">--</option>
                        <option value="daily">Daily</option>
                        <option value="distant">Distant</option>
                    </select>
                </label>
                <label htmlFor="level">
                    Level <br />
                    <select onChange={(e) => {
                        setLevel(e.target.value)
                    }
                    }>
                        <option value="">--</option>
                        <option value="Ing.">Ing.</option>
                        <option value="Bc.">Bc.</option>
                    </select>
                </label>
                <label htmlFor="Language">
                    Preffered Language <br />
                    <select onChange={(e) => {
                        setPrefferedLanguage(e.target.value)
                    }
                    }>
                        <option value="">--</option>
                        <option value="eng">eng</option>
                        <option value="cz">cz</option>
                    </select>
                </label>
                <label htmlFor="email">
                    {
                        //@ts-ignore
                        Lang.emailRegister[lang]
                    }
                    <br />
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" autoComplete="off" />
                </label>
                <label htmlFor="password">
                    {
                        //@ts-ignore
                        Lang.passwordRegister[lang]
                    }
                    <br />
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" />
                </label>
                <label htmlFor="password-cofirm">
                    {
                        //@ts-ignore
                        Lang.passwordConfirmRegister[lang]
                    }
                    <br />
                    <input value={confirmedPassword} onChange={(e) => { setConfirmedPassword(e.target.value) }} type="password" name="password-cofirm" />
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
