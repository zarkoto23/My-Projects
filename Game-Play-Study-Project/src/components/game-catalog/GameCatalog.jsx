
import GameCatalogItem from "./game-catalog-item/GameCatalogItem";
import { useGames } from "../../api/gamesApi";

export default function GameCatalog() {
const {games}=useGames()



  return (
    <section id="catalog-page">
      <h1>All Games</h1>
      {/* <!-- Display div: with information about every game (if any) --> */}

      {games.length > 0 ? (
        games.map((game) => <GameCatalogItem key={game._id} {...game} />)
      ) : (
        <h3 className="no-articles">No articles yet</h3>
      )}

      {/* <!-- Display paragraph: If there is no games  --> */}
    </section>
  );
}
