import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import "./GetMissions.css";
import Arrow from './Arrow.js'

function GetMissions() {
  let limit= 0
  const [page, setPage] = useState(6)
  const [sort, setSort] = useState(' ')
   //query to get all the mission information for the missions list display
   const GET_MISSIONS = gql`
   {
     launchesPast(limit: 0 ${sort}) {
       mission_name
       rocket {
         rocket_name
         rocket_type
       }
       launch_year
       id
     }
   }
   `;
  const { data, loading, error } = useQuery(GET_MISSIONS);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  limit=data.launchesPast.length

  function loadMore(e){
    e.preventDefault();
    if((page+6)<limit){
      setPage(page+6)
    }else{setPage(limit)}
    
  }

  function sortResult(e){
    e.preventDefault()
    setSort(', sort: "mission_name"')
    if(page<limit){
      setPage(6)
    }else{setPage(limit)}   
  }

  function toggleHover(e){
    if(e.target.className=="mission"){
      e.target.className = "mission row_hover"
    }else{
      e.target.className = "mission"
    }
  }


  return (
    <div className="missions-table">
      <div className="missions">
        <div className="mission-header">
          <h4 className="mission-header-cell">MISSION NAME <span onClick={sortResult}><Arrow/></span></h4>
          <h4 className="mission-header-cell">ROCKET NAME</h4>
          <h4 className="mission-header-cell center">ROCKET TYPE</h4>
          <h4 className="mission-header-cell center">LAUNCH YEAR</h4>
        </div>

        {
        data.launchesPast.map((mission, index) => {
          if(index<page){
            console.log(mission.id)
            return (
              <div className={'mission'} key={mission.id}>
                <div className="cell">{mission.mission_name}</div>
                <div className="cell">{mission.rocket.rocket_name}</div>
                <div className="cell center">{mission.rocket.rocket_type}</div>
                <div className="cell center">{mission.launch_year}</div>
              </div>
            );
          }
          }
          )}
        <div className="load-more">
          <p className="page">{page} of {limit}</p>
        <button className="btn-primary" onClick={loadMore}>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default GetMissions;
