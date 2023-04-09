/*
    Editor.js
     
    Allows users to edit or create posts
*/
import { useState } from "react";

export default function Editor({ post }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [contents, setContents] = useState(post ? post.contents : "");

  function SaveButton() {
    const currentDate = new Date();

    const currDateString = currentDate.toISOString();

    complete({
      ...article,
      title: title,
      contents: contents,
      edited: currDateString,
    });
  }
  function CancelButton() {
    complete();
  }

  return (
    <div>
      <label>
        Title:{" "}
        <input
          type="text"
          id="titlebox"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Content:
        <br />
        <textarea
          value={contents}
          onChange={(event) => setContents(event.target.value)}
          rows={20}
          cols={60}
        />
      </label>
      <hr />

      <button
        type="sumbit"
        id="savebutton"
        onClick={SaveButton}
        disabled={!title}
      >
        Save
      </button>
      <button onClick={CancelButton}>Cancel</button>
    </div>
  );
}
