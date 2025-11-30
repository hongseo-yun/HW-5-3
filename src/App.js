import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import List from './pages/List';
import Create from './pages/Create';
import Update from './pages/Update';
import Detail from './pages/Detail';


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;