import * as request from "../utils/request";

export const getPostsService = async (id) => {
    const response = await request.api.get(`posts/${id}/`);
    return response;
}

export const getListsPostByCategoryService = async (params) => {
    const response = await request.api.get('posts/category/', { params });
    return response;
}

export const getListsPostByTagService = async (params) => {
    const response = await request.api.get('posts/tag/', { params });
    return response;
}

export const getListTagTrendingService = async (params) => {
    const response = await request.api.get('posts/tag/', { params });
    return response;
}

export const SearchService = async (params) => {
    const response = await request.api.get('search/', { params });
    return response;
}

export const getListsPostByAuthorService = async (author_id, params) => {
    const response = await request.api.get(`posts/author/${author_id}/`, { params });
    return response;
}