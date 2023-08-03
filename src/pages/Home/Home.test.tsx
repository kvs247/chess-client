import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "./Home";

afterEach(cleanup);

it("renders", () => {
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

  const { asFragment } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();  
});
