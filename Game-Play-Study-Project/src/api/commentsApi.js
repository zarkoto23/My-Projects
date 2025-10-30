import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
const baseUrl = "http://localhost:3030/data/comments";  

function commentReducer(state, action) {
  switch (action.type) {
    case "GET_ALL":
      return action.payload;

    case "ADD_COMMENT":
      return [...state.filter((c) => !c.pending), action.payload];

    default:
      return state;
  }
}

export const useComments = (gameId) => {
  const { request } = useAuth();
  // const [comments, setComments] = useState([]);

  const [comments, dispatch] = useReducer(commentReducer, []);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      where: `gameId="${gameId}"`,
      load: `author=_ownerId:users`,
    });

    request
      .get(`${baseUrl}?${searchParams.toString()}`)
      .then((result) => dispatch({ type: "GET_ALL", payload: result }));
  }, [gameId,request]);

  return {
    comments,
    dispatch: (commentData) =>
      dispatch({ type: "ADD_COMMENT", payload: commentData }),
  };
};

export const useCreate = () => {
  const { request, email } = useAuth();

  const create = async (gameId, comment) => {
    const newComment = await request.post(`${baseUrl}`, {
      email,
      gameId,
      comment,
    });

    return newComment;
  };

  return {
    create,
  };
};
