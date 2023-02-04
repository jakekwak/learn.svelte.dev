---
title: Updating arrays and objects
---

Svelte의 반응성은 할당에 의해 트리거되기 때문에 `push` 및 `splice`와 같은 배열 메서드를 사용해도 자동으로 업데이트되지 않습니다. 예를 들어 '번호 추가' 버튼을 클릭해도 현재 아무 작업도 수행되지 않습니다.

이 문제를 해결하는 한 가지 방법은 중복되지 않는 할당을 추가하는 것입니다:

```js
function addNumber() {
	numbers.push(numbers.length + 1);
	+++numbers = numbers;+++
}
```

그러나 더 관용적인 해결책이 있습니다.

```js
function addNumber() {
	numbers = +++[...numbers, numbers.length + 1];+++
}
```

유사한 패턴을 사용하여 `pop`, `shift`, `unshift` 및 `splice`를 대체할 수 있습니다.

배열 및 개체의 — 예를 들어 `obj.foo += 1` 또는 `array[i] = x` —  _속성_ 에 대한 할당은 값 자체에 대한 할당과 동일한 방식으로 작동합니다.



```js
function addNumber() {
	numbers[numbers.length] = numbers.length + 1;
}
```

간단한 경험 법칙: 업데이트된 변수의 이름은 할당의 왼쪽에 나타나야 합니다. 예를 들면 이것은...

```js
const foo = obj.foo;
foo.bar = 'baz';
```

...`obj = obj`로 후속 작업을 수행하지 않는 한 `obj.foo.bar`에서 반응성을 트리거하지 않습니다.
