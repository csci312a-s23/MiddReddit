import PostView from "../../../components/PostView";
import { useRouter } from "next/router";
import data from "../../../../data/seed.json"; //will be a database thing

export default function Post({}) {
  const router = useRouter();
  const { postID } = router.query;
  console.log(router.query);
  const post = data.filter((filterPost) => filterPost.id === postID)[0];

  console.log(postID);
  const allowEdit = false;
  /*if (currentPost.author === user.name)
    {
        allowEdit = true;
    } */

  return (
    <>
      <PostView allowEdit={allowEdit} post={post} />
    </>
  );
}
