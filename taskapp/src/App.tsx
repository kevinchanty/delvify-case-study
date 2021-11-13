import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TopBar from "./components/Topbar";
import './App.scss';
import Home from "./pages/Home";

export default function BasicExample() {
  return (
    <Router>
      <TopBar />
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </Router >
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}