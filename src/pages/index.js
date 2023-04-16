/* 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
// import PostView from "../components/PostView";
import ScrollDisplay from "../components/scrollDisplay";
//import data from "../../data/seedPost.json";

export default function MainPage({
  goToPost,
  setCurrentPost,
  currentPost,
  searchQuery,
}) {
  //what props and callbacks should we use?
  return (
    <div>
      <h2>
        I am the main content. You can scroll through me. This is a logic class
      </h2>
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
