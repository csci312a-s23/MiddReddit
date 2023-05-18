//import styles from "../styles/ScrollPosts.module.css";
import EventShape from "./EventShape";

//import { Button } from "@mui/material";
import { useState } from "react";
//import { Typography } from "@mui/material";
import { Box } from "@mui/material";
/* eslint-disable quotes */

//https://stackoverflow.com/questions/75354703/show-specific-item-when-button-clicked-from-list-of-items-in-react

export default function EventDetailsView({ event }) {
  // eslint-disable-next-line no-unused-vars

  const [showMore, setShowMore] = useState(false);
  //const [currentEvent, setCurrentEvent] = useState();
  const Handler = () => {
    //setCurrentEvent(event);

    setShowMore(!showMore);
  };

  return (
    <Box>
      <li key={event.title} data-testid="title" onClick={() => Handler()}>
        <h5>{event.title}</h5>
        {showMore && event.details}
      </li>
    </Box>
  );
}

EventDetailsView.propTypes = {
  event: EventShape,
};
