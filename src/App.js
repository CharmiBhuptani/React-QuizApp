import { Routes, Route } from "react-router-dom";

import "./assets/styles/style.scss";

import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import ScorePage from "./pages/ScorePage";

import { QuestionProvider } from "./helpers/questionHelper";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const context = new AudioContext();
  context.resume();

  return (
    <GoogleOAuthProvider clientId="289502952493-7978v49lfvcniadccb7iu7mu1mj1pjvi.apps.googleusercontent.com">
      <QuestionProvider>
        <main>
          <Routes>
            <Route path="/" element={<HomePage context={context} />}></Route>
            <Route
              path="question"
              element={<QuestionPage context={context} />}
            ></Route>
            <Route
              path="score"
              element={<ScorePage context={context} />}
            ></Route>
          </Routes>
        </main>
      </QuestionProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
