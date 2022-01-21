import "./styles/App.css"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Main from "./routes/Main";
import About from "./routes/About";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "./store/reducers/language"
import Translate from "./utils/Translate";
import Register from "./routes/Register";
import Login from "./routes/Login";


const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((data: any) => {
    return data.language.language
  })
  useSelector((data: any) => {
    console.log(data)
  })

  return (
    <div className="container">
      <BrowserRouter>
        <Link to="/"><Translate translationChunk="mainPage" /></Link>
        <Link to="/about"><Translate translationChunk="about" /></Link>
        <Link to="/registration"><Translate translationChunk="register" /></Link>
        <Link to="/login"><Translate translationChunk="login" /></Link>
        <select onChange={(e) => {
          dispatch(changeLanguage(e.target.value))
        }}>
          <option value={lang}>{lang}</option>
          {lang === "cz" && <option value={"eng"}>{"eng"}</option>}
          {lang === "eng" && <option value={"cz"}>{"cz"}</option>}
        </select>

        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

