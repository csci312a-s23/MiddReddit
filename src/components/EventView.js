//import PostView from "./PostView";
//import styles from "../styles/ScrollPosts.module.css";
//import PostShape from "./PostShape";
///import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

//import { Button } from "@mui/material";
//import UpVoteButtons from "./UpVoteButtons";
import EventShape from "./EventShape";
import { useState } from "react";
//import { Typography } from "@mui/material";
import { Box } from "@mui/material";
//import styles from "../styles/Events.module.css";
/* eslint-disable quotes */

//https://stackoverflow.com/questions/75354703/show-specific-item-when-button-clicked-from-list-of-items-in-react

const NoBulletList = styled("ul")(() => ({
  listStyle: "square",
  paddingLeft: 10,
}));

export default function EventView({ events }) {
  // eslint-disable-next-line no-unused-vars
    const [currentEvent, setCurrentEvent] = useState();

    const [showMore, setShowMore] = useState(false);

  const sortedEvents = [...events].sort((a, b) =>
    a.posted.localeCompare(b.posted)
  );
  const HandlerFunc = (event) => {
    setCurrentEvent(event);

    setShowMore(!showMore);

    //return {...showMore ? console.log(currentEvent.details) : console.log("GOODBYE")}
  };

  const eventdetails = sortedEvents.map((event) => (
    <li
      data-testid="details"
      onClick={() => HandlerFunc(event, showMore)}
      key={event.id}
    >
      {event.details}
    </li>
  ));

  const eventtitles = sortedEvents.map(
    (
      event //Need to be rendering the title and render the conditional in the same loop that is generating the titles.
    ) => (
      <li data-testid="title" onClick={() => HandlerFunc(event)} key={event.id}>
        {`${event.title} (${event.date.toString()})`}
      </li>
    )
  );


  const FinalReturnArray = [];

  const PrintEvents = (eventTitles, showmore) => {
    for (let i = 0; i < eventTitles.length; i++) {
      if (currentEvent) {
        const eventNum = events.indexOf(currentEvent);

        if (i === eventNum) {
          FinalReturnArray[i] = [
            <h5 key={eventtitles[i]}>{eventtitles[i]}</h5>,
            showMore ? eventdetails[i] : null,
          ];
        } else {
          FinalReturnArray[i] = [
            <h5 key={eventtitles[i]}>{eventtitles[i]}</h5>,
          ];
        }
      } else {
        FinalReturnArray[i] = [
          <h5 key={eventtitles[i]}>{eventtitles[i]}</h5>,
          showmore ? eventdetails[i] : null,
        ];
      }
    }
    return FinalReturnArray;
  };

  return (
    <>
      <Box>
        <h1>Upcoming Events: </h1>
        <NoBulletList>{PrintEvents(eventtitles, showMore)}</NoBulletList>
      </Box>
    </>

     //{/* <div>
        //<h2>{!currentEvent ? events: currentEvent.title}</h2>
        //<p>{!currentEvent ? events: currentEvent.details}</p>
        //{/* {new Date(!currentEvent ? events: currentEvent.posted).toLocaleString()} */}
    //</div> */}


// import EventShape from "./EventShape";

// export default function Event({ event, showMore }) {

  
//     return (
//     <div>
//       <h2>{event.title}</h2>
//       <p>{event.details}</p>
//       {new Date(event.posted).toLocaleString()}
//     </div>
//   );
// }

// Event.propTypes = {
//   event: EventShape.isRequired,
//   showMore: PropTypes.boolean.isRequired,
// };



    // <NoBulletList>
    //   <div className={styles.post}>
    //     </div>
    //       <left>
    //         <h4>{post.title} </h4>
    //         <em
    //           suppressHydrationWarning /*have to suppress hydration with dates*/
    //         >
    //           {/*eslint-disable-line */}
    //           {post.author} - {new Date(post.posted).toLocaleString()}
    //         </em>

    //         <p>{post.contents} </p>
    //       </left>
    // </NoBulletList>
  );
}

EventView.propTypes = {
  event: EventShape,
};
