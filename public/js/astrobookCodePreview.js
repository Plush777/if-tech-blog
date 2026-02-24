// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function () {
	console.log('astrobookCodePreview.js loaded');

	// 기존 HTML 구조를 동적으로 생성
	const codeRoot = document.createElement('div');
	codeRoot.className = 'custom-astrobook-code-root';

	// 상단 영역 생성
	const codeTop = document.createElement('div');
	codeTop.className = 'custom-astrobook-code-top';

	// 탭 영역 생성
	const codeTopTabs = document.createElement('div');
	codeTopTabs.className = 'custom-astrobook-code-top-tabs';

	const codeButton = document.createElement('button');
	codeButton.type = 'button';
	codeButton.textContent = 'Code';
	codeTopTabs.appendChild(codeButton);

	// 리사이즈 영역 생성
	const codeTopResize = document.createElement('div');
	codeTopResize.className = 'custom-astrobook-code-top-resize';

	// 버튼 영역 생성
	const codeTopButtons = document.createElement('div');
	codeTopButtons.className = 'custom-astrobook-code-top-buttons';

	// 하단 영역 생성
	const codeBottom = document.createElement('div');
	codeBottom.className = 'custom-astrobook-code-bottom';

	// code-area HTML 생성
	const codeArea = document.createElement('div');
	codeArea.className = 'code-area';

	const preElement = document.createElement('pre');
	preElement.className = 'hljs-sc';

	const codeElement = document.createElement('code');
	codeElement.className = 'hljs language-html';

	preElement.appendChild(codeElement);
	codeArea.appendChild(preElement);
	codeBottom.appendChild(codeArea);

	// 구조 조립
	codeTop.appendChild(codeTopTabs);
	codeTop.appendChild(codeTopButtons);
	codeTop.appendChild(codeTopResize);
	codeRoot.appendChild(codeTop);
	codeRoot.appendChild(codeBottom);

	// main 태그 안에 추가
	const mainElement = document.querySelector('main');
	if (mainElement) {
		mainElement.appendChild(codeRoot);
		console.log('Code root added to main element');
	} else {
		// main 태그가 없으면 body에 추가
		document.body.appendChild(codeRoot);
		console.log('Code root added to body element');
	}

	// camelCase를 kebab-case로 변환하는 함수
	function camelToKebabCase(str) {
		return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
	}

	// kebab-case를 camelCase로 변환하는 함수
	function kebabToCamelCase(str) {
		return str.replace(/-([a-z])/g, function (g) {
			return g[1].toUpperCase();
		});
	}

	// URL에서 컴포넌트 정보 추출 및 코드 로드
	function loadCodeFromURL() {
		const currentPath = window.location.pathname;
		const pathParts = currentPath.split('/');

		console.log('Current path:', currentPath);
		console.log('Path parts:', pathParts);

		// /components만 있는 경우 (대시보드 페이지)는 코드 패널을 표시하지 않음
		if (pathParts.length === 2 && pathParts[1] === 'components') {
			console.log('On dashboard page, hiding code panel');
			if (codeRoot.parentNode) {
				codeRoot.parentNode.removeChild(codeRoot);
			}
			return;
		}

		// /components/dashboard/데이터파일이름/데이터파일안에있는변수이름 형태의 URL에서 정보 추출
		if (pathParts.length >= 5 && pathParts[1] === 'components' && pathParts[2] === 'dashboard') {
			const componentName = pathParts[3]; // 'button' (데이터파일이름)
			const variantKebab = pathParts[4]; // 'disabled', 'green', 'red', 'before-icon' 등 (변수이름)

			console.log('Component name:', componentName);
			console.log('Variant kebab:', variantKebab);

			if (componentName && variantKebab) {
				// kebab-case를 camelCase로 변환 (BeforeIcon, AfterIcon 등)
				const variant = kebabToCamelCase(variantKebab);
				console.log('Variant camelCase:', variant);
				loadComponentCode(componentName, variant);
			} else {
				// 기본 메시지 표시
				codeElement.textContent = '// No component or variant found in URL';
				console.log('No component or variant found in URL');
			}
		} else {
			// 기본 메시지 표시
			codeElement.textContent = '// Not on a component page';
			console.log('Not on a component page');
		}
	}

	// 컴포넌트 코드 로드 함수
	async function loadComponentCode(componentName, variant) {
		try {
			console.log(`Loading component: ${componentName}, variant: ${variant}`);

			// data/astrobook 디렉토리에서 해당 컴포넌트 파일 로드
			const response = await fetch(`/data/astrobook/${componentName}.js`);
			console.log('Fetch response status:', response.status);

			if (response.ok) {
				const moduleText = await response.text();
				console.log('Module text loaded, length:', moduleText.length);

				// 모듈 텍스트에서 해당 variant 추출
				const variantRegex = new RegExp(`export const ${variant}\\s*=\\s*\`([\\s\\S]*?)\``);
				const match = moduleText.match(variantRegex);

				console.log('Regex match:', match);

				if (match && match[1]) {
					const codeContent = match[1].trim();
					codeElement.textContent = codeContent;
					console.log('Code content set, length:', codeContent.length);

					// highlight.js 적용
					if (window.hljs) {
						window.hljs.highlightElement(codeElement);
						console.log('Highlight.js applied');
					} else {
						console.log('Highlight.js not available');
					}
				} else {
					codeElement.textContent = `// ${variant} variant not found`;
					console.log(`Variant ${variant} not found in module`);
				}
			} else {
				codeElement.textContent = `// Component file not found: ${componentName}.js`;
				console.log(`Component file not found: ${componentName}.js`);
			}
		} catch (error) {
			console.error('Error loading component code:', error);
			codeElement.textContent = `// Error loading code: ${error.message}`;
		}
	}

	// 초기 코드 로드
	loadCodeFromURL();

	// URL 변경 감지 (브라우저 뒤로가기/앞으로가기 등)
	window.addEventListener('popstate', loadCodeFromURL);

	// 초기 높이 설정 후 코드 로드 재시도
	setTimeout(() => {
		if (codeElement.textContent === '' || codeElement.textContent.includes('Click and drag')) {
			loadCodeFromURL();
		}
	}, 100);

	// 윈도우 리사이즈 시 높이 조정
	window.addEventListener('resize', function () {
		if (isVisible) {
			const savedHeight = localStorage.getItem(STORAGE_KEY);
			if (savedHeight) {
				const height = parseInt(savedHeight);
				const windowHeight = window.innerHeight;
				const codeTopHeight = codeTop.offsetHeight;

				// 윈도우 크기가 변경되어도 저장된 높이 비율 유지
				const maxHeight = windowHeight;
				const adjustedHeight = Math.min(height, maxHeight);

				if (adjustedHeight > 40) {
					codeRoot.style.height = adjustedHeight + 'px';
					const bottomHeight = adjustedHeight - codeTopHeight;
					codeBottom.style.height = bottomHeight + 'px';
					saveHeight(adjustedHeight, true);
				} else {
					setDefaultHeight();
					saveHeight(40, false);
				}
			}
		}
	});

	// 로컬스토리지 키
	const STORAGE_KEY = 'astrobook-code-panel-height';
	const STORAGE_VISIBLE_KEY = 'astrobook-code-panel-visible';

	// 리사이즈 기능 구현 (스토리북 스타일)
	let isResizing = false;
	let startY = 0;
	let startHeight = 0;
	let isVisible = false;

	// 저장된 높이값 불러오기
	function loadSavedHeight() {
		const savedHeight = localStorage.getItem(STORAGE_KEY);
		const savedVisible = localStorage.getItem(STORAGE_VISIBLE_KEY);

		if (savedHeight && savedVisible === 'true') {
			// 저장된 높이가 있고 visible 상태라면 해당 높이로 설정
			const height = parseInt(savedHeight);
			const windowHeight = window.innerHeight;
			const codeTopHeight = codeTop.offsetHeight;

			if (height > 40) {
				codeRoot.style.height = height + 'px';
				codeRoot.style.transform = 'translateY(0)';
				isVisible = true;

				// 하단 영역 높이 조정
				const bottomHeight = height - codeTopHeight;
				codeBottom.style.height = bottomHeight + 'px';
				// 코드 영역이 보이도록 최소 높이 보장
				if (bottomHeight > 0) {
					codeBottom.style.minHeight = '200px';
				}
			} else {
				// 저장된 높이가 40px 이하라면 기본값으로 설정
				setDefaultHeight();
			}
		} else {
			// 저장된 값이 없으면 기본값으로 설정
			setDefaultHeight();
		}
	}

	// 기본 높이 설정 (맨 아래)
	function setDefaultHeight() {
		codeRoot.style.height = '40px';
		codeRoot.style.transform = 'translateY(calc(100% - 40px))';
		isVisible = false;
		codeBottom.style.height = '0px';
		// 코드 영역이 보이지 않을 때는 기본 메시지 표시
		if (codeElement.textContent === '') {
			codeElement.textContent = '// Click and drag to expand code panel';
		}
	}

	// 높이값 저장
	function saveHeight(height, visible) {
		localStorage.setItem(STORAGE_KEY, height.toString());
		localStorage.setItem(STORAGE_VISIBLE_KEY, visible.toString());
	}

	// 초기 높이 설정
	loadSavedHeight();

	codeTopResize.addEventListener('mousedown', function (e) {
		isResizing = true;
		startY = e.clientY;
		startHeight = codeRoot.offsetHeight;

		// 드래그 시작 시 부드러운 전환 비활성화
		codeRoot.style.transition = 'none';

		// 드래그 중일 때 cursor 스타일 유지
		document.body.style.cursor = 'ns-resize';

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		e.preventDefault();
	});

	function handleMouseMove(e) {
		if (!isResizing) return;

		const deltaY = startY - e.clientY;
		const newHeight = startHeight + deltaY;
		const windowHeight = window.innerHeight;
		const codeTopHeight = codeTop.offsetHeight;

		// 위쪽 드래그: 화면 100% 채우면 최대 높이로 제한
		if (deltaY > 0 && newHeight >= windowHeight) {
			codeRoot.style.height = '100%';
			codeRoot.style.transform = 'translateY(0)';
			isVisible = true;

			// 하단 영역 높이 조정
			const bottomHeight = windowHeight - codeTopHeight;
			codeBottom.style.height = bottomHeight + 'px';

			// 높이값 저장
			saveHeight(windowHeight, true);

			// 드래그 계속 가능하도록 종료하지 않음
			return;
		}

		// 아래쪽 드래그: 최소 40px 보장
		if (deltaY < 0 && newHeight <= 40) {
			codeRoot.style.height = '40px';
			codeRoot.style.transform = 'translateY(calc(100% - 40px))';
			isVisible = false;

			// 하단 영역 높이 조정
			codeBottom.style.height = '0px';

			// 높이값 저장
			saveHeight(40, false);

			// 드래그 계속 가능하도록 종료하지 않음
			return;
		}

		// 일반적인 드래그 범위 내에서의 처리
		const minHeight = 40; // 최소 40px 보장
		const maxHeight = windowHeight;

		// 높이 제한 적용
		let clampedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

		// 40px 미만으로 내려가지 않도록 강제 보장
		if (clampedHeight < 40) {
			clampedHeight = 40;
		}

		codeRoot.style.height = clampedHeight + 'px';

		// custom-astrobook-code-bottom div의 높이 동적 조정
		const bottomHeight = clampedHeight - codeTopHeight;
		codeBottom.style.height = bottomHeight + 'px';

		// 코드 영역이 보이도록 최소 높이 보장
		if (bottomHeight > 0) {
			codeBottom.style.minHeight = '200px';
		}

		// transform 조정: 위로 드래그할 때는 화면 위쪽으로, 아래로 드래그할 때는 상단 div만 보이도록
		if (clampedHeight > 40 + 100) {
			// 충분히 위로 드래그된 경우 - 패널이 완전히 보임
			codeRoot.style.transform = 'translateY(0)';
			isVisible = true;
		} else {
			// 상단 div만 보이는 상태 (최소 40px 보장)
			// clampedHeight가 40px 이하일 때는 무조건 40px로 고정
			if (clampedHeight <= 40) {
				codeRoot.style.transform = 'translateY(calc(100% - 40px))';
			} else {
				codeRoot.style.transform = `translateY(calc(100% - ${clampedHeight}px))`;
			}
			isVisible = false;
		}

		// 높이값 저장
		saveHeight(clampedHeight, isVisible);
	}

	function handleMouseUp() {
		isResizing = false;

		// 드래그 종료 시 부드러운 전환 다시 활성화
		codeRoot.style.transition = 'transform 0.3s ease';

		// cursor 스타일 복원
		document.body.style.cursor = '';

		// 현재 높이를 그대로 유지 (드래그로 설정된 높이 유지)
		const currentHeight = codeRoot.offsetHeight;
		const codeTopHeight = codeTop.offsetHeight;

		// 하단 영역 높이만 재조정
		const bottomHeight = currentHeight - codeTopHeight;
		codeBottom.style.height = bottomHeight + 'px';

		// 최종 상태에서 40px 미만이면 강제로 40px로 설정
		if (currentHeight <= 40) {
			codeRoot.style.height = '40px';
			codeRoot.style.transform = 'translateY(calc(100% - 40px))';
			codeBottom.style.height = '0px';
			saveHeight(40, false);
		} else {
			// 현재 높이 저장
			saveHeight(currentHeight, isVisible);
		}

		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}
});
