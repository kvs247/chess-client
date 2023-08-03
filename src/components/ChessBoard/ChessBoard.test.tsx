import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ChessBoard from "./ChessBoard";
import startingFEN from "../../startingFEN";

afterEach(cleanup);

it("renders", () => {
  const initialState = {};

  const mockStore = configureStore();
  const store = mockStore(initialState);

  const { asFragment } = render(
    <Provider store={store}>
      <ChessBoard fen={startingFEN} />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});