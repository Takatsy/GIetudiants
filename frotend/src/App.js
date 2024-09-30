/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Semestre from "./pages/Semestre";
import Mention from "./pages/Mention";
import Domaine from "./pages/Domaine";
import Parcours from "./pages/Parcours";
import Grade from "./pages/Grade";
import Niveau from "./pages/Niveau";
import Etudiant from "./pages/Etudiant";
import Inscription from "./pages/Inscription";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/Semestre" component={Semestre} />
          <Route exact path="/Domaine" component={Domaine} />
          <Route exact path="/Parcours" component={Parcours} />
          <Route exact path="/Mention" component={Mention} />
          <Route exact path="/Grade" component={Grade} />
          <Route exact path="/Niveau" component={Niveau} />
          <Route exact path="/Etudiant" component={Etudiant} />
          <Route exact path="/Inscription" component={Inscription} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
