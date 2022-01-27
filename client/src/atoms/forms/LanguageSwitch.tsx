import "./LanguageSwitch.scss"
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "../../store/reducers/language"

function LanguageSwitch () {
    const dispatch = useDispatch();
    const lang = useSelector((data: any) => {
        return data.language.language
      })

    return (
        <select className="language-switch" onChange={(e) => { dispatch(changeLanguage(e.target.value)) }}>
            <option value={lang}>{lang}</option>
            { lang === "cs" && <option value={"en"}>{"en"} </option>}
            { lang === "en" && <option value={"cs"}>{"cs"} </option>}  
        </select>  
    )
}

export default LanguageSwitch;