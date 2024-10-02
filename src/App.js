// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import StudentJoinRequestPage from "./pages/StudentJoinRequestPage";
import AdminApprovePage from "./pages/AdminApprovePage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { role } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/admin-login" component={AdminLoginPage} />
        <Route path="/join-request" component={StudentJoinRequestPage} />
        {role === "admin" && <Route path="/approve" component={AdminApprovePage} />}
        {/* 기본적으로 /approve 페이지는 관리자만 접근 가능 */}
        <Redirect to={role === "admin" ? "/approve" : "/join-request"} />
      </Switch>
    </Router>
  );
}

export default App;
