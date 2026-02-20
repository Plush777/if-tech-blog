---
title: '3-1. CSS 기초 2: 작성법 및 선택자'
isWarning: false
description: 'HTML 문서를 꾸밀 수 있는 CSS 작성법과 선택자들에 대해 알아보자!'
pubDate: '2025-07-25'
heroImage: '/images/post/2025/pub/ep3/thumbnail.png'
category: '퍼블리싱'
ref:
  [
    'https://runcoding.tistory.com/19',
    'https://developer.mozilla.org/ko/docs/Web/CSS/CSS_cascade/Specificity',
    'https://poiemaweb.com/css3-inheritance-cascading'
  ]
---

## CSS 작성법

<figure>
	<img src="/images/post/2025/pub/ep3/css-syntax.gif" />
	<figcaption>이미지 출처: https://www.w3schools.com/whatis/whatis_css.asp</figcaption>
</figure>

위 이미지처럼, CSS는 선택자 (Selector) 를 먼저 적고, 중괄호 안에
적용하고 싶은 스타일을 적으면 됩니다.

그럼 우선순위에서도 언급되었던 선택자는 무엇이고, 어떤 것들이 있는지 알아보겠습니다.

## 선택자 (Selector)

CSS에선 선택자를 사용하여 특정 요소에 스타일을 적용시킬 수 있습니다. 선택자 종류로는 상당히 많은데, 하나씩 어떤 역할을 하는지 알아보도록 하겠습니다.

### 태그 선택자

선택자 중 가장 간단한 선택자로, 태그 이름을 선택하는 방법입니다.
해당 문서에 있는 모든 span태그에 해당 스타일이 적용됩니다.

가장 간단한 방법이지만 특정 요소를 선택하는게 아닌, 모든 span 태그한테 적용되기 때문에 그렇게 좋은 방법은 아닙니다.

주로, reset css를 작성할 때 많이 사용됩니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			span {
				color: red;
			}
		</style>
	</head>
	<body>
		<span>Hello World</span>
	</body>
</html>
```

<iframe
  src="/example/html/css_tag_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### id 선택자

태그에 id를 부여하여 지정된 id에 스타일을 적용하는 방법입니다.

- 선택을 위해서 '#' 기호를 사용합니다.
- 클래스 선택자보다 우선순위가 높기 때문에 주의해야합니다.
- html에서 id의 값은 고유해야 합니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			#container {
				background-color: red;
			}

			#container p {
				color: white;
			}
		</style>
	</head>
	<body>
		<div id="container">
			<p>Hello World</p>
		</div>
	</body>
</html>
```

<iframe
  src="/example/html/css_id_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### class 선택자

태그에 class를 부여하여 지정된 class에 스타일을 적용하는 방법입니다.

- 위 선택자들보다 가장 권장되는 방법입니다.
- 선택을 위해서 '.' 기호를 사용합니다.
- class는 동일한 클래스명을 재사용해도 되고, 하나의 class에 여러 개의 class를 부여할 수도 있습니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			.red {
				color: red;
			}

			.blue {
				color: blue;
			}

			.orange {
				color: orange;
			}

			.font-bold {
				font-weight: bold;
			}
		</style>
	</head>
	<body>
		<p class="red">Hello World</p>
		<p class="blue">Hello World</p>
		<p class="orange font-bold">Hello World</p>
	</body>
</html>
```

<iframe
  src="/example/html/css_class_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 전체 선택자

모든 요소에 지정된 스타일을 부여합니다.

- 주로 reset css에서 사용됩니다.
- 무분별한 전체 선택자 사용은 사이트의 성능저하를 일으킬 수 있기 때문에 웬만하면 클래스 선택자를 사용하는게 좋습니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			.container * {
				color: red;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<p>Hello World</p>
			<button>Click me</button>
			<a href="#">Link</a>
		</div>
	</body>
</html>
```

<iframe
  src="/example/html/css_all_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 하위 선택자

지정한 요소 내부에 있는 모든 요소를 선택합니다.

