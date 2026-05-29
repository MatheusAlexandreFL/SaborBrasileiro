import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Prato from './pages/Prato'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
                <Route path="/home" element={<Home />} />
>>>>>>> feat-tela-prato
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/prato" element={<Prato />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App