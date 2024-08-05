import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Navbar() {
	const { name, lastName } = useSelector((state: any) => state.user);

	return (
		<nav className="bg-white py-3 px-4 border flex justify-between items-center sticky top-0">
			<Link to="/" className="text-md md:text-2xl font-bold">
				Eldar -{" "}
				<span className="text-blue-800 font-semibold">Frontend challenge</span>
			</Link>
			<Dropdown name={name} lastName={lastName}/>
			{!name && !lastName && <Link className="text-black text-xs md:text-base font-semibold px-4 rounded-md cursor-pointer hover:bg-gray-200 transition" to="/login">Iniciar sesión</Link>}
		</nav>
	);
}
