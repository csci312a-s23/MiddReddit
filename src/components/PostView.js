export default function PostView({ post, allowEdit }) {
    if (allowEdit)
    {
        return (
            <div>
            <button onClick={() => handleClick("add")}>Add</button>
            {allowEdit && <button onClick={() => handleClick("edit")}>Edit</button>}
          </div>
        )
    }
    return (
      <div className={styles.article}>
        <h2>{post.title}</h2>
        <p>{post.contents}</p>
        <p className={styles.timestamp}>
          {new Date(article.edited).toLocaleString()}
        </p>
      </div>
    );
  }