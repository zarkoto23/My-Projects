export default function CommentsAdd({ onCreate, pending }) {
  return (
    // {/* <!-- Bonus --> */}
    //   {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" action={onCreate}>
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input
          className="btn submit"
          type="submit"
          value="Add Comment"
          disabled={pending}
        />
      </form>
    </article>
  );
}
