import { useParams } from "react-router-dom";

function Game() {
  let { roomId } = useParams();
  return <>Room id: {roomId}</>;
}

export default Game;
