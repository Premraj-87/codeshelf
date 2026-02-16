/* eslint-disable react-hooks/set-state-in-effect */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadData, saveData } from "../utils/localStorage";
import notesData from "../data/notes.json";

const Notes = () => {
  const [notes, setNotes] = useState([]);

 
  useEffect(() => {
    const existingNotes = loadData("notes", []);
    if (existingNotes.length === 0) {
      saveData("notes", notesData); 
      setNotes(notesData);
    } else {
      setNotes(existingNotes);
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notes Explorer</h2>
      {notes.length === 0 && <p>No notes found</p>}
      <ul>
        {notes.map(note => (
  <li key={note.id} className="border p-2 my-2 rounded hover:bg-gray-100">
    <Link to={`/notes/${note.id}`}>
      <h3 className="font-bold">{note.title}</h3>
      <p>{note.content.slice(0, 100)}...</p>
    </Link>
  </li>
))}
      </ul>
    </div>
  );
};

export default Notes;
