import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/games`

export const useGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    request.get(baseUrl).then(setGames);
  }, []);

  return {
    games,
  };
};

export const useGame = (gameId) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    request.get(`${baseUrl}/${gameId}`).then(setGame);
  }, [gameId]);

  return {
    game,
  };
};

export const useCreate = () => {
  const { request } = useAuth();

  const create = (gamedata) => request.post(baseUrl, gamedata);

  return {
    create,
  };
};

export const useEditGame = () => {
  const { request } = useAuth();
  [
    {
      _ownerId: "35c62d76-8152-4626-8712-eeb96381bea8",
      title: "POP: The Two Thrones",
      category: "FPS",
      maxLevel: "2",
      imageUrl: "https://m.media-amazon.com/images/I/71u2zJ89hdL.jpg",
      summary:
        "Prince of Persia: The Two Thrones is a 2005 action-adventure game developed by Ubisoft Montreal and Ubisoft Casablanca, and published by Ubisoft",
      _createdOn: 1759837789672,
      _id: "02094c34-b48e-48a4-ac65-6411ab20b526",
    },
  ];
  const edit = (gameId, gameData) =>
    request.put(`${baseUrl}/${gameId}`, { ...gameData, _id: gameId });

  return {
    edit,
  };
};

export const useDeleteGame = () => {
  const { request } = useAuth();

  const deleteGame = (gameId) => request.delete(`${baseUrl}/${gameId}`);

  return {
    deleteGame,
  };
};

export const useLatestGames = () => {
  const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      sortBy: "_createdOn desc",
      pageSize: 3,
      select: "_id,imageUrl,title",
    });
    request.get(`${baseUrl}?${searchParams.toString()}`).then((data) => {
      setLatestGames(data);
    });
  }, []);

  return {
    latestGames,
  };
};
