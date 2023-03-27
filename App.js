import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CompanyTable from './components/company/companyTable';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<CompanyTable/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
