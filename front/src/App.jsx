import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import TelaRestaurante from './pages/TelaRestaurante';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TelaRestaurante />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
