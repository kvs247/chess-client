import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import ChessBoard from "./ChessBoard";
import startingFEN from "../../startingFEN";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

test("Snapshot", () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const view = render(
    <Provider store={store}>
      <ChessBoard fen={startingFEN} />
    </Provider>
  );
  expect(toJson(view)).toMatchSnapshot();
});