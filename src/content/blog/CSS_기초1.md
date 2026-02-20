---
title: '3. CSS 기초 1: 우선순위'
isWarning: false
description: 'HTML 문서를 꾸밀 수 있는 CSS 우선순위에 대해 알아보자!'
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

## CSS는 무엇인가?

CSS는 **Cascading Style Sheets** 의 약자로, HTML 문서를 꾸밀 수 있는 용도로 사용합니다.

사람으로 비유하자면 우리의 몸을 지탱해주는 역할을 하는 뼈는 HTML, 우리가 외출할 때 옷을 입거나 화장을 하고 반지, 귀걸이 등의 악세서리처럼
꾸미는 것은 CSS라고 할 수 있습니다.

Cascading은 "계단식", "폭포수처럼 흐르는", "단계적으로 적용되는" 등과 같은 뜻을 가지고있습니다. 이 단어는 다양한 맥락에서 사용되는데요, CSS에서의 의미는 특정 규칙에 따라 스타일 중복을 피하기 위해 **우선순위를 지정하는 것** 을 말합니다.

그렇다면, CSS 우선순위라는 것은 무엇일까요?

## CSS 우선순위

CSS에는 **우선순위** 라는 개념이 존재합니다. 우선순위라는 것은 태그에 서로 스타일이 중복되었을 때, 어떤 스타일이 먼저 우선적으로 적용될 지 결정합니다.

이 개념이 생각보다 중요한데, 우선순위에 대해 잘 알아야 점점 길어지는 CSS 선택자를 방지할 수 있고, 무분별한 `!important` flag 사용을 피할 수 있습니다.

그렇다면, 우선순위를 결정하는 CSS 규칙에 대해 알아보겠습니다.

### CSS 우선순위 규칙: 중요도, 명시도, 코드순서

CSS 우선순위 규칙에는 중요도, 명시도, 코드순서로 총 3가지가 있습니다.

#### 중요도

CSS가 어느 위치에 연결되어있는지 혹은 어디에 쓰여있는지에 따라 우선순위가 결정됩니다.

1.  &lt;head&gt; 안에 &lt;style&gt; 태그가 있을 경우

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<style>
    			div {
    				color: white;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div>My homepage</div>
    	</body>
    </html>
    ```

2.  &lt;head&gt; 안에 &lt;style&gt; 안에 있는 @import

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<style>
    			@import './style.css';

    			div {
    				color: white;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div>My homepage</div>
    	</body>
    </html>
    ```

3.  &lt;link&gt; 로 연결된 CSS 파일

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<link rel="stylesheet" href="./style.css" />
    		<style>
    			@import './style.css';

    			div {
    				color: white;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div>My homepage</div>
    	</body>
    </html>
    ```

4.  &lt;link&gt; 로 연결된 CSS 파일 내의 @import

    index.html

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<link rel="stylesheet" href="./style.css" />
    		<style>
    			div {
    				color: white;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div>My homepage</div>
    	</body>
    </html>
    ```

    style.css

    ```css
    @charset "utf-8";

    @import './style2.css';
    ```

5.  브라우저 기본 스타일 (User agent stylesheet)

  <img src="/images/post/2025/pub/ep3/useragent.png"/>

#### 명시도

스타일을 적용할 대상을 명확하게 특정할수록 우선순위가 높아집니다.

1. !important (가장높음)
2. id 선택자
3. class 선택자
4. 태그 선택자 (가장 낮음)

`!important` flag는 **모든 우선순위를 무시** 한 채 해당 스타일을 적용시키기 때문에 추후에 스타일 디버깅이 어려울 수 있어 용도가 명확한게 아니라면 사용을 피해야 합니다.

작업자마다 다르겠으나, 필자는 아래와 같은 경우 `!important` 를 사용합니다.

1. 작업 도중 css 선택자가 너무 길어져서 우선순위가 꼬인경우
2. 해당 스타일이 다른 스타일에 의해 절대로 바뀌어서는 안되는경우
3. 부트스트랩같은 외부 CSS 라이브러리를 사용할 때, 해당 CSS를 커스텀해야하는 경우

<figure>
  <img src="/images/post/2025/pub/ep3/specifishity.png" />
  <figcaption>이미지 출처: https://specifishity.com/</figcaption>
</figure>

#### 코드 순서

먼저 적힌 코드가 우선적으로 스타일이 적용됩니다.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			p {
				color: blue;
			}
			p {
				color: red;
			}
		</style>
	</head>
	<body>
		<p>Hello World</p>
	</body>
</html>
```

<iframe
  src="/example/html/css_order.html"
  width="100%"
  height="220"
  loading="lazy"
  class="resultIframe"
></iframe>
