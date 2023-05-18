/*
  SideBar.js
  Displays side bar options such as:
  Home: takes user back to main index page
  Profile: takes user to their profile
   etc: (WIP)
 */
import EventView from "../EventView";
import TopPostDisplay from "../TopPostDisplay";
import events from "../../../data/seedEvent.json";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";

export default function RightSidebar({ goToPost, latestUpvote }) {
  return (
    <Stack spacing={2}>
      <TopPostDisplay goToPost={goToPost} latestUpvote={latestUpvote} />
      <EventView events={events} />
    </Stack>
  );
}

RightSidebar.propTypes = {
  goToPost: PropTypes.func.isRequired,
};
