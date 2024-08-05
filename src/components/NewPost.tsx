import { useSelector } from "react-redux";
import { createPost } from "../services/posts";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function NewPost() {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({ title: "", description: "" });

	const user = useSelector((state: any) => state.user);

    const success = () => toast.success("Post creado exitosamente", { autoClose: 1000 });
    const error = () => toast.error("Error al crear el post", { autoClose: 1000 });
    const unauthorized = () => toast.error("No autorizado", { autoClose: 1000 });
    const lengthError = () => toast.error("El post debe contener titulo y descripción", { autoClose: 1000 });

	const handlePost = (event: any) => {
		event.preventDefault();

        
        if (values.title === "" || values.description === "") {
            return lengthError();
        }
        
        setLoading(true);
		createPost(user.token, values.title, values.description, user.id)
			.then(() => {
				setLoading(false);
                success();
                setValues({ title: "", description: "" });
			})
			.catch((res) => {
                setLoading(false);
                if (res.response.status === 401) {
                    return unauthorized();
                }

                return error();
			});
	};

	const handleChange = (event: any) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form onSubmit={handlePost}>
            <ToastContainer />
			
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
				<h1 className="text-3xl">Nuevo post</h1>
                <p className="text-lg font-extralight">Crea un nuevo post</p>
			</div>

			<div className="rounded-md mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
				<input
					className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
					placeholder="Titulo"
					type="text"
					name="title"
					onChange={handleChange}
                    value={values.title}
				/>
				<textarea
					className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mb-4"
					placeholder="Descripción"
					name="description"
					onChange={handleChange}
                    value={values.description}
				/>

				<div className="buttons flex justify-end">
					<button disabled={loading} className="disabled:opacity-50 border rounded font-semibold p-1 px-4 font-inter cursor-pointer text-gray-200 ml-2 bg-blue-500 hover:bg-blue-600 transition">
						Post
					</button>
				</div>
			</div>
		</form>
	);
}
