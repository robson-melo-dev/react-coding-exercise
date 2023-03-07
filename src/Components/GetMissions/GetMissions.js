import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import "./GetMissions.css";
import Arrow from "./Arrow.js";
import next_icon from "../../assets/vector/chevronCircle.svg";
import logo from "../../assets/vector/wordmark.svg";
import{Link} from "react-router-dom"

function GetMissions() {
  let limit = 0;
  const [page, setPage] = useState(6);
  const [sort, setSort] = useState('sort: "rocket_name", order: "desc"'); // set default sorting to be the launch year
  const [direction, setDirection] = useState("asc");
  const [find, setFind] = useState('find: {mission_name: ""}');
  const [searchWord, setSearchWord] = useState("");
  const [visibleArrow, setVisibleArrow] = useState({
    name: "",
    r_name: "",
    r_type: "",
    l_year: "",
  });
  //query to get all the mission information for the missions list display
  /* const GET_MISSIONS = gql`
   {
     launches(${sort} ${find}) {
       mission_name
       launch_date_utc
       rocket {
         rocket_name
         rocket_type
       }
       launch_year
       id
     }
   }
   `; */
   const GET_MISSIONS = gql `query Launches($find: LaunchFind, $order: String, $sort: String) {
    launches(find: $find, order: $order, sort: $sort) {
      id
      mission_name
      rocket {
        rocket_type
        rocket_name
      }
      launch_date_utc
    }
  }`;
  const { data, loading, error } = useQuery(GET_MISSIONS);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  limit = data.launches.length;
  console.log(data)

  function loadMore(e) {
    e.preventDefault();
    if (limit > 0) {
      if (page + 6 < limit) {
        setPage(page + 6);
      } else {
        setPage(limit);
      }
    }
  }

  function sortResult(e) {
    if (e.target.id === "name") {
      setVisibleArrow({ name: "visible", r_name: "", r_type: "", l_year: "" });
      if (direction === "desc") {
        setDirection("asc");
        setSort(', order: "desc", sort: "mission_name"');
      } else {
        setDirection("desc");
        setSort(', order: "asc", sort: "mission_name"');
      }
    } else if (e.target.id === "r_name") {
      setVisibleArrow({ name: "", r_name: "visible", r_type: "", l_year: "" });
      if (direction === "desc") {
        setDirection("asc");
        setSort(', order: "desc", sort: "rocket_name"');
      } else {
        setDirection("desc");
        setSort(', order: "asc", sort: "rocket_name"');
      }
    } else if (e.target.id === "r_type") {
      setVisibleArrow({ name: "", r_name: "", r_type: "visible", l_year: "" });
      if (direction === "desc") {
        setDirection("asc");
        setSort(', order: "desc", sort: "rocket_type"');
      } else {
        setDirection("desc");
        setSort(', order: "asc", sort: "rocket_type"');
      }
    } 
    if (page < limit) {
      setPage(6);
    } else {
      setPage(limit);
    }
  }

  function handleSearchWord(e) { //event listener for the input word in the search field
    setSearchWord(e.target.value);
  }

  function searchMissions() {
    setFind(`, find: {mission_name: "${searchWord}"}`);
  }

  function renderLoadMore(){ // only renders the Load More section and buton if there is more than 6 results
    if(data.launches.length > 6){
      return(
        <div className={'load-more'}>
            <p className="page">
              {page} of {limit}
            </p>
            <button className="btn-primary" onClick={loadMore}>
              Load More
            </button>
          </div>

      )
    }
  }

  function renderNoResults(){ // only renders this portin if there is no results in the search
    if(data.launches.length === 0){
      return(
        <div className="mission">
          <h3>No results found for the search...</h3>
        </div>
      )
    }
  }

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <header className="header">
          <img src={logo} alt="" className="logo" />
          <input
            type="text"
            className="search_input"
            placeholder={"Search for flights"}
            value={searchWord}
            onChange={handleSearchWord}
          />
          <button className="btn-primary btn_search" onClick={searchMissions}>
            Search
          </button>
        </header>
      </div>

      <div className="missions-table">
        <div className="missions">
          <div className="mission-header">
            <h4 className="mission-header-cell">
              <span id="name" className="column-title" onClick={sortResult}>
                MISSION NAME
              </span>
              <Arrow direction={direction} visible={visibleArrow.name} />
            </h4>
            <h4 className="mission-header-cell">
              <span id="r_name" className="column-title" onClick={sortResult}>
                ROCKET NAME
              </span>
              <Arrow direction={direction} visible={visibleArrow.r_name} />
            </h4>
            <h4 className="mission-header-cell center">
              <span id="r_type" className="column-title" onClick={sortResult}>
                ROCKET TYPE
              </span>
              <Arrow direction={direction} visible={visibleArrow.r_type} />
            </h4>
            <h4 className="mission-header-cell center">
              <span id="l_year" className="column-title" onClick={sortResult}>
                LAUNCH YEAR
              </span>
              <Arrow direction={direction} visible={visibleArrow.l_year} />
            </h4>
          </div>
          <div className="thin_ruler">
            <div className="fat_ruler"></div>
          </div>

          {data.launches.map((mission, index) => {
            let year = new Date(mission.launch_date_utc).getUTCFullYear()
              if (index < page) {
                return (
                  <Link to="/ticket" state={{ id: mission.id}}>
                  <div className={"mission"} key={mission.id}>                    
                    <div className="cell">{mission.mission_name}</div>
                    <div className="cell">{mission.rocket.rocket_name}</div>
                    <div className="cell center">
                      {mission.rocket.rocket_type}
                    </div>
                    <div className="cell center">{year}</div>
                    <div className=" center">
                      <img src={next_icon} alt="" className="next-icon" />
                    </div>                    
                  </div>
                  </Link>
                );
              }
             
          })
          }


          {renderNoResults()}

          {renderLoadMore()}
          {/* <div className={'load-more'}>
            <p className="page">
              {page} of {limit}
            </p>
            <button className="btn-primary" onClick={loadMore}>
              Load More
            </button>
          </div> */}


        </div>
      </div>

      
    </div>
  );
}

export default GetMissions;
