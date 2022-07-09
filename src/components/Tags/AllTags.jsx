import { useNavigate } from "react-router-dom";

const AllTags = ({ allTags, changeTag }) => {
    let navigate = useNavigate();
    const handleClick = (tag) => {
        changeTag(tag)
                    navigate(`/tags?tag=${tag}`)
    }

    const DisplayAllTags = () => {
       
        const arr = []
        for (let tag in allTags) {
            const size = allTags[tag];
            arr.push(
                <div key={tag} className="indivAllTags" style={{fontSize: `${size}em`}} onClick={() => handleClick(tag)}>
                    {tag}
                </div>
            )
        }
        return arr
    }

    return (
        <div className="allTags">
            <DisplayAllTags />
        </div>
    )
}

export default AllTags