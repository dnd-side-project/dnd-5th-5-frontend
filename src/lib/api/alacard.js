import client from './client';

// 알라카드 목록 받아오기
export const getAlaCardList = (nickname) => client.get('/api/v1/alacard/alacardlist', { params: { nickname } });