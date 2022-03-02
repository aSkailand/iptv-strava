import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Activity } from "./interfaces";

const App: React.FC<{}> = () => {
  const [clubActivities, setClubActivities] = useState<Activity[]>([]);
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    while (fetching && page < 10) {
      fetch(
        `https://www.strava.com/api/v3/clubs/1008526/activities?page=${page}`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer 4feb30660b8d39a6ab0c8e6037b7f501699d870a",
          },
        }
      )
        .then((response) => response.json())
        .then((activities: Activity[]) => {
          if (activities.length > 0) {
            setFetching(false);
          }
          setClubActivities([...clubActivities, ...activities]);
        });
      setPage(page + 1);
    }
  }, [fetching, clubActivities, page]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
