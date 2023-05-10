/*
  SideBar.js

  Displays side bar options such as:
  Home: takes user back to main index page
  Profile: takes user to their profile
  etc: (WIP)
*/
import EventView from "../EventView";
import TopPosts from "../TopPosts";
import events from "../../../data/seedEvent.json";
import { Stack } from "@mui/material";

export default function RightSidebar({}) {
  return (
    <Stack spacing={2}>
      <TopPosts />
      <EventView events={events} />
    </Stack>
  );
}
