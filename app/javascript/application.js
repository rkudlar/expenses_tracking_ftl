import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import * as bootstrap from "bootstrap"
import { UI_PATHS } from "./packs/constants";

const HomePage = lazy(() => import("./pages/Home"));
const RecordEditPage = lazy(() => import("./pages/RecordEdit"));
const RecordAddPage = lazy(() => import("./pages/RecordAdd"));
const SharePage = lazy(() => import("./pages/Share"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<span>Завантаження...</span>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path={`${UI_PATHS.RECORD_NEW}`} component={RecordAddPage} />
            <Route exact path={`${UI_PATHS.RECORD_EDIT}`} component={RecordEditPage} />
            <Route exact path={`${UI_PATHS.SHARE}`} component={SharePage} />
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
