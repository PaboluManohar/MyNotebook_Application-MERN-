import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

const Notes = () => {
    const context = useContext(noteContext);
    const alertcon = useContext(alertContext);
    const { notes, getNotes, editNote } = context;
    const { makeAlert } = alertcon;
    let navigate = useNavigate();

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" });

    const handleClick = (e) => {
        // e.preventDefault(); // Prevent page refresh
        console.log("updating note  ,", note)
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); // Correct state update
    };
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()

        }
        else {
            navigate("/login")
            makeAlert("you are not logged in please login or sign up", "danger");
        }
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <button hidden={true} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Notessss
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        name="etitle" // Added name attribute
                                        className="form-control"
                                        id="etitle"
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        value={note.etitle} // Controlled input
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="desc-label">Description</label>
                                    <input
                                        type="text"
                                        name="edescription" // Added name attribute
                                        className="form-control"
                                        id="edesc"
                                        onChange={onChange}
                                        value={note.edescription} // Controlled input
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="tag-label">Tag</label>
                                    <input
                                        type="text"
                                        name="etag" // Added name attribute
                                        className="form-control"
                                        id="etag"
                                        onChange={onChange}
                                        value={note.etag} // Controlled input
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">save</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h2>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
                })}
            </div>

        </>
    );
};

export default Notes;
