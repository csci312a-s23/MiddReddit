/*
  SideBar.js

  Displays side bar options such as:
  Home: takes user back to main index page
  Profile: takes user to their profile
  etc: (WIP)
*/
import EventView from "../EventView";
import events from "../../../data/seedEvent.json";

export default function RightSidebar({}) {
  return (
    <div>
      <EventView events = {events}></EventView>
    </div>
  );
}
