const NoteEntry = ({ note, openModal}) => {
    return (
        <>
            <p className="tag" onClick={() => openModal(note)}>{note.title}</p>
        </>
    )
}

export default NoteEntry