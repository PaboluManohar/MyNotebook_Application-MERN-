import React, { useContext, useRef, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import "../CSS/NoteItem.css";

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const modalRef = useRef(null);
    const popoverRef = useRef(null); // Ref for popover

    const viewNotes = () => {
        const modal = new window.bootstrap.Modal(modalRef.current); // Bootstrap's Modal API
        modal.show(); // Programmatically show the modal
    };

    // Initialize the popover
    useEffect(() => {
        const popover = new window.bootstrap.Popover(popoverRef.current, {
            trigger: 'hover',
            html: true,
        });

        return () => {
            popover.dispose(); // Clean up the popover instance on unmount
        };
    }, []);

    return (
        <>
            {/* Modal Structure */}
            <div
                className="modal fade"
                ref={modalRef}
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{note.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body modelb">
                            <p>{note.description}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Structure */}
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-center" style={{marginLeft:"0px"}}>
                            <div
                                type="button"
                                className="btn "
                                style={{padding:"0px", textAlign:'center', margin:'0px'}}
                                data-bs-toggle="popover"
                                data-bs-title={note.title}
                                data-bs-content={`Tag: ${note.tag}`} // Use template literals for better readability
                                ref={popoverRef} // Attach the ref here
                            >
                                <i className="fas fa-info-circle mx-2"></i>
                            </div>

                            <h5 className="card-title">{note.title}</h5>
                            <i onClick={() => deleteNote(note._id)} className="far fa-trash-alt mx-2"></i>
                            <i className="far fa-edit mx-2" onClick={() => updateNote(note)}></i>
                            <i className="far fa-eye mx-2 my-1" onClick={viewNotes}></i> {/* View icon triggers the modal */}
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Noteitem;
