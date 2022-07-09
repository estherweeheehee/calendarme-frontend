const AllTags = ({ allTags }) => {

    const DisplayAllTags = () => {
        const arr = []
        for (let tag in allTags) {
            const size = allTags[tag];
            arr.push(
                <div key={tag} className="indivAllTags" style={{fontSize: `${size}em`}}>
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