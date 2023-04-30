//import PostView from "./PostView";
import styles from "../styles/ScrollPosts.module.css";
import PostShape from "./PostShape";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
//import { Button } from "@mui/material";
import UpVoteButtons from "./UpVoteButtons";
import EventShape from "./EventShape";
import { useState } from "react";
//import { Typography } from "@mui/material";
//import { Box } from "@mui/material";
/* eslint-disable quotes */

//https://stackoverflow.com/questions/75354703/show-specific-item-when-button-clicked-from-list-of-items-in-react

const NoBulletList = styled("ul")(() => ({
  listStyle: "none",
  paddingLeft: 0,
}));

export default function EventView({ events }) {
    const [currentEvent, setCurrentEvent] = useState();

    const [showMore, setShowMore] = useState(false);

    const sortedEvents = [...events].sort((a, b) =>
        a.posted.localeCompare(b.posted)
    );

    const eventdetails = sortedEvents.map((event) => (
        <li
            data-testid="posted"
            key={event.id}
        >
            {event.details}
        </li>
    ))

    const eventtitles = sortedEvents.map((event) => (
        <li
            data-testid="title"
            onClick={() => HandlerFunc(event, showMore)}
            key={event.id}
        >
            {event.title}
        </li>
    ))

    const HandlerFunc = (event, showMore) => {
        let oldevent = event;
        setCurrentEvent(event)

        if (currentEvent === oldevent)
        {
            setShowMore(!showMore)
        }
        //return {...showMore ? console.log(currentEvent.details) : console.log("GOODBYE")}
      };
    //console.log(showMore)

  return (
    <>
        <NoBulletList>
            {eventtitles}
            {showMore ? currentEvent.details : null}
        </NoBulletList>
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
