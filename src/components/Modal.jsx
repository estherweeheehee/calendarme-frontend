import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ closeModal, modalNote, deleteNote, editNote }) => {
  let navigate = useNavigate();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editedNote, setEditedNote] = useState(modalNote);

  const handleDelete = () => {
    deleteNote(modalNote.id);
    fetch(`https://calendarme-backend.herokuapp.com/api/${modalNote.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        closeModal();
      });
  };

  const handleChange = (event, field) => {
    setEditedNote({
      ...editedNote,
      [field]: event.target.value,
    });
  };

  const handleEdit = () => {
    if (toggleEdit === false) {
      setToggleEdit(true);
    } else {
      setToggleEdit(false);
    }
  };

  const handleSubmitEdit = () => {
    fetch(`https://calendarme-backend.herokuapp.com/${modalNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedNote),
    })
      .then((response) => response.json())
      .then((data) => {
        // updateNote(i, editedNote)
        editNote(modalNote.id, editedNote);
      });

    setToggleEdit(false);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <header className="modal__header">
          <h2>{modalNote.title}</h2>
          <button onClick={closeModal} className="close-button">
            &times;
          </button>
        </header>
        
        <main className="modal__main">
          <p>{moment(modalNote.date).format("DD MMMM YYYY").toUpperCase()}</p>
          <br/>
          {toggleEdit ? (
            <>
              <label htmlFor="post">EDIT POST</label>
              <br />
              <textarea
                className="editBox"
                type="text"
                id="post"
                rows="5"
                name="post"
                value={editedNote.post}
                onChange={() => handleChange(event, "post")}
              />
              <br />
              <label htmlFor="tag">EDIT TAG</label>
              <br/>
              <input
                className="editBox"
                type="text"
                id="tag"
                name="tag"
                value={editedNote.tag}
                onChange={() => handleChange(event, "tag")}
              />
              <p className="editButton" onClick={handleSubmitEdit}>
                SUBMIT EDIT
              </p>

              <p className="editButton" onClick={handleEdit}>
                CANCEL EDIT
              </p>
            </>
          ) : (
            <>
              <p>{editedNote.post}</p>
              <br/>
              <p>
                tag: <span className="tag" onClick={() => navigate(`/tags?tag=${editedNote.tag}`)}>{editedNote.tag}</span>
              </p>
              <div className="modalOptions">
              <p className="editButton" onClick={handleEdit}>
                EDIT
              </p>
              <p className="deleteButton" onClick={handleDelete}>
                DELETE
              </p>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Modal;
