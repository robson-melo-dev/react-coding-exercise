import React from "react";
import "./GetTicket.css";
import back_icon from "../../assets/vector/chevronCircle2.svg";
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

function GetTicket() {
  const location = useLocation()
  const { id } = location.state
  const GET_MISSION_DATA = gql`
   {
     launch(id: "${id}") {
      launch_date_utc
       mission_name
       rocket {
         rocket_name
         rocket_type
       }
       id
     }
   }
   `;

   const { data, loading, error } = useQuery(GET_MISSION_DATA);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

  function printTicket(){
    window.print()
  }

  let year = new Date(data.launch.launch_date_utc).getUTCFullYear()

  return (
    <div className="ticket-wrapper">
      <div className="wrapper-2">
        <div className="wrapper-3">
          <div className="back">
            <Link to="/">
            <img src={back_icon} alt="" />
            </Link>
          </div>
          <div className="ticket">
            <div className="mission-details">
              <div className="year_wrapper">
                <div className="launch_year">
                <h6>LAUNCH YEAR</h6>
                <h3 className="year">{year}</h3>
                </div>
              </div>
              <div className="mission_name">
                <h4>MISSION NAME</h4>
                <h1 className="name">{data.launch.mission_name}</h1>
              </div>
              <div className="rocket_details">
                <div className="rocket_name">
                  <h4>ROCKET NAME</h4>
                  <h4 className="r_name">{data.launch.rocket.rocket_name}</h4>
                </div>
                <div className="rocket_type">
                  <h4>ROCKET TYPE</h4>
                  <h4 className="r_type">{data.launch.rocket.rocket_type}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="print">
          <button className="btn-primary" onClick={printTicket}>Print Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default GetTicket;
