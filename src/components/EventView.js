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

  // const eventdetails = sortedEvents.map((event) => (
  //   <li
  //     data-testid="details"
  //     onClick={() => HandlerFunc(event, showMore)}
  //     key={event.id}
  //   >
  //     {event.details}
  //   </li>
  // ));

  const event_list = sortedEvents.map((event) => <EventDetailsView event={event} />);
  //   (
  //     event //Need to be rendering the title and render the conditional in the same loop that is generating the titles.
  //   ) => (
  //     <li data-testid="title">
  //       {`${event.title} (${event.date.toString()})`}
  //     </li>
  //   )
  // );


  //console.log(showMore)

  // const FinalReturnArray = [];

  // const PrintEvents = (eventtitles) => {

  //   // // for (let i = 0; i < eventTitles.length; i++) {
  //   // //   if (currentEvent) {
  //   // //     const eventNum = events.indexOf(currentEvent);

  //   // //     if (i === eventNum) {
  //   // //       FinalReturnArray[i] = [
  //   // //         <h5 key={eventtitles[i]}>{eventtitles[i]}</h5>,
  //   // //         showMore ? eventdetails[i] : null,
  //   // //       ];
  //   // //     } else {
  //   // //       FinalReturnArray[i] = [
  //   // //         <h5 key={eventtitles[i]}>{eventtitles[i]}</h5>,
  //   // //       ];
  //   // //     }
  //   // //   } else {
  //   // //     FinalReturnArray[i] = [
  //   // //       <h5 key={eventtitles[i]}>{eventtitles[i]}</h5>,
  //   // //       showmore ? eventdetails[i] : null,
  //   // //     ];
  //   // //   }
  //   // // }

  //   for (let i = 0; i < eventtitles.length; i++)
  //   {
  //     FinalReturnArray[i] = [<h5 key={eventtitles[i]}>{eventtitles[i]}</h5>, <EventDetailsView event={events[i]}/>];
  //   }

  //   //return <EventDetailsView  eventtitles={ eventtitles } showMore={ showMore }/>;
  //   return FinalReturnArray
  // };

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
