import ScrollPost from "./scrollPosts";
//have to get this to involve scrollPosts i just wanted to get something off the ground
export default function ScrollDisplay({ Posts }) {
  const postComponents = Posts.map((post) => (
    <ScrollPost post={post} key={post.id} />
  ));
  return (
    <div>
      <h3>
        Here is where I will implement the main scroller.
        <br />
        This is a display class.
      </h3>
      <ul>{postComponents}</ul>
    </div>
  );
}
