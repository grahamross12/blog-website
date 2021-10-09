import { Navigation } from "./components";
import { Home, New, PageNotFound, Loading, BlogView } from "./views";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth0();

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <Navigation isAuthenticated={isAuthenticated} />
        <div className="contentWrapper">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/new" exact component={() => <New />} />
            <Route
              path="/user/:username/:blogTitle"
              exact
              component={() => <BlogView />}
            />
            <Route component={() => <PageNotFound />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
