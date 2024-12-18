import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import AddHistoricalFigure from './components/AddHistoricalFigure';
import ViewHistoricalFigure from './components/ViewHistoricalFigure';
import Timeline from './components/Timeline/Timeline'




function App() {

  return (
    <div className="App" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Router>
        <Routes>
          <Route path='/timeline' element={< Timeline />}/>
          <Route path="/figures/new" element={<AddHistoricalFigure />} />
          <Route path="/historical-figures/:id" element={<ViewHistoricalFigure />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
