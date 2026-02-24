import MyPostList from '@/components/MyPostList.astro';
import postsData from '../../public/data/astrobook/Post';

export default {
	component: MyPostList
};

export const Card = {
	args: {
		withBehavior: false,
		data: postsData,
		startIndex: 0,
		pageSize: 8
	}
};
