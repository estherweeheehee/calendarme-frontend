import { Link, Outlet, useNavigate } from "react-router-dom"

const Home = () => {
    let navigate = useNavigate();
    const handleClick = (month) => {
        navigate(`/view?month=${month}`)
    }
    return (
        <>
        <div className="dates">
            <Link to="/view?month=01">JANUARY</Link>
            <p className="date" onClick={() => handleClick("01")}>JANUARY</p>
            <p className="date" onClick={() => handleClick("02")}>FEBRUARY</p>
            <p className="date" onClick={() => handleClick("03")}>MARCH</p>
            <p className="date" onClick={() => handleClick("04")}>APRIL</p>
            <p className="date" onClick={() => handleClick("05")}>MAY</p>
            <p className="date" onClick={() => handleClick("06")}>JUNE</p>
            <p className="date" onClick={() => handleClick("07")}>JULY</p>
            <p className="date" onClick={() => handleClick("08")}>AUGUST</p>
            <p className="date" onClick={() => handleClick("09")}>SEPTEMBER</p>
            <p className="date" onClick={() => handleClick("10")}>OCTOBER</p>
            <p className="date" onClick={() => handleClick("11")}>NOVEMBER</p>
            <p className="date" onClick={() => handleClick("12")}>DECEMBER</p>
            
        </div>
        <Outlet />
        </>
    )
}

export default Home