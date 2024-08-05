import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewPost from "./components/NewPost";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPost from "./components/EditPost";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./redux/userSlice";

export default function App() {
	
	const dispatch = useDispatch();

	useEffect(() => {
		const isLogged = sessionStorage.getItem("token");
		if (!isLogged) return;

		const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
		if (!user) return;

		const userData = user.user

		dispatch(setUser({ name: userData.name, middleName: userData.middleName, lastName: userData.lastName, email: userData.email, type: userData.type, id: userData.id }));
		dispatch(setToken({ token: isLogged }));
	}, [])

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="login" element={<Login />} />
			<Route path="signup" element={<Signup />} />
			<Route
				path="newPost"
				element={
					<ProtectedRoute>
						<NewPost />
					</ProtectedRoute>
				}
			/>
			<Route
				path="post/:id"
				element={
					<ProtectedRoute>
						<EditPost />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<Home />} />
		</Routes>
	);
}
