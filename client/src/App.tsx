import "./styles/App.css"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Main from "./routes/Main";
import About from "./routes/About";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "./store/reducers/language"
const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((data: {
    language: {
      language: "cz" | "eng"
    }
  }) => {
    return data.language.language
  })

  return (
    <div className="container">
      <BrowserRouter>
        <Link to="/">Hlavní stránka</Link>
        <Link to="/about">O nas</Link>
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

