import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import * as bootstrap from "bootstrap"

const HomePage = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<span>Завантаження...</span>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);
