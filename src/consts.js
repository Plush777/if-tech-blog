export const SITE = {
	desc: '이프커뮤니티의 여러가지 이야기들을 들려드려요.',
	title: '이프커뮤니티 기술 블로그',
	name: '이프커뮤니티',
	ogImage: 'og.png',
	ogType: 'website',
	twitterCard: 'summary',
	robots: 'index,follow',
	url: 'https://ifcommunity-tech.netlify.app/'
};

export const HEADER_MENUS = [
	{
		id: 1,
		text: '채용',
		href: 'https://www.jobkorea.co.kr/Recruit/Co_Read/C/30971115'
	},
	{
		id: 2,
		text: '회사 살펴보기',
		href: 'http://ifcommunity.co.kr/'
	}
];

export const COMPANY_INFO = [
	{
		id: 1,
		content: {
			href: 'mailto:if@ifcommunity.co.kr',
			target: null,
			title: '이메일',
			desc: 'if@ifcommunity.co.kr'
		}
	},
	{
		id: 2,
		content: {
			href: 'https://naver.me/xbjUVOBE',
			target: 'blank',
			title: '주소',
			desc: '서울 성동구 아차산로17길 49'
		}
	},
	{
		id: 3,
		content: {
			href: 'tel:02-548-1955',
			target: null,
			title: '전화',
			desc: '02.548.1955'
		}
	}
];

export const COMPANY_MENUS = [
	{
		id: 1,
		content: {
			title: 'IF COMMUNITY',
			target: 'blank',
			href: 'http://ifcommunity.co.kr/'
		}
	},
	{
		id: 2,
		content: {
			title: 'Services',
			target: 'blank',
			href: 'http://ifcommunity.co.kr/#section-03'
		}
	},
	{
		id: 3,
		content: {
			title: 'Contact',
			target: 'blank',
			href: 'http://ifcommunity.co.kr/#notice'
		}
	},
	{
		id: 4,
		content: {
			title: 'Recruit',
			target: 'blank',
			href: 'https://www.jobkorea.co.kr/Recruit/Co_Read/C/30971115'
		}
	},
	{
		id: 5,
		content: {
			title: 'RSS',
			target: null,
			href: '/rss.xml'
		}
	}
];
