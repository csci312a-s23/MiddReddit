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

EventDetailsView.propTypes = {
  event: EventShape,
};
