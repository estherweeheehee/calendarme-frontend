import { useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"

const CreateNote = ({addNote}) => {
    const { month } = useParams();
    const [note, setNote] = useState({
        title: "",
        tag: "",
        post: "",
        month: "",
        date: ""
    })

    const handleChange = (event, field) => {
        if (field === "date") {
            setNote({
                ...note,
                [field]: event.target.value,
                ["month"]: moment(event.target.value).format('MM')
            })
        }
        else {
            setNote({
                ...note,
                [field]: event.target.value
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://calendarme-backend.herokuapp.com/api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
             
            },
            body: JSON.stringify(note),
          })
            .then((response) => response.json())
            .then((data) => {
                
                addNote(note["month"], note)
                setNote({
                    title: "",
                    tag: "",
                    post: "",
                    month: "",
                    date: ""
                })
              }
            );
        

    }

    return (
        <>
            <form className="createNoteContainer" onSubmit={handleSubmit}>
                
                    <div className="createNote">
                    <div className="createNoteLeft">
                    {/* <p>Month: {month.toUpperCase()}</p> */}
                    <div className="inputContainer">
                    <label htmlFor="date">Date</label>
                    <br/>
                    <input 
                        
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={note.date}
                        onChange={() => handleChange(event, "date")}
                    />
                    </div>
                    
                    <div className="inputContainer">
                    <label htmlFor="title">Title</label>
                    <br/>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={note.title}
                        onChange={() => handleChange(event, "title")}
                    />
                    </div>
                    <label htmlFor="tag">Tag</label>
                    <br/>
                    <input 
                        type="text"
                        id="tag"
                        name="tag"
                        required
                        value={note.tag}
                        onChange={() => handleChange(event, "tag")}
                    />
                    <br />
                    
                    
                </div>
                <div className="createNoteRight">
                    
                    <label htmlFor="post">Post</label>
                    <br/>
                    <div>
                    <textarea
                        className="createNotePost"
                        type="text"
                        id="post"
                        name="post"
                        rows="5"
                        required
                        value={note.post}
                        onChange={() => handleChange(event, "post")}
                    />
                    </div>
                    <br/>
                    <br/>
                    <div className="createButtonContainer">
                    <button className="createButton">CREATE</button>
                    </div>
                    <br />
                    
                    
                    
                    </div>
                    
                    </div>
                    
                
            </form>
        </>
    )
}

export default CreateNote