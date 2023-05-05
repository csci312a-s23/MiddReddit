import * as dayjs from "dayjs";
export default function Comment({ comment }) {
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  return (
    <>
      <p>
        {comment.author.name} &emsp; <em>{dayjs(comment.posted).fromNow()}</em>{" "}
      </p>
      <p> </p>
      <p>{comment.contents}</p>
    </>
  );
}
