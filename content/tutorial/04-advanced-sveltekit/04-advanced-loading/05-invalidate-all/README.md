---
title: invalidateAll
---

마지막으로 `invalidateAll()`이라는 핵 옵션이 있습니다. 의존하는 것과 관계없이 현재 페이지에 대한 모든 `로드` 기능을 무차별적으로 다시 실행합니다.

이전 연습에서 `src/routes/[...timezone]/+page.svelte`를 업데이트합니다.

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	import { onMount } from 'svelte';
	import { +++invalidateAll+++ } from '$app/navigation';

	export let data;

	onMount(() => {
		const interval = setInterval(() => {
			+++invalidateAll();+++
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>
```

`src/routes/+layout.js`의 `depends` 호출은 더 이상 필요하지 않습니다.

```js
/// file: src/routes/+layout.js
export async function load(---{ depends }---) {
	---depends('data:now');---

	return {
		now: Date.now()
	};
}
```

> `invalidate(() => true)`와 `invalidateAll`은 같지 _않습니다_. `invalidateAll`은 또한 `invalidate(() => true)`가 하지 않는 `url` 종속성 없이 `load` 함수를 다시 실행합니다.
