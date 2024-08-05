import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../services/signup";

export default function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		middleName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
		type: 1,
	});

	const [formErrors, setFormErrors] = useState({
		passwordLength: false,
		passwordNumber: false,
		passwordUppercase: false,
		passwordMatch: false,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const success = () =>
		toast.success("Usuario creado exitosamente", {
			autoClose: 1000,
		});

	const handleInputChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? (checked ? 2 : 1) : value,
		});
	};

	const validatePassword = () => {
		const { password, repeatPassword } = formData;
		const passwordLength = password.length >= 8;
		const passwordNumber = /\d/.test(password);
		const passwordUppercase = /[A-Z]/.test(password);
		const passwordMatch = password === repeatPassword;

		setFormErrors({
			passwordLength: !passwordLength,
			passwordNumber: !passwordNumber,
			passwordUppercase: !passwordUppercase,
			passwordMatch: !passwordMatch,
		});

		return (
			passwordLength && passwordNumber && passwordUppercase && passwordMatch
		);
	};

	const handleSignup = (event: any) => {
		event.preventDefault();

		if (validatePassword()) {
			let {
				name,
				middleName = null,
				lastName,
				email,
				password,
				type,
			} = formData;

			signup(name, middleName, lastName, email, password, +type).then(
				(response: any) => {
					const user = response;

					dispatch(setToken({ token: response.token }));
					dispatch(
						setUser({
							name: user.name,
							middleName: user.middleName,
							lastName: user.lastName,
							email: user.email,
                            type: user.type,
							id: user.id,
						})
					);

					success();

					setTimeout(() => {
						navigate("/login");
					}, 2000);
				}
			);
		}
	};

	const isFormValid = () => {
		const { name, lastName, email, password, repeatPassword } = formData;
		return (
			name &&
			lastName &&
			email &&
			password &&
			repeatPassword &&
			!Object.values(formErrors).some((error) => error === true)
		);
	};

	return (
		<div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
			<ToastContainer />
			<form
				onSubmit={handleSignup}
				className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-5xl w-full"
			>
				<div
					className="hidden md:block lg:w-1/2 bg-cover bg-no-repeat bg-blue-700"
					style={{
						backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipOiv9Y82P8OSawoyNoKcmjMnBpOZ21B3unNB08r=s680-w680-h510)`,
					}}
				></div>
				<div className="w-full p-8 lg:w-1/2">
					<p className="text-xl text-gray-600 text-center">Registrarse</p>
					<div className="mt-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Nombre
						</label>
						<input
							className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 transition"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="mt-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Segundo nombre{" "}
							<span className="text-gray-500 italic text-xs">(si aplica)</span>
						</label>
						<input
							className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 transition"
							type="text"
							name="middleName"
							value={formData.middleName}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mt-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Apellido
						</label>
						<input
							className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 transition"
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="mt-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Correo electrónico
						</label>
						<input
							className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 transition"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							required
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
							value={formData.password}
							onChange={handleInputChange}
							onBlur={validatePassword}
							required
						/>
						{formErrors.passwordLength && (
							<p className="text-red-500 text-xs italic">
								La contraseña debe tener al menos 8 caracteres.
							</p>
						)}
						{formErrors.passwordNumber && (
							<p className="text-red-500 text-xs italic">
								La contraseña debe contener al menos un número.
							</p>
						)}
						{formErrors.passwordUppercase && (
							<p className="text-red-500 text-xs italic">
								La contraseña debe contener al menos una letra mayúscula.
							</p>
						)}
						<div className="flex justify-between">
							<label className="block text-gray-700 text-sm font-bold my-2">
								Repetir contraseña
							</label>
						</div>
						<input
							className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
							type="password"
							name="repeatPassword"
							value={formData.repeatPassword}
							onChange={handleInputChange}
							onBlur={validatePassword}
							required
						/>
						{formErrors.passwordMatch && (
							<p className="text-red-500 text-xs italic">
								Las contraseñas no coinciden.
							</p>
						)}
					</div>
					<div className="mt-4 flex items-center">
						<input
							id="type"
							name="type"
							type="checkbox"
							className="h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
							checked={formData.type === 2}
							onChange={handleInputChange}
						/>
						<label
							htmlFor="type"
							className="ml-2 block text-sm leading-5 text-gray-700"
						>
							Crear cuenta como administrador
						</label>
					</div>
					<div className="mt-8">
						<button
							type="submit"
							className="disabled:opacity-50 bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 transition"
							disabled={!isFormValid()}
						>
							Registrarse
						</button>
					</div>
					<div className="mt-4 flex items-center w-full text-center">
						<span className="text-xs text-gray-500 text-center w-full">
							¿Ya tienes cuenta?
							<Link to="/login" className="text-blue-700">
								{" "}
								Iniciar sesión
							</Link>
						</span>
					</div>
				</div>
			</form>
		</div>
	);
}
