import NoteEntry from "./NoteEntry"


const Dates = ({i, day, notes, nil, openModal}) => {
    
    const MakeNoteEntry= () => {
        const arr = []
        if (notes.length === 0 || nil) {
            return null
        } else {
            for (let i = 0; i < notes.length; i++) {
                arr.push(<NoteEntry
                    note={notes[i]}
                    key={i}
                    i={i}
                    openModal={openModal}
                />)
            }
            return arr
        }

    }

    
   
    // console.log(notes)
    return (
        <>
            <div className="displayDate">
                <h4 className="datesHeader">{day}</h4>
                <MakeNoteEntry />
            </div>
        </>
    )
}

export default Dates