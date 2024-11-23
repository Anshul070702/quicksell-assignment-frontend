import React from "react";
import "./Ticket.css";
import { MdFiberManualRecord } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import dotMenu from "../../Assets/dotmenu.svg";
import Done from "../../Assets/Done.svg";

function Ticket({ ticket }) {
  return (
    <div className="ticket-main">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        <MdAccountCircle color="#535353" style={{ fontSize: "24px" }} />
      </div>
      <div className="ticket-content">
        <div className="ticket-content-title">
          <img
            src={Done}
            alt="Done"
            style={{ fontSize: "16px", color: "#5D3FD3" }}
          />
          <div className="ticket-title">
            <b>{ticket.title}</b>
          </div>
        </div>
      </div>
      <div className="ticket-metadata">
        <div className="ticket-tags">
          <div className="ticket-tag">
            <img
              src={dotMenu}
              alt="Dot Menu"
              style={{ color: "#535353", height: "12px", width: "12px" }}
            />
          </div>
          {ticket.tag.map((tag, key) => {
            return (
              <div key={key} className="ticket-tag">
                <MdFiberManualRecord
                  color="disabled"
                  sx={{ fontSize: "12px" }}
                />
                <div>{tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
