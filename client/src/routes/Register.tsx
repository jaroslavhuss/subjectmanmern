import { Lang } from "../langauges/Dictionary"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import validator from "validator";
import "./Register.scss"
import { authUserFailed } from "../store/reducers/auth";
import { Link, useNavigate } from "react-router-dom";
import Box from "../atoms/Box";
import Logo from "../atoms/Logo"
import InputText from "../atoms/forms/InputText";
import FormErrors from "../atoms/forms/FormErrors";
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import FormSelect from "../atoms/forms/FormSelect";

const Register = () => {
    const navigate = useNavigate();
    const lang = useSelector((data: any) => { return data.language.language })
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [form, setForm] = useState<string>( Lang.formValuesDaily[lang] );
    const [level, setLevel] = useState<string>( "Bc." );
    const [prefferedLanguage, setPrefferedLanguage] = useState<string>( "cz" );
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);

    const dispatch = useDispatch();
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
            <Logo />

            <Box header={
                <div> 
                    <span className="header-title">{Lang.register[lang]}</span>
                    <span className="header-languge-switch"><LanguageSwitch></LanguageSwitch></span>  
                </div> 
            }>

            <form onSubmit={submitForm} className="column-center" autoComplete="off" >
                
            {/* NAME */}
            <InputText 
                label={ Lang.name[lang] } 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setName(e.target.value) }}
                htmlFor="name"  
                type="text" 
                name="name"
                value={ name }>
            </InputText>

            {/* SURNAME */}
            <InputText 
                label={ Lang.surname[lang] } 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setSurname(e.target.value) }}
                htmlFor="surname"  
                type="text" 
                name="surname"
                value={ surname }>
            </InputText>
            
            <div className="register-selects">
                {/* STUDY FORM */}
                <FormSelect 
                    label={ Lang.form[lang] } 
                    htmlFor="form" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setForm(e.target.value) }}
                    options={[ Lang.formValuesDaily[lang], Lang.formValuesDistant[lang] ]}>
                </FormSelect>

                {/* LEVEL */}
                <FormSelect 
                    label={ Lang.level[lang] } 
                    htmlFor="level" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setLevel(e.target.value) }}
                    options={[ "Bc.", "Ing." ]}>
                </FormSelect>

                {/* LANGUAGE */}
                <FormSelect 
                    label={ Lang.prefferdLanguage[lang] } 
                    htmlFor="Language" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setPrefferedLanguage(e.target.value) }}
                    options={[ "cz", "en" ]}>
                </FormSelect>
            </div>  

            {/* EMAIL */}
            <InputText 
                label={ Lang.emailRegister[lang] } 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setEmail(e.target.value) }}
                htmlFor="email"  
                type="email" 
                name="email"
                value={ email }>
            </InputText>

            {/* PASSWORD */}
            <InputText 
                label={ Lang.passwordRegister[lang]} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setPassword(e.target.value) }}
                htmlFor="password"  
                type="password" 
                name="password"
                value={ password }>
            </InputText>

            {/* PASSWORD */}
            <InputText 
                label={ Lang.passwordConfirmRegister[lang] } 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setConfirmedPassword(e.target.value) }}
                htmlFor="password-cofirm"  
                type="password" 
                name="password-cofirm"
                value={ confirmedPassword }>
            </InputText>
            
            {/* FORM CONTROL */}
            <div className="register-form-control">
                <Link to="/login"><button className="button-custom button-custom-big">{ Lang.backBtnRegister[lang] }</button></Link>
                <input className="submit" type="submit" value={ Lang.submitBtnRegister[lang] } />
            </div>
            </form>

            {/* ERRORS */}
            {!errorStatus && <FormErrors error={ errorMessage } ></FormErrors>}

            {/* FOOTER */}
            <p className="credits"> {Lang.credits[lang]} </p>
            </Box>
        </div>
    );
};

export default Register;
