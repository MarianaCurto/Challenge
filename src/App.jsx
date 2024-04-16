import "./App.css";
import React, { useState } from "react";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [showJson, setShowJson] = useState(false);

  return (
    <div>
      <h1>CHALLENGE</h1>
      <UserDashboard showJson={showJson} setShowJson={setShowJson} />
    </div>
  );
}

export default App;
