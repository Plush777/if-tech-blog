import Pagination from '@/components/Pagination.astro';

export default {
	component: Pagination
};

export const pagination = {
	args: {
		withBehavior: false,
		totalPages: 5,
		currentPage: 1
	}
};
