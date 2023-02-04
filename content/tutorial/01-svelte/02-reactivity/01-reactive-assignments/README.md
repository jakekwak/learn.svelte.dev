---
title: Assignments
---

Svelte의 중심에는 DOM을 애플리케이션 상태와 - 예를 들어 이벤트에 대한 응답으로 - 동기화 상태로 유지하기 위한 강력한 `반응성` 시스템이 있습니다.

이를 시연하려면, 먼저 이벤트 핸들러를 연결해야 합니다. ([나중에](/tutorial/dom-events) 자세히 알아보겠습니다)

```svelte
<button +++on:click={increment}+++>
```

`increment` 함수 내에서 `count` 값을 변경하기만 하면 됩니다.

```js
function increment() {
	+++count += 1;+++
}
```

Svelte는 DOM을 업데이트해야 한다고 알려주는 일부 코드를 사용하여, 이 할당을 '계측'합니다.
