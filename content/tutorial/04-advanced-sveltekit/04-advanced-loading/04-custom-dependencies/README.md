---
title: Custom dependencies
---

`load` 함수 내에서 `fetch(url)`를 호출하면 `url`이 종속 항목으로 등록됩니다. 경우에 따라 `fetch`를 사용하는 것이 적절하지 않을 수 있습니다. 이 경우 [`depends(url)`](https://kit.svelte.dev/docs/load#invalidation-manual-invalidation)를 사용하여 종속성을 수동으로 지정할 수 있습니다. 기능.

`[a-z]+:` 패턴으로 시작하는 모든 문자열은 유효한 URL이므로 `data:now`와 같은 사용자 정의 무효화 키를 생성할 수 있습니다.

`fetch` 호출을 수행하지 않고 직접 값을 반환하도록 `src/routes/+layout.js`를 업데이트하고 `depends`를 추가합니다.

```js
/// file: src/routes/+layout.js
export async function load({ +++depends+++ }) {
	+++depends('data:now');+++

	return {
		now: +++Date.now()+++
	};
}
```

이제 `src/routes/[...timezone]/+page.svelte`에서 `invalidate` 호출을 업데이트합니다.

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data;

	onMount(() => {
		const interval = setInterval(() => {
			invalidate(+++'data:now'+++);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>
```
