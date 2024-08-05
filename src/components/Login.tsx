import { useDispatch } from "react-redux";
import { login } from "../services/login";
import { setToken, setUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const success = () => toast.success("Inicio de sesión exitoso", {
        autoClose: 1000,
    });

    const handleLogin = (event : any) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        login(email, password)
        .then((response: any) => {
            const user = response.user
            dispatch(setToken({ token: response.token }));
            dispatch(setUser({ name: user.name, middleName: user.middleName, lastName: user.lastName, email: user.email, type: user.type, id: user.id }));
            success()

            setTimeout(() => {
                navigate("/")
            }, 2000)
        })
    }
    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
            <ToastContainer />
            <form onSubmit={handleLogin} className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                <div
                    className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                    style={{
                        backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipNkdELeFuqopcCyXYjJX1hQPcGyHPOsJ_Nc-PkW=s680-w680-h510)`,
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-xl text-gray-600 text-center">Bienvenido a Eldar!</p>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo electrónico
                        </label>
                        <input
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 transition"
                            type="email"
                            required
                            name="email"
                        />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Contraseña
                            </label>
                        </div>
                        <input
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="password"
                            name="password"
                        />
                        <a
                            href="#"
                            className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2 transition"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 transition">
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="mt-4 flex items-center w-full text-center">
                        <a
                            href="#"
                            className="text-xs text-gray-500 text-center w-full"
                        >
                            ¿No tienes cuenta?
                            <Link to="/signup" className="text-blue-700"> Registrarse</Link>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
};
