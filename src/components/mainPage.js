import { useState } from "react";
import PostView from "./PostView";
import ScrollDisplay from "./scrollDisplay";

export default function MainPage({ data }) {

  return (
    <div>
      <h2>
        I am the main content. You can scroll through me. This is a logic class
      </h2>
      <ScrollDisplay Posts={data} />
    </div>
  );
}
