import NoteContext from "./noteContext";
import { useContext, useState } from "react";
import alertContext from "../alert/alertContext";
const NoteState = (props) => {
    const alertcon = useContext(alertContext);
    const {makeAlert} = alertcon;
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        try {
            // Log the request body to check the data being sent
            console.log("Request Body:", { title, description, tag });

            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token') 
                },
                body: JSON.stringify({ title, description, tag })
            });

            // Check if the request failed
            if (!response.ok) {
                const errorData = await response.json(); // Get error details from server response
                console.error("Error from API:", errorData);
                throw new Error(`Failed to add note: ${response.status}`);
            }

            const json = await response.json();
            console.log("Adding a new note with id:", json._id);

            const note = {
                "_id": json._id,
                "user": json.user,
                "title": title,
                "description": description,
                "tag": tag,
                "date": json.date,
                "__v": 0
            };

            setNotes(notes.concat(note));

        } catch (error) {
            console.error("Error adding note:", error);
            makeAlert("note not added ", "danger");
        }
    };



    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json)

        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        makeAlert("note deleted successfully", "success");
        
        setNotes(newNotes)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(JSON.stringify(json) + "updated!!!!!");

        let newNotes = JSON.parse(JSON.stringify(notes))

        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        makeAlert("note edited successfully", "warning");

        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;