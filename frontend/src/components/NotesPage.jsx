import React, { useEffect, useState } from "react";
import { deleteNotes, getNotes } from "../api/notes.js";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes(setNotes);
  }, []);

  const handleDelete = (id) => {
    deleteNotes(id, notes, setNotes);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Notes Page</h1>
      </nav>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No notes available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{note.content}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
