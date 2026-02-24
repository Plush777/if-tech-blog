import MyPostList from '@/components/MyPostList.astro';
import Logo from '@/components/Logo.astro';

export default {
	component: MyPostList
};

export const Post = {
	args: {
		withBehavior: false,
		data: [
			{
				id: 1,
				data: {
					title: '✍️ 이프 홈페이지 개편 프로젝트 회고록',
					description: '사내 홈페이지 개편 프로젝트를 진행하며 얻은 것들...',
					author: '서규영',
					pubDate: '2026-02-23T00:00:00.000Z',
					heroImage: '',
					category: '회고',
					isWarning: false
				}
			}
		],
		startIndex: 0,
		pageSize: 8
	}
};
