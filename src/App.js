import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Test from "./pages/test";
import HasilTest from "./pages/hasiltest";
import NotFound from "./pages/notfound";
import Report from "./pages/Report";
import Window from "./pages/window";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/window" element={<Window />} />
          <Route path="/test" element={<Test />} />
          <Route path="/hasiltest" element={<HasilTest />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
