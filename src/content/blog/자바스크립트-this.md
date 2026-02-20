---
title: "자바스크립트 this"
isWarning: true
description: "자바스크립트에서 this는 무엇일까?"
pubDate: "2024-02-07"
heroImage: "/images/post/2024/2024_02_07_js.png"
category: "자바스크립트"
ref:
  [
    "https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-this-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    "https://seungtaek-overflow.tistory.com/21",
    "https://hanamon.kr/javascript-this란-무엇일까/https://hanamon.kr/javascript-this%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C/",
    https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb,
  ]
---

this 자체를 해석하면 ‘이것’ 이라는 뜻입니다.

자바스크립트에서의 this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 **자기 참조 변수** 입니다.

## this 출력해보기

```js
this;
```

![Untitled](https://lily-periwinkle-8d2.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F178f7446-7b4d-405a-9985-5c11d9a365de%2F1963c433-2f80-463e-b212-d6434d02b7c1%2FUntitled.png?table=block&id=9bdc195e-6919-46f3-aa96-50d06144236f&spaceId=178f7446-7b4d-405a-9985-5c11d9a365de&width=1840&userId=&cache=v2)

가리키는 대상이 없으면 `this` 는 기본적으로 window 객체를 가리킵니다.

```js
var ga = "Global variable";
console.log(this.ga); // === window.ga

function a() {
  console.log(this);
}
a(); // Window {}
```

1. 전역변수 선언 후, this를 붙여서 출력해보면 전역변수를 가리킵니다.
2. 일반 함수 내에서 혼자 this를 선언하면 window 객체를 가리킵니다.

## 엄격모드에서의 this

```js
"use strict";
window.a = 20;

function foo() {
  console.log(this.a);
}

foo(); // TypeError: Cannot read property 'a' of undefined
```

엄격모드 (strict) 에서는 기본 바인딩 대상에서 **전역 객체는 제외** 되기 때문에,

전역객체를 참조해야할 this가 있다면 그 값은 undefined가 됩니다.

## 객체 메서드에서의 this

```js
var obj = {
  a: function () {
    console.log(this);
  },
};
obj.a(); // obj
```

객체 메서드 a 안의 this는 **객체 obj** 를 가리킵니다.

⇒ 객체의 메서드를 호출할 때 this를 내부적으로 바꿔주기 때문입니다.

```js
var a2 = obj.a;
a2(); // window
```

위와같이 작성할 경우 출력값은 window가 됩니다.

⇒ a2는 obj에 있는 a를 꺼내온 것이기 때문에, 더 이상 obj의 메서드가 아니고 변수에 담긴 일반 함수로 처리됩니다.

호출할 때, 호출하는 함수가 객체의 메서드인지 그냥 일반 함수인지가 중요합니다.

## 함수 호출 방식과 this 바인딩

자바스크립트의 this는 **함수가 어떻게 호출되었는지**에 따라 **this에 바인딩할 객체가 동적으로 결정** 됩니다.

### 함수 호출 방식

- 함수 호출
- 메소드 호출
- 생성자 함수 호출
- 콜백 호출
- apply, call, bind 호출

### 1. 함수 호출

일반 전역함수는 물론이고, 내부 함수의 경우도 this는 **외부함수가 아닌 전역객체에 바인딩** 됩니다.

```js
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

객체 메서드의 **내부함수** 일경우에도 this는 전역객체에 바인딩됩니다.

```js
var value = 1;

var obj = {
  value: 100,
  foo: function () {
    console.log("foo's this: ", this); // obj
    console.log("foo's this.value: ", this.value); // 100
    function bar() {
      /* 내부함수 */
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
    bar();
  },
};

obj.foo();
```

콜백함수의 경우에도 this는 전역객체에 바인딩됩니다.

```js
var value = 1;

var obj = {
  value: 100,
  foo: function () {
    setTimeout(function () {
      /* 콜백함수 */ console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

obj.foo();
```

⇒ 내부함수의 this는 어디에 선언되었든 관계없이 전역객체를 바인딩합니다.

내부함수의 this가 전역객체를 참조하는 것을 피하려면 다음과 같은 방법들을 사용 해야합니다.

- `var that = this` 를 해서 this를 변수에 저장해서 사용
- call, bind, apply로 this 설정
- 화살표 함수 `=>` 사용

```js
var value = 1;

var obj = {
  value: 100,
  foo: function () {
    var that = this; // Workaround : this === obj

    console.log("foo's this: ", this); // obj
    console.log("foo's this.value: ", this.value); // 100
    function bar() {
      //console.log("bar's this: ",  this); // window
      // console.log("bar's this.value: ", this.value); // 1

      console.log("bar's that: ", that); // obj
      console.log("bar's that.value: ", that.value); // 100
    }
    bar();
  },
};

obj.foo();
```

### 2. 메소드 호출

함수가 객체의 프로퍼티 값이면 메소드로서 호출됩니다.

이때, 메소드 내부의 this는 **해당 메소드를 소유한 객체**, 즉 해당 메소드를 호출한 객체에 바인딩됩니다.

```js
var obj1 = {
  name: "Lee",
  sayName: function () {
    console.log(this.name); //해당 this는 obj1 을 가리킵니다.
  },
};

var obj2 = {
  name: "Kim",
};

obj2.sayName = obj1.sayName;
//obj1의 sayName 메서드를 obj2에 할당합니다.
// 이로써 obj2의 sayName은 obj1의 sayName 함수를 참조합니다.

obj1.sayName(); // Lee
obj2.sayName(); // Kim
```

### 3. 프로토타입

프로토타입 객체 메소드 내부에서 사용된 this도 일반 메소드 방식과 마찬가지로,

해당 메소드를 호출한 **프로토타입 객체** 에 바인딩됩니다.

```jsx
// (1) 여기서 this의 프로퍼티를 찾습니다.
function Person(name) {
  this.name = name;
}

// (2) Person 객체 프로토타입에 getName 이라는 함수를 정의합니다.
Person.prototype.getName = function () {
  return this.name;
};

// (3) 없으면 여기서 찾습니다. 생성자 함수에 인자로 Lee가 들어왔으니 this의 프로퍼티를 찾았습니다!
var me = new Person("Lee");
console.log(me.getName());
// Lee

// (4) 프로토타입에서 name 프로퍼티를 찾습니다. 찾았으니 반환합니다.
Person.prototype.name = "Kim";
console.log(Person.prototype.getName());
// Kim
```

1. 첫번째로 Person 이라는 객체를 만듭니다. 매개변수로 name을 전달합니다.

⇒ 아직 매개변수로 받은게 없기 때문에, name이라는 프로퍼티는 없는 상태입니다.
⇒ 여기에 name 프로퍼티가 없으니 다른 곳에서 찾습니다.

1. Person 객체 프로토 타입에 name을 반환하는 함수인 getName을 정의합니다.

⇒ Person 객체에서 getName 함수를 사용할 수 있게 됩니다.
⇒ Person 객체의 this가 무엇인지 알기위해 정의하는 함수이므로 this와는 관계가 없습니다.

1.  new 생성자로 객체를 생성 (실체화) 하여 me 변수에 저장합니다.

⇒ 인자로 Lee가 들어갔기 때문에, name 프로퍼티는 Lee가 됩니다.
⇒ 바인딩 된 프로토타입 객체에서 찾다가 없으면, 프로토타입 체인에 의해서 new로 생성 된 객체에서 찾습니다. 여기서 해당 프로퍼티를 찾았기 때문에 Lee를 반환합니다.

1. Person 객체 프로토타입에 name이라는 프로퍼티를 직접 추가했습니다.

⇒ 직접 추가해주었기 때문에 name 이라는 프로퍼티를 찾았으므로 Kim을 반환합니다.

### 4. 생성자 함수 호출

자바스크립트의 생성자 함수는 말 그대로 객체를 생성합니다.

기존 함수에 `new` 를 붙이고 호출하면 해당 함수는 생성자 함수로 동작합니다.

이는 반대로, 일반 함수에 `new` 를 붙여서 호출하면 생성자 함수로 동작할 수 있다는 의미이기도 합니다.

따라서, 일반적으로 생성자 함수명은 **첫 문자를 대문자로 기술** 하여 혼란을 방지합니다.

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

var me = new Person("Lee");
console.log(me); // Person {name: "Lee"}

// new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
var you = Person("Kim");
console.log(you); // undefined
```

생성자 함수에서의 this는 생성자를 통해 생성된 인스턴스 (객체) 가 됩니다.

```jsx
function Person(name) {
  this.name = name;
}

var you = new Person("Kim");
console.log(you.name); //Kim
```

1. Person 함수가 new와 함께 호출되는 순간 새로운 객체가 생성되고, **새로 생성 된 객체가 this로 바인딩** 됩니다.
2. 그리고 생성된 객체의 name이라는 프로퍼티에 인자로 받아온 Kim 이라는 문자열이 할당되고,
   해당 객체는 you라는 변수에 할당됩니다.
3. 출력해보면 Kim이 나옵니다.

### 5. 콜백 함수 호출

```jsx
let userData = {
  signUp: "2020-10-06 15:00:00",
  id: "minidoo",
  name: "Not Set",
  setName: function (firstName, lastName) {
    this.name = firstName + " " + lastName;
  },
};

function getUserName(firstName, lastName, callback) {
  callback(firstName, lastName);
}

getUserName("PARK", "MINIDDO", userData.setName);

console.log("1: ", userData.name); // Not Set
console.log("2: ", window.name); // PARK MINIDDO
```

콘솔에 userData의 name 값을 출력해보면, PARK MINIDDO 가 아닌 Not Set이 출력됩니다.

`setName()` 함수가 실행되기 전에 name 값이 나오게 되는데, 이는 `getUserName` 함수가 전역 함수이기 때문에 전역객체에 접근해야 원하는 값이 나오는 것입니다.

userData.setName 을 인자로 넘겨줄 때 **Call by value** 로 가는걸 명심해야 합니다.

즉, 함수가 복사되어 전역 함수인 getUserName의 callback 매개변수로 담기게 되기 때문에

setName의 this는 전역객체를 가리키게 됩니다.

다음처럼 call이나 apply로 this를 보호할 수 있습니다.

```jsx
function getUserName(firstName, lastName, callback) {
  callback.call(userData, firstName, lastName);
}

getUserName("PARK", "MINIDDO", userData.setName);

console.log("1: ", userData.name); // PARK MINIDDO
console.log("2: ", window.name); // 빈칸. 왜냐하면 변수가 없으니까
```

### 6. apply/call/bind 호출

```jsx
var name = "window name";

function Person(name) {
  this.name = name;
}

Person.prototype.doSomething = function (callback) {
  if (typeof callback == "function") {
    // --------- 1
    callback();
  }
};

function foo() {
  console.log(this.name); // --------- 2
}

var p = new Person("Lee");
p.doSomething(foo); // window name
```

1의 시점에서 this는 Person 객체이지만, 2의 시점에서의 this는 전역 객체를 가리킵니다.

기본적으로 **콜백함수 내부의 this는 window** 를 가리키기 때문에

다음처럼 콜백함수 내부 this를 doSomething 함수기준으로 한 this로 바꿔주어야 합니다.

```jsx
// --------- 1
callback.bind(this)();
```

## 이벤트 리스너

```jsx
document.body.onclick = function () {
  console.log(this); // <body>
};
```

위 코드는 객체 메서드나 생성자 함수도 아닌 일반 함수인데 this를 출력해보면 window가 아닌 `<body>` 가 출력됩니다.

이 부분은 이벤트가 발생할 때 **내부적으로 this가 바뀐 것** 입니다.

```jsx
$("div").on("click", function () {
  console.log(this);
});
```

위와 같은 제이쿼리 코드에서의 this는 클릭한 div가 됩니다.

내부적으로 함수를 호출할 때 this를 바꿔버렸기 때문에 직접 this를 출력해보면서 해야 합니다.

```jsx
$("div").on("click", function () {
  console.log(this); // <div>
  function inner() {
    console.log("inner", this); // inner Window
  }
  inner();
});
```

이벤트 함수 안에있는 this는 의도대로 div를 출력하지만,

inner 함수 안에있는 this는 전역객체 (window) 를 출력합니다.

이는 위에도 말했듯이, 내부 함수의 this는 전역객체를 가리키게 됩니다.

이를 해결하려면, this를 변수해 저장하거나 화살표 함수를 써야 합니다.

```jsx
$("div").on("click", function () {
  console.log(this); // <div>
  var that = this; // <-------------------------------------------------------------
  function inner() {
    console.log("inner", that); // inner <div>
  }
  inner();
});
```

```jsx
$("div").on("click", function () {
  console.log(this); // <div>
  const inner = () => {
    console.log("inner", this); // inner <div>
  };
  inner();
});
```

화살표 함수는 this로 전역 객체 대신 상위 함수의 this를 가져옵니다.

## 체이닝

함수에서 this를 리턴하면 자기 객체를 가리키기 때문에 연속으로 이어서 호출할 수 있습니다.

```jsx
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert(this.step);
  },
};

ladder.up().up().down().up().down().showStep(); // 1
```