- 내부에 있는 요소를 선택할 때는 공백을 사용합니다.
- `.list .list-item .list-item-list .list-item-list-item` 처럼 선택자가 무작정 길어지는 문제가 생길 수도 있기 때문에, 고려하여 작성해야 합니다. 이러한 문제 때문에 요소의 네이밍을 특별하게 하여 하위 선택자 사용을 지양하는 CSS 방법론 중에 하나인 <a href="https://getbem.com/introduction/" target="_blank">BEM</a> 이 있습니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			.container p {
				color: red;
			}

			.container button {
				color: blue;
			}

			.container a {
				color: green;
			}

			.list .list-item {
				color: pink;
			}

			.list .list-item .list-item-list .list-item-list-item {
				color: orange;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<p>Hello World</p>
			<button>Click me</button>
			<a href="#">Link</a>

			<ul class="list">
				<li class="list-item">Item 1</li>
				<li class="list-item">Item 2</li>
				<li class="list-item">
					<span>Item 3</span>

					<ul class="list-item-list">
						<li class="list-item-list-item">Item 3-1</li>
						<li class="list-item-list-item">Item 3-2</li>
						<li class="list-item-list-item">Item 3-3</li>
					</ul>
				</li>
			</ul>
		</div>
	</body>
</html>
```

<iframe
  src="/example/html/css_lower_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 자식 선택자

지정한 요소 바로 하위에 있는 요소만 선택합니다.

- 선택을 위해 '&gt;' 기호를 사용합니다.
- `.container p`의 경우만 해당되며 `.container div p`의 경우는 하위에 div가 하나 더 있기 때문에 해당이 되지 않습니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>

		<style>
			.container > p {
				color: red;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<p>Hello World</p>

			<div>
				<p>Click me</p>
				<p>Link</p>
			</div>
		</div>
	</body>
</html>
```

<iframe
  src="/example/html/css_child_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 인접 선택자

지정한 요소 바로 다음에 오는 요소만 선택합니다.

- 선택을 위해 '+' 기호를 사용합니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			p + button {
				color: red;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<p>Hello World</p>
			<button>Click me</button>
			<a href="#">Link</a>
		</div>
	</body>
</html>
```

<iframe
  src="/example/html/css_plus_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 형제 선택자

현재 요소와 같은 구조에 있는 요소만 선택됩니다.

- 선택을 위해 '~' 기호를 사용합니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			p ~ a {
				color: red;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<p>Hello World</p>

			<a href="#">Link1</a>
			<a href="#">Link2</a>
			<div>
				<a href="#">Link3</a>
			</div>
			<a href="#">Link4</a>
		</div>
	</body>
</html>
```

<iframe
  src="/example/html/css_tilde_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 그룹 선택자

여러 선택자에 동일한 스타일을 부여하고 싶을 때 사용합니다.

- 선택을 위해 ',' 기호를 사용합니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			.text,
			.text2,
			.text3 {
				color: red;
			}
		</style>
	</head>
	<body>
		<p class="text">Hello World</p>
		<p class="text2">Hello World</p>
		<p class="text3">Hello World</p>
	</body>
</html>
```

<iframe
  src="/example/html/css_group_selector.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>

### 속성 선택자

html 태그에 속성이나 속성값을 중괄호 안에 넣어서 선택자로 사용할 수 있습니다.

#### 예시

<!-- prettier-ignore -->
|           속성 값          	    | 속성                    
|:-----------------------------:|:---------------------------:|
|span[class]                    |class명을 가진 span 태그        |
|img[alt]            			|alt 속성을 가진 img 태그         |
|button[type="button"]			|button 태그의 타입이 button일 때 |
|input[type="text"]				|input 타입이 text일 때          |
|a[title]						|title 속성을 가진 a 태그 |
|p[class~="abc"]				|class명이 유일하게 'abc'이거나 여러 개의 class명 중 하나가 'abc'인 p 태그|
|p[class|="abc"]				|class명이 'abc' 이거나 'abc-' 로 시작하는 p 태그|
|p[class^="abc"]				|class명이 철자 'abc'로 시작하는 p 태그|
|p[class$="abc"]				|class명이 철자 'abc'로 끝나는 p 태그|
|p[class*="abc"]				|class명에 철자 'abc'가 포함되어 있는 p 태그|
|a[href^="mailto"]				|href 속성값이 'mailto'로 시작하는 a 태그|
