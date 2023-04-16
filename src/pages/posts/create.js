import Editor from "../../components/Editor";
import { useRouter } from "next/router";

export default function PostCreator({ setCurrentPost }) {
  const router = useRouter();
  const complete = async (post) => {
    if (post) {
      const response = await fetch("/api/articles", {
        method: "POST",
        body: JSON.stringify(post),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
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
      <Editor setCurrentPost={setCurrentPost} complete={complete} />
    </>
  );
}
/*
PostCreator.propTypes = {
  setCurrentArticle: PropTypes.func.isRequired,
}; */
