/* 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
// import PostView from "../components/PostView";
import ScrollDisplay from "../components/scrollDisplay";
import EventView from "../components/EventView";
import events from "../../data/seedEvent.json";
//import { Events } from "pg";
//import data from "../../data/seedPost.json";
// import LoginWidget from "../components/LoginWidget.js";
import PropTypes from "prop-types";
import PostShape from "../components/PostShape";

export default function MainPage({
  goToPost,
  setCurrentPost,
  currentPost,
  searchQuery,
}) {
  //what props and callbacks should we use?
  return (
    <div>
      {searchQuery && (
        <ScrollDisplay
          Posts={searchQuery}
          goToPost={goToPost}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
        />
      )}

        <EventView
          events={events}
        />
    </div>
    
  );
}

MainPage.propTypes = {
  goToPost: PropTypes.func,
  setCurrentPost: PropTypes.func,
  currentPost: PostShape,
  searchQuery: PropTypes.array,
};
