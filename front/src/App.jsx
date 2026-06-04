import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Prato from './pages/Prato'
import TelaRestaurante from './pages/TelaRestaurante'
import SobreNos from './pages/SobreNos'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './context/ToastContext'

const App = () => {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                    <Route path="/prato" element={<ProtectedRoute><Prato /></ProtectedRoute>} />
                    <Route path="/prato/:id" element={<ProtectedRoute><Prato /></ProtectedRoute>} />
                    <Route path="/restaurante" element={<ProtectedRoute><TelaRestaurante /></ProtectedRoute>} />
                    <Route path="/restaurante/:id" element={<ProtectedRoute><TelaRestaurante /></ProtectedRoute>} />
                    <Route path="/sobre-nos" element={<SobreNos />} />
                </Routes>
            </BrowserRouter>
        </ToastProvider>
    )
}

export default App