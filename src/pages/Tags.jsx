import { useEffect, useState } from "react"
import IndivTags from "../components/Tags/IndivTags"



const Tags = () => {
    let params = (new URL(document.location)).searchParams
    let tagTerm = params.get("tag")
    const [nil, setNil] = useState(false)
    const [tagsData, setTagsData] = useState([])

    useEffect(() => {
        fetch(`http://calendarme-backend.herokuapp.com/searchtags/${tagTerm}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data.data) {
                setNil(true)
                return;
            } else {
                setTagsData(data.data)
                setNil(false)
                
            }
        })
    }, [])

    const DisplayTags = () => {
        if (nil === true) {
            return null;
        }
        else {
            return tagsData.map((note, index) => 
                <IndivTags 
                key={index}
                note={note}
                />
            )
        }
    }
    
    return (
        <>
        <h1> Tag</h1>
        <h3>{tagTerm}</h3>
        <DisplayTags />
        </>
    )
}

export default Tags