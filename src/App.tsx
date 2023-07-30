import { useGetTestQuery } from "./store/test/api";
import { TestData } from "./store/test/types";

function App(): JSX.Element {
  const { data, isError, isLoading } = useGetTestQuery(null);

  let response: TestData[] | undefined;  
  if (!isError && !isLoading && data !== undefined) {
    response = data.response
  }

  return (
    <div>
      <h1>Chess 2 Babay</h1>
      <p>
        {JSON.stringify(response)}
      </p>
    </div>
  );
}

export default App;
