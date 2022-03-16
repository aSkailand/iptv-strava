import React, { useState, useEffect } from "react";
import "./App.css";

const App: React.FC<{}> = () => {
  const [fetchingStats, setFetching] = useState(true);
  const [fetchingInfo, setFetchingInfo] = useState(true);
  const [atheleteStats, setAthleteStats] = useState({});
  const [atheleteInfo, setAtheleteInfo] = useState({});

  useEffect(() => {
    try {
      const request = fetch(
        `https://www.strava.com/api/v3/athletes/46439477/stats`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer c9fa92ce2dcd72923680183bcabc75143752f54b",
          },
        }
      );
      let stravaData = request.then((response) => response.json());
      stravaData.then((data) => {
        setAthleteStats(data);
        setFetching(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, [fetchingStats]);

  useEffect(() => {
    try {
      const request = fetch(`https://www.strava.com/api/v3/athlete`, {
        method: "GET",
        headers: {
          Authorization: "Bearer c9fa92ce2dcd72923680183bcabc75143752f54b",
        },
      });
      let stravaData = request.then((response) => response.json());
      stravaData.then((data) => {
        setAtheleteInfo(data);
        setFetchingInfo(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, [fetchingInfo]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {fetchingStats ? "Loading strava data..." : "Strava athlete obtained"}
          {fetchingInfo
            ? "Loading strava athlete info"
            : "Strava athlete info obtained"}
        </p>
        <p></p>
      </header>
    </div>
  );
};

export default App;
