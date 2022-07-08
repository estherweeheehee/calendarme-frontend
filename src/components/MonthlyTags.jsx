import { useNavigate } from "react-router-dom"

const MonthlyTags = ({tags}) => {
    const navigate = useNavigate();

    const DisplayTags = () => {

        return tags.map((tag, index) => 
        
                <p className="indivMonthlyTag"
                    key={index}
                    onClick={() => navigate(`/tags?tag=${tag}`)}
                >
                    {tag}
                </p>
            
        )
    }

    return (
        <>
            <div className="monthlyTags">
                <h3>Tags</h3>
                <DisplayTags />
            </div>
        
        </>
    )
}

export default MonthlyTags