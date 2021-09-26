import NavbarBlog from "./components/navbar.jsx";
import Feed from "./components/feed.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavbarBlog />
      <div className="contentWrapper">
        <Feed />
      </div>
    </div>
  );
}

export default App;
