import { Navigation, Home, New } from "./components";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/");
        setIsAuthenticated(response.json());
      } catch (err) {
        console.error(err);
      }
      console.log(isAuthenticated);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation isAuthenticated={isAuthenticated} />
        <div className="contentWrapper">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/new" exact component={() => <New />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
