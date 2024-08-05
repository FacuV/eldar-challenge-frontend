import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { userRoles } from "../utils/constants";
import { setPost } from "../redux/postSlice";

export default function Home() {
	const user = useSelector((state: any) => state.user);
	const isLogged = window.sessionStorage.getItem("token") !== null || user.token !== "";
	const navigateTo = useNavigate()
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	const userType = userRoles[user.type];

	useEffect(() => {
		if (!isLogged) {
			setPosts([]);
		}
	}, [user])

	const handleEditPost = (id: number) => {
		const post = posts.find((post: any) => post.id === id);

		if (!post) return;
		dispatch(setPost(post));
		navigateTo(`/post/${id}`);
	}

	useEffect(() => {
		if (!user) return;
		setLoading(true);
		getPosts(user.token)
			.then((response: any) => {
				if (!response.data) {
					setPosts([]);
					setLoading(false);
					return;
				}
				setPosts(response.data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, [user]);
	return (
		<div
			className={`p-4 justify-center flex flex-col items-center gap-4 ${
				loading && "overflow-hidden"
			}`}
		>
			{loading && <Loading />}
			{!loading && posts.length > 0 && isLogged && (
				<>
					<h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Hola de vuelta, {user?.name} 👋!</h1>
					{userType === "admin" && <Link to="/newPost" className="w-1/8 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition focus:ring-4 focus:outline-none focus:ring-blue-300">Crear post</Link>}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center">
						{posts.map((post: any) => {
							return (
								<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
									<h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-700 capitalize">
										{post.title}
									</h5>
									<p className="mb-3 font-normal text-gray-700">{post.body}</p>
									{userType === "admin" && (
										<button
											onClick={() => handleEditPost(post.id)}
											className="inline-flex items-center w-1/4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition focus:ring-4 focus:outline-none focus:ring-blue-300"
										>
											Editar
											<svg
												className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 14 10"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M1 5h12m0 0L9 1m4 4L9 9"
												/>
											</svg>
										</button>
									)}
								</div>
							);
						})}
					</div>
				</>
			)}
			{!loading && posts.length === 0 && !isLogged && (
				<div>
					<h1 className="text-3xl font-bold">
						Para ver los posts debes <Link className="text-blue-800 font-semibold hover:text-blue-600 transition" to="/login">iniciar sesión</Link>
					</h1>
				</div>
			)}
		</div>
	);
}
