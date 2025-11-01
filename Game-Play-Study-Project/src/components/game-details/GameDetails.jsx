import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsAdd from "../comments-add/CommentsAdd";
import { useDeleteGame, useGame } from "../../api/gamesApi";
import useAuth from "../../hooks/useAuth";
import { useComments, useCreate } from "../../api/commentsApi";
import { v4 } from "uuid";

import { useOptimistic } from "react";
import { toast } from "react-toastify";

export default function GameDetails() {
  const { email, _id, isAuth } = useAuth();

  const { gameId } = useParams();
  const nav = useNavigate();
  const { game } = useGame(gameId);
  const { deleteGame } = useDeleteGame();

  const { comments, dispatch } = useComments(gameId);

  const [optimistiComments, setOptimisticComments] = useOptimistic(
    comments,
    (currentComments, newComment) => [
      ...currentComments,
      {
        _id: v4(),
        email,
        comment: newComment,
        pending: true,
      },
    ]
  );

  const { create } = useCreate();
  const onDeleteClickHandler = async () => {
    const hasConfirm = confirm(`Are you sure delete "${game.title}" ?`);
    if (!hasConfirm) {
      return;
    }
    try {
      
      await deleteGame(gameId);
  
      toast.success(`${game} is deleted!`)
      nav("/games");
    } catch (err) {
        toast.error(err.message|| 'Deleted unsuccessfull!')
    }
  };

  const commentCreateHandler = async (formData) => {
    const comment = formData.get("comment");

    if (!isAuth) {
      toast.info("You have to be logged user to comment!");
      nav("/login");

      return;
    }

    if (!comment.trim()) {
      return toast.info("You have to write something!");
    }
    setOptimisticComments(comment);

    const commentResult = await create(gameId, comment);

    dispatch(commentResult);
  };

  const isOwner = game?._ownerId === _id;

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={game.imageUrl} />
          <h1>{game.title}</h1>
          <span className="levels">MaxLevel: {game.maxLevel}</span>
          <p className="type">{game.category}</p>
        </div>

        <p className="text">{game.summary}</p>

        <CommentsShow comments={optimistiComments} />

        {isOwner && isAuth && (
          <div className="buttons">
            <Link to={`/games/${gameId}/edit`} className="button">
              Edit
            </Link>
            <button onClick={onDeleteClickHandler} className="button">
              Delete
            </button>
          </div>
        )}
      </div>

      <CommentsAdd onCreate={commentCreateHandler} />
    </section>
  );
}
