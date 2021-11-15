import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import TopBar from "./components/Topbar";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import './App.scss';
import { ListContext,ListContextState } from "./context/ListContext";

const sampleListState = [
  {
    id: 1,
    name: "List 1",
  },
  {
    id: 2,
    name: "List 2",
  },
  {
    id: 3,
    name: "List 3",
  },
]


export default function App() {
  const [listContextState, setListContextState] = useState<ListContextState>({status:"LOADING"});

  useEffect(() => {
    console.log(listContextState)
  }, [listContextState])

  return (
    <Router>
      <ListContext.Provider value={listContextState}>
        <TopBar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage setListContextState={setListContextState} />} />
            <Route path="home" element={<HomePage setListContextState={setListContextState}/>} />
            <Route path="list" element={<ListPage />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </Container>
      </ListContext.Provider>
    </Router >
  );
}