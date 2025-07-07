import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { useAuthContext } from "./hooks/useAuthContext.js";
import WorkoutSession from "./pages/WorkoutSession.js";
import Home from "./pages/Home.js";

function App() {
  const { user, authIsReady } = useAuthContext()

  if (!authIsReady) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/workout-sessions" replace />} />
            <Route path="/workout-sessions" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/workout-session" />}/>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/workout-session" />}/>
            <Route path="/workout-sessions/:id" element={user ? <WorkoutSession /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
