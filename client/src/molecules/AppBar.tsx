import "./AppBar.scss"
import { useSelector, useDispatch } from "react-redux";
import { authUserFailed } from "../store/reducers/auth";
import { Lang } from "../langauges/Dictionary"
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import Logo from "../atoms/Logo";
import UserProfile from "../atoms/UserProfile";
import { Link } from "react-router-dom"

function AppBar() {
    const dispatch = useDispatch();
    const auth = useSelector((data: any) => { return data.auth.isAuthenticated })
    const lang = useSelector((data: any) => { return data.language.language })
    const isAdmin = useSelector((data: any) => { return data.auth.user.authLevel })
    return (
        <div className="app-bar">

            <span className="app-bar__section-left">
                <Logo useSmall={true} />
            </span>

            <span className="app-bar__section-right">

                <span>
                    <UserProfile />
                </span>

                <span className="padder" />

                <span className="switch-bar">
                    <LanguageSwitch />
                </span>

                <span className="padder" />

                {auth &&
                    <button className="button-custom button-custom-small" onClick={() => { dispatch(authUserFailed()); localStorage.clear() }}>
                        {Lang.btnLogOff[lang]}
                    </button>
                }
                {isAdmin === "Admin" &&
                    <>
                        <span className="padder" />
                        <span className="user-pill">
                            <Link style={{ color: "red", textDecoration: "none", fontWeight: "bold" }} to="/admin-panel">Admin</Link>
                        </span>
                    </>
                }

            </span>
        </div>
    )
}
export default AppBar;
