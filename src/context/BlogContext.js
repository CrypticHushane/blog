import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case "get_blogpost":
            return action.payload;
        case "edit_blogpost":
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id
                    ? action.payload
                    : blogPost;
            });
        case "delete_blogpost":
            return state.filter((blogPost) => blogPost.id !== action.payload);
        default:
            return state;
    }
};

const getBlogPost = (dispatch) => {
    return async () => {
        const response = await jsonServer.get("/blogPosts");

        dispatch({ type: "get_blogpost", payload: response.data });
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post("/blogPosts", { title, content });
        if (callback) {
            callback();
        }
    };

    // dispatch({ type: 'add_blogpost', payload: { id: response.data.id, }})
};
const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogPosts/${id}`, { id });
        dispatch({ type: "delete_blogpost", payload: id });
    };
};
const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogPosts/${id}`, { title, content });
        dispatch({
            type: "edit_blogpost",
            payload: { id, title, content },
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
    []
);
