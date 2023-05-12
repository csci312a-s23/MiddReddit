//import PostView from "./PostView";
//import styles from "../styles/ScrollPosts.module.css";
import { styled } from "@mui/material/styles";
import EventShape from "./EventShape";

//import { Button } from "@mui/material";
import { useState } from "react";
//import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import EventDetailsView from "./EventDetailsView";
/* eslint-disable quotes */

//https://stackoverflow.com/questions/75354703/show-specific-item-when-button-clicked-from-list-of-items-in-react

const NoBulletList = styled("ul")(() => ({
  listStyle: "square",
  paddingLeft: 10,
}));

export default function EventView({ events }) {
  // eslint-disable-next-line no-unused-vars
  const sortedEvents = [...events].sort((a, b) =>
    a.posted.localeCompare(b.posted)
  );

  const event_list = sortedEvents.map((event) => <EventDetailsView event={event} />);

  return (
    <>
      <Box>
        <h1>Upcoming Events: </h1>
        <NoBulletList>{event_list}</NoBulletList>
      </Box>
    </>

  );
}

EventView.propTypes = {
  event: EventShape,
};
