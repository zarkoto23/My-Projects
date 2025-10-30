import { Navigate, useNavigate, useParams } from "react-router";
import { useEditGame, useGame } from "../../api/gamesApi";
import useAuth from "../../hooks/useAuth";

export default function GameEdit() {
  const { userId } = useAuth();
  const nav = useNavigate();
  const { gameId } = useParams();
  const { game } = useGame(gameId);
  const { edit } = useEditGame();

  const formAction = async (formData) => {
    const gameData = Object.fromEntries(formData);
    await edit(gameId, gameData);
    nav(`/games/${gameId}/details`);
  };

  if (!game || !game._ownerId) {
    return <p>Loading....</p>;
  }

  const isOwner = userId === game._ownerId;

  if (!isOwner) {
    return <Navigate to="/games" />;
  }

  return (
    <section id="edit-page" className="auth">
      <form action={formAction} id="edit">
        <div className="container">
          <h1>Edit Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={game.title}
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={game.category}
          />

          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            defaultValue={game.maxLevel}
          />

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            defaultValue={game.imageUrl}
          />

          <label htmlFor="summary">Summary:</label>
          <textarea
            name="summary"
            id="summary"
            defaultValue={game.summary}
          ></textarea>
          <input className="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  );
}
