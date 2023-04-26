/* 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
// import PostView from "../components/PostView";
import ScrollDisplay from "../components/scrollDisplay";
//import data from "../../data/seedPost.json";
// import LoginWidget from "../components/LoginWidget.js";

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
    </div>
  );
}
