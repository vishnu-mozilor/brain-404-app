import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import PendingTickets from "./components/pages/Tickets";
import Navbar from "./components/global/Navbar";
import Sidebar from "./components/global/Sidebar";
import Analytics from "./components/pages/Analytics";
import KnowledgeBase from "./components/pages/KnowledgeBase";
import LogoContainer from "./components/global/LogoContainer";

function App() {
  const userName = "John Doe"; // Example user name
  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here
  };

  return (
    <Router>
      <div>
        <Navbar userName={userName} onLogout={handleLogout} />
        <div className="app-layout">
          <div className="sidebar-container">
            {/* <LogoContainer /> */}
            <Sidebar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tickets" element={<PendingTickets />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
