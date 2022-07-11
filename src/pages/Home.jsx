import { useNavigate } from "react-router-dom"

const Home = () => {
    let navigate = useNavigate();

    return (
        <>  
        <video className="background-video" autoPlay loop muted>
<source src="https://i.imgur.com/8GgUsYt.mp4" type="video/mp4" />
</video>
            <h1 className="title">Stay updated on your schedule, Esther</h1>
            
            <span className="monthButton" onClick={() => navigate("/calendar")}>VIEW BY MONTHS</span>
            <span className="tagButton" onClick={() => navigate("/tags")}>VIEW BY TAGS</span>
            
        </>
    )
}

export default Home