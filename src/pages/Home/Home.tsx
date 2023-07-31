import { FC } from "react";
import { useGetTestQuery } from "../../store/test/api";
import { TestData } from "../../store/test/types";
import ChessBoard from "../../components/ChessBoard/ChessBoard";

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const Home: FC = () => {
  const { data, isError, isLoading } = useGetTestQuery(null);

  let response: TestData[] | undefined;  
  if (!isError && !isLoading && data !== undefined) {
    response = data.response
  }  

  return (
    <div style={{ backgroundColor: "grey" }}>
      <h1>Welcome to Chess Is Hard by Kyle</h1>
      <ChessBoard 
        fen={startingFEN}
      />
    </div>
  );
};

export default Home;