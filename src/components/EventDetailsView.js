import EventShape from "./EventShape";

import { useState } from "react";
import { Box } from "@mui/material";
/* eslint-disable quotes */

//https://stackoverflow.com/questions/75354703/show-specific-item-when-button-clicked-from-list-of-items-in-react

export default function EventDetailsView({ event }) {
  const [showMore, setShowMore] = useState(false);
  const Handler = () => {
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
