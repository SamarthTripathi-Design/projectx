import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Inbox from "./components/Inbox";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Inbox />} />
      </Routes>
    </>
  );
}

export default App;
