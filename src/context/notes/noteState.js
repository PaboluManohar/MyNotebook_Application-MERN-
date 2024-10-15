

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2JiNzkzNDg3Y2UyNDdiMjA4N2Q0In0sImlhdCI6MTcyODg4NzY5N30.Pzwv-8qeIDNODKKe226UHL4jyE_Rzi6Zx4kzzDt11dM"
            }
        });

        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Add a Note
    // const addNote = async (title, description, tag) => {
    //     // TODO: API Call
    //     // API Call 
    //     const response = await fetch(`${host}/api/notes/addnote`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2JiNzkzNDg3Y2UyNDdiMjA4N2Q0In0sImlhdCI6MTcyODg4NzY5N30.Pzwv-8qeIDNODKKe226UHL4jyE_Rzi6Zx4kzzDt11dM"
    //         },
    //         body: JSON.stringify({ title, description, tag })
    //     });

    //     const json = await response.json();


    //     console.log("Adding a new note with id : "+ json._id)
    //     const note = {
    //         "_id": json._id,
    //         "user": json.user,
    //         "title": title,
    //         "description": description,
    //         "tag": tag,
    //         "date": json.date,
    //         "__v": 0
    //     };
    //     setNotes(notes.concat(note))
    // }
    // const addNote = async (title, description, tag) => {
    //     try {
    //         // Log the request body to check the data being sent
    //         console.log("Request Body:", { title, description, tag });
    
    //         const response = await fetch(`${host}/api/notes/addnote`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2JiNzkzNDg3Y2UyNDdiMjA4N2Q0In0sImlhdCI6MTcyODg4NzY5N30.Pzwv-8qeIDNODKKe226UHL4jyE_Rzi6Zx4kzzDt11dM"
    //             },
    //             body: JSON.stringify({ title, description, tag }) // Ensure correct body format
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to add note: ' + response.status);
    //         }
    
    //         const json = await response.json();
    //         console.log("Adding a new note with id:", json._id);
            
    //         const note = {
    //             "_id": json._id,
    //             "user": json.user,
    //             "title": title,
    //             "description": description,
    //             "tag": tag,
    //             "date": json.date,
    //             "__v": 0
    //         };
    
    //         setNotes((prevNotes) => [...prevNotes, note]);
    
    //     } catch (error) {
    //         console.error("Error adding note:", error);
    //     }
    // };
    const addNote = async (title, description, tag) => {
        try {
            // Log the request body to check the data being sent
            console.log("Request Body:", { title, description, tag });
    
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2JiNzkzNDg3Y2UyNDdiMjA4N2Q0In0sImlhdCI6MTcyODg4NzY5N30.Pzwv-8qeIDNODKKe226UHL4jyE_Rzi6Zx4kzzDt11dM" // ensure the token is valid
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
        }
    };
    
    

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2JiNzkzNDg3Y2UyNDdiMjA4N2Q0In0sImlhdCI6MTcyODg4NzY5N30.Pzwv-8qeIDNODKKe226UHL4jyE_Rzi6Zx4kzzDt11dM"
            },
        });
        const json = response.json();
        console.log(json)

        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwY2JiNzkzNDg3Y2UyNDdiMjA4N2Q0In0sImlhdCI6MTcyODg4NzY5N30.Pzwv-8qeIDNODKKe226UHL4jyE_Rzi6Zx4kzzDt11dM"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;