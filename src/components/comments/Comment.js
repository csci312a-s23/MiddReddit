import * as dayjs from "dayjs";
export default function Comment({ comment }) {
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  return (
    <>
      <p>{comment.parent}</p>
      <p> {dayjs(comment.posted).fromNow()}</p>
      <p>{comment.contents}</p>
    </>
  );
}
