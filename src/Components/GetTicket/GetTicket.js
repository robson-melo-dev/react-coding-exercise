import React from "react";
import "./GetTicket.css";
import back_icon from "../../assets/vector/chevronCircle2.svg";
import {Link} from "react-router-dom"

function GetTicket() {
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
                <h3>2007</h3>
                </div>
              </div>
              <div className="mission_name">
                <h4>MISSION NAME</h4>
                <h1>To The Moon And Back</h1>
              </div>
              <div className="rocket_details">
                <div className="rocket_name">
                  <h4>ROCKET NAME</h4>
                  <h4>Ricochet</h4>
                </div>
                <div className="rocket_type">
                  <h4>ROCKET TYPE</h4>
                  <h4>Coralina Freighter</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="print">
          <button className="btn-primary">Print Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default GetTicket;
