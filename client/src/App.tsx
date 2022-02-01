import "./styles/App.scss"
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
/**
 * Admin components
 */
import Admin from "./utils/ProtectedAdminRoute"
import AdminPanel from "./routes/AdminRoutes/AdminPanel";
import AdminSubject from "./routes/AdminRoutes/AdminSubject";
import AdminTutor from "./routes/AdminRoutes/AdminTutor";
import AdminTopic from "./routes/AdminRoutes/AdminSubjects";

import Register from "./routes/Register";
import Login from "./routes/Login";
import StudentsDashboard from "./routes/StudentsDashboard";
import SubjectDetail from "./routes/SubjectDetail";

import { authUserFailed, authUserSuccess } from "./store/reducers/auth";
import { useEffect } from "react";
import { setAuthToken } from "./utils/setAuthToken";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token")
    setAuthToken(token).then((res) => {
      if (res.msg) {
        dispatch(authUserSuccess({
          user: res.user,
          token: token,
          subjects: res.subjects
        }))
        if (window.location.pathname === "/login") {
          navigate("/dashboard")
        }
      } else {
        dispatch(authUserFailed())
      }
    }
    )
  },
    [dispatch, navigate])
  return (
    <div className="container">
      <Routes>
        <Route path="/registration" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<StudentsDashboard />} />
        <Route path="/subjectDetail/:_id" element={<SubjectDetail />} />
        <Route path="*" element={<Login />} />
        <Route element={<Admin />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/subjects" element={<AdminSubject />} />
          <Route path="/tutors" element={<AdminTutor />} />
          <Route path="/topics" element={<AdminTopic />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

