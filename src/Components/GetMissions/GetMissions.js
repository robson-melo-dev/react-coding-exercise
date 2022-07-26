import React from "react";
import { useQuery, gql } from "@apollo/client";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import "./GetMissions.css";

function GetMissions() {
  //query to get all the mission information for the missions list display
  const GET_MISSIONS = gql`
    {
      launchesPast(limit: 10) {
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
        launch_year
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_MISSIONS);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <div className="missions-table">
      <div className="Missions">
        <div className="mission-header">
          <h4 className="mission-header-cell">MISSION NAME</h4>
          <h4 className="mission-header-cell">ROCKET NAME</h4>
          <h4 className="mission-header-cell center">ROCKET TYPE</h4>
          <h4 className="mission-header-cell center">LAUNCH YEAR</h4>
        </div>

        {data.launchesPast.map((mission) => {
          console.log(mission);
          return (
            <div className="mission">
              <div className="cell">{mission.mission_name}</div>
              <div className="cell">{mission.rocket.rocket_name}</div>
              <div className="cell center">{mission.rocket.rocket_type}</div>
              <div className="cell center">{mission.launch_year}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetMissions;
