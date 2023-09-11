import * as request from "../utils/request";

export const createPostService = async (body) => {
    const response = await request.apiAuthAttach.post('posts/', body);
    return response;
}

export const managePostService = async (params) => {
    const response = await request.apiAuth.get('posts/author/', { params });
    return response;
}

export const editPostService = async (id, body) => {
    const response = await request.apiAuthAttach.put(`posts/${id}/`, body);
    return response;
}

export const deletePostService = async (id) => {
    const response = await request.apiAuth.delete(`posts/${id}/`);
    return response;
}