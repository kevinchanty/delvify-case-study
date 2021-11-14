import { createContext } from "react";
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

type ListState = {
  id: number,
  name: string,
}

export function setList(postList:Post[]) {
  return {
      type: "setPost" as const,
      postList
  }
};

export type ListAction = 
    |ReturnType <typeof setPost>

function listReducer(state: ListState, action) {
  switch (action.type) {
      return
}
}

export default function App() {
  const ListContext = createContext(sampleListState)


  return (
    <Router>
      <ListContext.Provider value={sampleListState}>
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
      </ListContext.Provider>
    </Router >
  );
}