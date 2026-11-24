import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;