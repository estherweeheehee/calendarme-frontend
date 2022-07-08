import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main';
import Home from './pages/Home';
import View from './pages/View';
import Tags from './pages/Tags';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/" element={<Home />}>
                <Route path="/view/:month" element={<View />} />
                <Route path="/tags" element={<Tags />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
