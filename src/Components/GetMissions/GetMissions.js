import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import "./GetMissions.css";
import Arrow from './Arrow.js'

function GetMissions() {

  const [limit, setLimit] = useState(6)
  const [sort, setSort] = useState(' ')
   //query to get all the mission information for the missions list display
   const GET_MISSIONS = gql`
   {
     launchesPast(limit: ${limit} ${sort}) {
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

  function loadMore(e){
    e.preventDefault();
    setLimit(limit+6)
  }

  function sortResult(e){
    e.preventDefault();
    setSort(', sort: "mission_name"')

  }
  console.log(data.launchesPast)

  return (
    <div className="missions-table">
      <div className="Missions">
        <div className="mission-header">
          <h4 className="mission-header-cell">MISSION NAME <span onClick={sortResult}><Arrow/></span></h4>
          <h4 className="mission-header-cell">ROCKET NAME</h4>
          <h4 className="mission-header-cell center">ROCKET TYPE</h4>
          <h4 className="mission-header-cell center">LAUNCH YEAR</h4>
        </div>

        {data.launchesPast.map((mission) => {
          return (
            <div className="mission">
              <div className="cell">{mission.mission_name}</div>
              <div className="cell">{mission.rocket.rocket_name}</div>
              <div className="cell center">{mission.rocket.rocket_type}</div>
              <div className="cell center">{mission.launch_year}</div>
            </div>
          );
        })}
        <div className="load-more">
          <p>{limit} of {data.launchesPast.length}</p>
        <button className="btn-primary" onClick={loadMore}>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default GetMissions;
