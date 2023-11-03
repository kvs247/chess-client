import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element = {<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
