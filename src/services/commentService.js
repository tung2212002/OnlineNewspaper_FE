import * as request from '../utils/request';

export const getCommentsService = async ( id, params) => {
    const response = await request.apiAuth.get(`comments/${id}/`, { params });
    return response;
}

export const postCommentService = async (id, data) => {
    const response = await request.apiAuthAttach.post(`comments/${id}/`, data);
    return response;
}

export const postLikeCommentService = async (id) => {
    const response = await request.apiAuth.post(`comments/like/${id}/`);
    return response;
}
