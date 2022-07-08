import moment from "moment"

const IndivTags = ({note}) => {
    return (
        <>
            <div className="indivTags">
            <p>{moment(note.date).format('DD MMMM YYYY').toUpperCase()}</p>
                <h3>{note.title}</h3>
                <p className="tagPost">{note.post}</p>

            </div>
        </>
    )
}

export default IndivTags