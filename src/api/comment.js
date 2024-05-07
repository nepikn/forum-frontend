class Comment {
  constructor(commentator, content) {
    Object.assign(this, { commentator, content });
  }
}

export const getComments = async (page, countPerPage) => {
  const query = new URLSearchParams();

  query.append("page", page);
  query.append("commentPerPage", countPerPage);

  return (
    await (
      await fetch(
        `http://localhost:80/my-xampp/forum/api/comments/get.php?${query}`
      )
    ).json()
  ).map((comment) => new Comment(comment.user_name, comment.content));
};
