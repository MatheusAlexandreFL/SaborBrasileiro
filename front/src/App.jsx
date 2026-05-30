import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Prato from './pages/Prato'
import TelaRestaurante from './pages/TelaRestaurante'
import { ToastProvider } from './context/ToastContext'

const App = () => {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/prato" element={<Prato />} />
                    <Route path="/restaurante" element={<TelaRestaurante />} />
                </Routes>
            </BrowserRouter>
        </ToastProvider>
    )
}

export default App