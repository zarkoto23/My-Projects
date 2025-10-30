export default function CommentsShow({ comments }) {

  return (
    //  {/* <!-- Bonus ( for Guests and Users ) --> */}
    <div className="details-comments">
      <h2>Comments:</h2>
      <ul>
        {/* <!-- list all comments for current game (If any) --> */}
        {comments.length > 0 ? (
          comments.map((com) => (
            <li
              key={com._id}
              className="comment"
              style={{
                opacity: com.pending ? 0.6 : 1,
              }}
            >
              <p>
                {com.email}: {com.comment}
              </p>
            </li>
          ))
        ) : (
          <p className="no-comment">No comments.</p>
        )}
      </ul>
      {/* <!-- Display paragraph: If there are no games in the database --> */}
    </div>
  );
}

