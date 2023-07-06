import axiosInstance from './axiosInstance';
const CardAxiosApi = {
    // 카테고리별 TOP1 카드 리스트
    getCategoryCardTop1: async () => {
        try {
            return await axiosInstance.get('/cardrecommend/category');
        } catch (e) {
            throw e;
        }
    },
    // 카테고리 카드 리스트
    getCardRecommend: async () => {
        try {
            return await axiosInstance.get('/cardrecommend');
        } catch (e) {
            throw e;
        }
    },
};

export default CardAxiosApi;
