---
title: Statements
---

우리는 반응형 _값_ 을 선언하는 데 제한을 두지 않습니다. 임의의 _명령문_ 을 반응형으로 실행할 수도 있습니다. 예를 들어 `count` 값이 변경될 때마다 기록할 수 있습니다:

```js
let count = 0;

+++$: console.log(`the count is ${count}`);+++
```

명령문을 블록과 함께 쉽게 그룹화할 수 있습니다.

```js
$: +++{+++
	console.log(`the count is ${count}`);
	alert(`I SAID THE COUNT IS ${count}`);
+++}+++
```

`if` 블록과 같은 항목 앞에 `$:`를 넣을 수도 있습니다.

```js
$: +++if (count >= 10)+++ {
	alert('count is dangerously high!');
	count = 0;
}
```
