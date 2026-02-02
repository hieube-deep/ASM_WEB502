import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import AuthPage from "./pages/AuthPage";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ProtectRoute from "./componets/ProtectRoute";
function App() {

  return (
    <>
      <div>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow">
          <div className="container">
            <Link to="/list" className="navbar-brand fw-semibold">
              <strong>WEB502 App</strong>
            </Link>

            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-light">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-light">
                Đăng ký
              </Link>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div className="container mt-5 text-center">
          <h1 className="display-4 fw-bold mb-4">
            Chào mừng đến với WEB502
          </h1>
          <Routes>

            <Route path="/" element={<List />} />

            <Route element={<ProtectRoute></ProtectRoute>}>
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/add" element={<Add />} />
            </Route>

            <Route path='/register' element={<AuthPage isLogin={false} />} />
            <Route path="/login" element={<AuthPage isLogin={true} />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
