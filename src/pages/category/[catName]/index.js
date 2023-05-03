/* 

  index.js 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
// import PostView from "../components/PostView";
import ScrollDisplay from "../../../components/scrollDisplay";
//import data from "../../data/seedPost.json";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import PostShape from "../../../components/PostShape";

export default function MainPageCategory({
  goToPost,
  setCurrentPost,
  currentPost,
  searchQuery,
  setCategoryQuery,
  searchBarQuery,
}) {
  const router = useRouter();
  const { catName } = router.query;
  setCategoryQuery(catName);
  //what props and callbacks should we use?
  return (
    <div>
      {searchQuery && (
        <ScrollDisplay
          Posts={searchQuery}
          goToPost={goToPost}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          searchBarQuery={searchBarQuery}
        />
      )}
    </div>
  );
}

MainPageCategory.propTypes = {
  goToPost: PropTypes.func,
  setCurrentPost: PropTypes.func,
  currentPost: PostShape,
  searchQuery: PropTypes.array,
  setCategoryQuery: PropTypes.func,
};
