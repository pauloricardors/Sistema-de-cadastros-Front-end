import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../services/api";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data: token } = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            });

            localStorage.setItem('token', token);
            navigate('/listar-usuarios');
        } catch (err) {
            alert('Senha ou e-mail inválidos!!');
            return;
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input ref={emailRef} placeholder="Email" type="email" className="w-full pl-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={passwordRef} placeholder="Senha" type="password" className="w-full pl-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">Login</button>
            </form>
            <Link to='/' className="text-center text-blue-700 mt-4 block">Ainda não tem uma conta? Cadastre-se!</Link>
        </div>
    );
}

export default Login;
