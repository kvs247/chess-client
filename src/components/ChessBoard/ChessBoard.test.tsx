import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ChessBoard from "./ChessBoard";
import startingFEN from "../../startingFEN";

afterEach(cleanup);

it("renders", () => {
  const initialState = {
    gamesApi: {
      queries: {
        'getGameById("0")': {
          status: 'fulfilled',
          endpointName: 'getGameById',
          requestId: 'YMaAzrN4ATBEzvni485zO',
          originalArgs: '0',
          startedTimeStamp: 1691880256957,
          data: {
            game: {
              gameId: '0',
              fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
            }
          },
          fulfilledTimeStamp: 1691880257261
        }
      },
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const { asFragment } = render(
    <Provider store={store}>
      <ChessBoard fen={startingFEN} />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});