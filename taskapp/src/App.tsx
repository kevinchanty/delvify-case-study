import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TopBar from "./components/Topbar";
import './App.scss';
import HomePage from "./pages/HomePage";
import { Container } from "react-bootstrap";
import ListPage from "./pages/ListPage";

export default function BasicExample() {
  return (
    <Router>
      <TopBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="list" element={<ListPage />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </Container>
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