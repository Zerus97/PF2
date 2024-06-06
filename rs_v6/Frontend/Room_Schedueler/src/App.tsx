import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/LoginScreen";
import MainMenu from "./screens/MainMenu";
import { useState } from "react";
import ReserveScreen from "./screens/ReserveScreen";
import MyEventos from "./screens/MyEventos"; // Import MyEventos component

function App() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/main_menu" element={<MainMenu user={user} />} />
        <Route path="/reserving" element={<ReserveScreen user={user} />} />
        <Route path="/my_eventos" element={<MyEventos user={user} />} />{" "}
        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
