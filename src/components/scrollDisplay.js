//import ScrollPost from "./scrollPosts";
//have to get this to involve scrollPosts i just wanted to get something off the ground
export default function ScrollDisplay({ Posts }) {
  const postComponents = Posts.map((article) => (
    <li key={article.title}>{article.title}</li>
  ));
  return (
    <div>
      <h3>
        Here is where I will implement the main scroller This is a display
        class.
      </h3>
      <ul>{postComponents}</ul>
    </div>
  );
}
