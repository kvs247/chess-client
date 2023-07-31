import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "enzyme";
import toJson from "enzyme-to-json";
import Home from "./Home";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

test("Snaphot without data", () => {
  const initialState = {
    testApi: {
      queries: {
        "getTest(null)": {
          status: "fulfilled",
          endpointName: "getTest",
          requestId: "absdgvas7dv8gsa",
          originalArgs: null,
          startedTimestamp: 0,
          data: { response: [] },
          fulfilledTimestamp: 1,
        }, 
      },
    }, 
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const view = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(toJson(view)).toMatchSnapshot();
});

test("Snaphot with data", () => {
  const initialState = {
    testApi: {
      queries: {
        "getTest(null)": {
          status: "fulfilled",
          endpointName: "getTest",
          requestId: "absdgvas7dv8gsa",
          originalArgs: null,
          startedTimestamp: 0,
          data: {
            response: [{ ID: "0", Name: "Tester" }],
          },
          fulfilledTimestamp: 1,
        }, 
      },
    }, 
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const view = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(toJson(view)).toMatchSnapshot();
});