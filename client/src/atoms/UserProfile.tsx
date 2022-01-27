import "./UserProfile.scss"
import { useSelector } from "react-redux";
import { Lang } from "../langauges/Dictionary"

function UserProfile () {
    const lang = useSelector((data: any) => { return data.language.language })
    const authState = useSelector((data: any) => { return data.auth; })
    return (
        <span className="dropdown">
            <span className="user-pill">
                { Lang.profileLabel[lang] } 
            </span>

            <div className="dropdown__content">
                <span> { Lang.profileName[lang] } : {authState.user.name} {authState.user.surname}</span>
                <span> { Lang.profileEmail[lang] } : {authState.user.email}</span>
                <span> { Lang.profileForm[lang] } : {authState.user.form}</span>
                <span> { Lang.profileLevel[lang] } : {authState.user.level}</span>
                <span> { Lang.profileLanguage[lang] } : {authState.user.language}</span>
            </div>
        </span>
    )
}

export default UserProfile;
