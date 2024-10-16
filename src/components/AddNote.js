import React, { useState, useContext } from 'react';
import NoteCon from '../context/notes/noteContext';

export default function AddNote() {
    const context = useContext(NoteCon);
    // const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault(); // Prevent page refresh
        context.addNote(note.title, note.description, note.tag);
        // Optionally reset the note after adding
        setNote({ title: "", description: "", tag: "" });

    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); // Correct state update
    };

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            name="title" // Added name attribute
                            className="form-control"
                            id="title"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            value={note.title} // Controlled input
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="desc-label">Description</label>
                        <input
                            type="text"
                            name="description" // Added name attribute
                            className="form-control"
                            id="desc"
                            onChange={onChange}
                            value={note.description} // Controlled input
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="tag-label">Tag</label>
                        <input
                            type="text"
                            name="tag" // Added name attribute
                            className="form-control"
                            id="tag"
                            onChange={onChange}
                            value={note.tag} // Controlled input
                        />
                    </div>
                    <button disabled={note.title.length <5 || note.description.length <5 } type="submit" onClick={handleClick} className="btn btn-primary">Save Note</button>
                </form>
            </div>
        </div>
    );
}
