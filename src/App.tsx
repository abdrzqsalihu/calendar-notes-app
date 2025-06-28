import "./App.css";
import Calendar from "./components/Calendar";
import { NoteProvider } from "./context/NoteContext";

function App() {
  return (
    <>
      <h1 className="app-title">Calendar</h1>
      <NoteProvider>
        <Calendar />
      </NoteProvider>
    </>
  );
}

export default App;
