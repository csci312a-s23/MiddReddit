/* 
    Our main page with its corresponding components.
*/

//commented out to solve commit errors
// import { useState } from "react";
// import PostView from "../components/PostView";
import ScrollDisplay from "../components/scrollDisplay";
import data from "../../data/seed.json";

export default function MainPage({}) {
  //what props and callbacks should we use?

  return (
    <div>
      <h2>
        I am the main content. You can scroll through me. This is a logic class
      </h2>
      <ScrollDisplay Posts={data} />
    </div>
  );
}
