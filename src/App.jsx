import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main';
import View from './pages/View';
import Tags from './pages/Tags';
import MonthsView from './pages/MonthsView';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} >
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<MonthsView />} />
                <Route path="/view" element={<View />} />
                <Route path="/tags" element={<Tags />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
