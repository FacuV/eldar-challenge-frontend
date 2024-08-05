import { useState } from "react";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Dropdown({ name, lastName }: any) {
    const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
		window.sessionStorage.clear();
        setOpen(false);
    }

	return (
		<div className="relative inline-block text-left">
			<div onClick={() => setOpen(!open)}>
				{name && lastName && (
					<span className="text-blue-800 font-semibold p-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition">
						{name.charAt(0).toUpperCase()}
						{lastName.charAt(0).toUpperCase()}
					</span>
				)}
			</div>

			{open && (
				<div
					className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
				>
					<div className="py-1" role="none">
						<button
                            onClick={handleLogout}
							className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
							id="menu-item-3"
						>
							Cerrar sesión
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
