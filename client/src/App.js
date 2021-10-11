import { Navigation, CreateUser } from "./components";
import { Home, New, PageNotFound, Loading, BlogView } from "./views";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./auth/protected-route";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <Navigation isAuthenticated={isAuthenticated} user={user} />
        <div className="contentWrapper">
          <Switch>
            <Route
              path={["/", "/user/:username", "/?search=:searchQuery"]}
              exact
              component={() => <Home user={user} />}
            />
            <ProtectedRoute
              path="/new"
              exact
              component={() => <New user={user} />}
            />
            <ProtectedRoute
              path="/callback"
              exact
              component={() => <CreateUser user={user} />}
              user={user}
            />

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
