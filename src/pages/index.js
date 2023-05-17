/* 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
// import PostView from "../components/PostView";
import ScrollDisplay from "../components/scrollDisplay";
//import { Events } from "pg";
//import data from "../../data/seedPost.json";
// import LoginWidget from "../components/LoginWidget.js";
import PropTypes from "prop-types";
import PostShape from "../components/PostShape";
import AddButton from "@/components/AddButton";

export default function MainPage({
  goToPost,
  setCurrentPost,
  currentPost,
  searchQuery,
  searchBarQuery,
  handleClickMenubar,
  setOpenLeftSideBar,
  setLatestUpvote,
  setOpenRightSideBar,
}) {
  //what props and callbacks should we use?
  return (
    <div>
      {searchQuery && (
        <ScrollDisplay
          Posts={searchQuery}
          setLatestUpvote={setLatestUpvote}
          goToPost={goToPost}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          searchBarQuery={searchBarQuery}
        />
      )}

      <AddButton
        handleClick={handleClickMenubar}
        setOpenLeftSideBar={setOpenLeftSideBar}
        setOpenRightSideBar={setOpenRightSideBar}
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
