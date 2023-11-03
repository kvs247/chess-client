import { render } from "@testing-library/react";
import Layout from "./Layout";

it("renders", () => {
  const { asFragment } = render(
    <Layout>
      <div>test</div>
    </Layout>
  );
  expect(asFragment()).toMatchSnapshot();
});