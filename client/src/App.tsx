import "./styles/App.css"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Main from "./routes/Main";
import About from "./routes/About";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "./store/reducers/language"
import Translate from "./utils/Translate";

const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((data: any) => {
    return data.language.language
  })

  return (
    <div className="container">
      <BrowserRouter>
        <Link to="/"><Translate translationChunk="mainPage" /></Link>
        <Link to="/about"><Translate translationChunk="about" /></Link>
        <select onChange={(e) => {
          dispatch(changeLanguage(e.target.value))
        }}>
          <option value={lang}>{lang}</option>
          {lang === "cz" && <option value={"eng"}>{"eng"}</option>}
          {lang === "eng" && <option value={"cz"}>{"cz"}</option>}
        </select>
        {lang}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

