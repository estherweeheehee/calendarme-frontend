import { Link, useNavigate } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Navbar = () => {
  
  return (
    <>
      <nav>
        <Link to="/">
          <h1>CalendarME</h1>
        </Link>
        
        <div className="navRight">
          
        <GitHubIcon className="navIcons" onClick={() => window.open("https://github.com/estherweeheehee")}/>
        <LinkedInIcon className="navIcons" onClick={() => window.open("https://www.linkedin.com/in/estherweexl/")} />
        </div>

      </nav>
    </>
  );
};


export default Navbar;
