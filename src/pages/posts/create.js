import Editor from "../../components/Editor";
import { useRouter } from "next/router";

export default function PostCreator({
  setCurrentPost,
  setOpenRightSideBar,
  setCreatePost,
}) {
  const router = useRouter();
  const complete = async (post) => {
    if (post) {
      const params = {
        method: "POST",
        body: JSON.stringify(post),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      };

      const response = await fetch("/api/generalPosts", params);
      if (response.ok) {
        console.log(response.json());
        setCurrentPost(await response.json());
      }
    } else {
      router.back();
    }
  };

  //   const handleComplete = (newPost) => {
  //     if (newPost) {
  //       fetch("/api/articles", {
  //         method: "POST",
  //         body: JSON.stringify(newArticle),
  //         headers: new Headers({
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         }),
  //       })
  //         .then((resp) => resp.json())
  //         .then((data) => setCurrentArticle(data))
  //         .catch((err) => console.log(err));
  //     } else {
  //       router.back();
  //     }
  //   };

  return (
    <>
      <Editor
        setCurrentPost={setCurrentPost}
        complete={complete}
        setCreatePost={setCreatePost}
        setOpenRightSideBar={setOpenRightSideBar}
      />
    </>
  );
}
/*
PostCreator.propTypes = {
  setCurrentArticle: PropTypes.func.isRequired,
}; */