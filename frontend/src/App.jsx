import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SalesOrder from "./pages/SalesOrder";

function App() {
  // Define the routes for the application using React Router
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<SalesOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
