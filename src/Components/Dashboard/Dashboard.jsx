import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import List from "../List/List";
import Add from "../../Assets/add.svg";
import { MdAccountCircle } from "react-icons/md";
import { APIdata } from "../../Utils/constants";
import dotMenu from "../../Assets/dotmenu.svg";

function Dashboard({
  statuses,
  priorities,
  priorityScores,
  grouping,
  ordering,
}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ tickets: [], users: [] });
  const [ticketMap, setTicketMap] = useState([]);

  useEffect(() => {
    fetch(APIdata)
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Helper function to sort by title
  const cmpTitle = (a, b) => a.title.localeCompare(b.title);

  // Helper function to sort by priority
  const cmpPriority = (a, b) => b.priority - a.priority;

  // Generic function to group and sort tickets
  const groupAndSortTickets = (grouping, ordering) => {
    let groupedTickets = [];

    switch (grouping) {
      case "Status":
        groupedTickets = statuses.map((status) =>
          data.tickets.filter((ticket) => ticket.status === status.name)
        );
        break;
      case "User":
        groupedTickets = data.users.map((user) =>
          data.tickets.filter((ticket) => ticket.userId === user.id)
        );
        break;
      case "Priority":
        groupedTickets = priorityScores.map((priority) =>
          data.tickets.filter((ticket) => ticket.priority === priority)
        );
        break;
      default:
        break;
    }

    // Sort based on the selected ordering (Title or Priority)
    groupedTickets.forEach((ticketList) => {
      if (ordering === "Title") {
        ticketList.sort(cmpTitle);
      } else if (ordering === "Priority") {
        ticketList.sort(cmpPriority);
      }
    });

    setTicketMap(groupedTickets);
  };

  // Use effect to group and sort tickets whenever grouping or ordering changes
  useEffect(() => {
    groupAndSortTickets(grouping, ordering);
  }, [grouping, ordering, data]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="dashboard-main">
      {ticketMap.map((ticketList, key) => {
        const headerInfo =
          grouping === "Status"
            ? statuses[key]
            : grouping === "User"
            ? data.users[key]
            : {
                label: priorities[priorityScores[key]]?.label || "No priority",
                img: priorities[priorityScores[key]]?.img,
              };

        return (
          <div className="dashboard-list" key={key}>
            <div className="dashboard-list-header-controls">
              <div className="dashboard-list-header-controls-info">
                {/* Display imgURL for Status grouping */}
                {grouping === "Status" && headerInfo.imgURL && (
                  <img
                    src={headerInfo.imgURL}
                    alt={headerInfo.name}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginLeft: "10px",
                    }}
                  />
                )}
                {/* Display MdAccountCircle for User grouping */}
                {grouping === "User" && (
                  <MdAccountCircle
                    style={{
                      height: "20px",
                      width: "20px",
                      marginLeft: "10px",
                    }}
                  />
                )}
                <b>
                  <p className="dashboard-list-header">
                    {grouping === "User"
                      ? headerInfo.name
                      : headerInfo.label || headerInfo.name}
                  </p>
                </b>
                <div className="dashboard-list-items-count">
                  {ticketList.length}
                </div>
              </div>
              {ticketList.length !== 0 && (
                <div>
                  <img
                    src={Add}
                    alt="Add Icon"
                    style={{ color: "#808080", height: "26px", width: "26px" }}
                  />
                  <img
                    src={dotMenu}
                    alt="Dot Menu"
                    style={{ color: "#535353", height: "26px", width: "26px" }}
                  />
                </div>
              )}
            </div>
            <List key={key} ticketList={ticketList} />
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
