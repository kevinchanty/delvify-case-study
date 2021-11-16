import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TopBar from "./components/Topbar";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import './App.scss';
import { ListContext, ListContextState } from "./context/ListContext";

export default function App() {
  const [listContextState, setListContextState] = useState<ListContextState>({ status: "LOADING" });

  const loadLists = useCallback(async () => {
    const res = await fetch("http://localhost:3100/lists");
    const lists = await res.json();

    if (lists.error) {
      console.log("error");
      return
    };

    setListContextState({ status: "LOADED", value: lists });
  }, [setListContextState])

  useEffect(() => {
    loadLists();
  }, [loadLists])

  return (
    <Router>
      <ListContext.Provider value={listContextState}>
          <Routes>
            <Route path="/" element={<TopBar />} >
              <Route index element={<HomePage setListContextState={setListContextState} loadLists={loadLists} />} />
              <Route path="list/:listId" element={<ListPage />} />

              {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
              {/* <Route path="*" element={<NoMatch />} /> */}
            </Route>
          </Routes>
      </ListContext.Provider>
    </Router >
  );
}