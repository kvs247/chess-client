import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App(): JSX.Element {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Home />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
