import "./styles/App.css"
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "./store/reducers/language"
import Translate from "./utils/Translate";
import Register from "./routes/Register";
import Login from "./routes/Login";
import StudentsDashboard from "./routes/StudentsDashboard";
import { authUserFailed, authUserSuccess } from "./store/reducers/auth";
import { useEffect } from "react";
import { setAuthToken } from "./utils/setAuthToken";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector((data: any) => {
    return data.language.language
  })
  const auth = useSelector((data: any) => {
    return data.auth.isAuthenticated
  })
  useEffect(() => {
    const token = localStorage.getItem("token")
    setAuthToken(token).then((res) => {
      if (res.msg) {
        dispatch(authUserSuccess({
          user: res.user,
          token: token
        }))
        navigate("/dashboard")
      } else {
        dispatch(authUserFailed())

      }

    }
    )

  },
    [dispatch, navigate])
  return (
    <div className="container">

      {!auth &&
        <><Link to="/registration"><Translate translationChunk="register" />
        </Link>
          {" | "}
          <Link to="/login"><Translate translationChunk="login" /></Link></>
      }
      {auth && <button onClick={() => {
        //Odhlášení uživatele
        dispatch(authUserFailed())
        localStorage.clear()
      }
      }>Odhlásit se</button>}
      <select onChange={(e) => {
        dispatch(changeLanguage(e.target.value))
      }}>
        <option value={lang}>{lang}</option>
        {lang === "cz" && <option value={"en"}>{"en"}</option>}
        {lang === "en" && <option value={"cz"}>{"cz"}</option>}
      </select>
      <Routes>
        <Route path="/registration" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<StudentsDashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>

    </div>
  )
}

export default App

