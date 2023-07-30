import { FC } from "react";
import { useGetTestQuery } from "../../store/test/api";
import { TestData } from "../../store/test/types";

const Home: FC = () => {
  const { data, isError, isLoading } = useGetTestQuery(null);

  let response: TestData[] | undefined;  
  if (!isError && !isLoading && data !== undefined) {
    response = data.response
  }  

  return (
    <div>
      <h1>Welcome to Chess Is Hard by Kyle</h1>
      <p>
        {JSON.stringify(response)}
      </p>
    </div>
  );
};

export default Home;