import Dashboard from "./Components/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import urgerntPriority from "./Assets/SVG-UrgentPrioritycolour.svg";
import noPriority from "./Assets/no-priority.svg";
import highPriority from "./Assets/Img-HighPriority.svg";
import lowPriority from "./Assets/Img-LowPriority.svg";
import mediumPriority from "./Assets/Img-MediumPriority.svg";
import Backlog from "./Assets/Backlog.svg";
import Todo from "./Assets/To-do.svg";
import InProgress from "./Assets/in-progress.svg";
import Done from "./Assets/Done.svg";
import Cancel from "./Assets/Cancelled.svg";

const App = () => {
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "Status"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "Title"
  );

  // initially defined to deal with the case of empty lists
  let statuses = [
    { name: "Backlog", imgURL: Backlog },
    { name: "Todo", imgURL: Todo },
    { name: "In progress", imgURL: InProgress },
    { name: "Done", imgURL: Done },
    { name: "Canceled", imgURL: Cancel },
  ];

  let priorities = {
    4: { label: "Urgent", img: urgerntPriority },
    3: { label: "High", img: highPriority },
    2: { label: "Medium", img: mediumPriority },
    1: { label: "Low", img: lowPriority },
    0: { label: "No priority", img: noPriority },
  };

  let priorityScores = [0, 1, 2, 3, 4];

  // sets the values for initial ordering and grouping. checks if already set in local storage to retain user state on reloads.
  useEffect(() => {
    setOrdering(localStorage.getItem("ordering") || "Title");
    localStorage.setItem(
      "ordering",
      localStorage.getItem("ordering") || "Title"
    );
    setGrouping(localStorage.getItem("grouping") || "Status");
    localStorage.setItem(
      "grouping",
      localStorage.getItem("grouping") || "Status"
    );
  }, []);

  // navbar for the control of view, dashboard displays the data in accordance for selected grouping and ordering
  return (
    <div className="App">
      <Navbar setGrouping={setGrouping} setOrdering={setOrdering} />
      <Dashboard
        statuses={statuses}
        priorities={priorities}
        priorityScores={priorityScores}
        grouping={grouping}
        ordering={ordering}
      />
    </div>
  );
};

export default App;
