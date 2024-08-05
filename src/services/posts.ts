import axios from "axios"

export const getPosts = async (token: string) => {
    try {
        const url = "http://149.50.135.111:5000/posts/all"
        const posts = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return posts
    } catch (error) {
        throw error
    }
}

export const createPost = async (token: string, title: string, body: string, userId: number) => {
    try {
        const url = "http://149.50.135.111:5000/posts"
        const post = await axios.post(url, {
            title,
            body,
            userId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return post
    } catch (error) {
        throw error
    }
}

export const editPost = async (token: string, title: string, body: string, userId: number, id: number) => {
    try {
        const url = `http://149.50.135.111:5000/posts/${id}`
        const post = await axios.patch(url, {
            title,
            body,
            userId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return post
    } catch (error) {
        throw error
    }
}