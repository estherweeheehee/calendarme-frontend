import moment from "moment"
import { useState } from "react"

const ShowNotes = ({date, title, post, tag, index, i, wholeNote, removeNote, updateNote}) => {
    const [toggleEdit, setToggleEdit] = useState(false)
    const [editedNote, setEditedNote] = useState(
        wholeNote
    )

    const handleDelete = () => {
        fetch(`https://calendarme-backend.herokuapp.com/${index}`, {
            method: "DELETE"
            })
        .then((response) => response.json())
        .then((data) => {
            removeNote(i)
        })
   }

   const handleEdit = () => {
        if (toggleEdit === false) {
            setToggleEdit(true)
        } else {
            setToggleEdit(false)
        }
   }

   const handleChange = (event, field) => {
        setEditedNote({
            ...editedNote,
            [field]: event.target.value
        })
   }

   const handleSubmitEdit = () => {
        
        fetch(`https://calendarme-backend.herokuapp.com/api/${index}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
               
              },
              body: JSON.stringify(editedNote),
            })
        .then((response) => response.json())
        .then((data) => {
            updateNote(i, editedNote)
        })
        
        setToggleEdit(false)
        
   }

   const handleTagClick = () => {
    
   }



    return (
        <>
            <div className="displayNote">
            
            <h3>{moment(date).format('DD MMMM YYYY')}</h3>
            <h3>{title}</h3>
            
            {toggleEdit === true ? <>
            
                <label htmlFor="post">Post</label>
                <textarea 
                    className="editBox"
                    type="text"
                    id="post"
                    rows="5"
                    name="post"
                    value={editedNote.post}
                    onChange={() => handleChange(event, "post")}
                />
                <br/>
                <label htmlFor="tag">Tag</label>
                <input 
                    className="editBox"
                    type="text"
                    id="tag"
                    name="tag"
                    value={editedNote.tag}
                    onChange={() => handleChange(event, "tag")}
                />
                <p className="editButton" onClick={handleSubmitEdit}>SUBMIT EDIT</p>
            
            <p className="editButton" onClick={handleEdit}>CANCEL EDIT</p>
            </> :
            <>
            <p>{post}</p>
            <p>tag: <span className="tag" onClick={handleTagClick}>{tag}</span></p>
            <p className="editButton" onClick={handleEdit}>EDIT</p>
            </>
            }
            
            <p className="deleteButton" onClick={handleDelete}>DELETE</p>
            </div>
        </>
    )
}

export default ShowNotes