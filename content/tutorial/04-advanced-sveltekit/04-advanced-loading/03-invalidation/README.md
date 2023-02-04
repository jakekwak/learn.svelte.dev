---
title: Invalidation
path: /Europe/London
---

사용자가 한 페이지에서 다른 페이지로 이동할 때 SvelteKit은 `load` 함수을 호출하지만 변경된 사항이 있다고 생각하는 경우에만 해당됩니다.

이 예에서 시간대 사이를 탐색하면 `src/routes/[...timezone]/+page.js`의 `load` 함수가 다시 실행됩니다. `params.timezone`이 유효하지 않기 때문입니다. 그러나 `src/routes/+layout.js`의 `load` 함수는 다시 실행되지 _않습니다_. SvelteKit에 관한 한 탐색에 의해 무효화되지 않았기 때문입니다.

[`invalidate(...)`](https://kit.svelte.dev/docs/modules#$app-navigation-invalidate) 함수를 사용하여 수동으로 무효화하여 문제를 해결할 수 있습니다. - 의존하는 모든 `load` 함수를 실행합니다. `src/routes/+layout.js`의 `load` 함수가 `fetch('/api/now')`를 호출하기 때문에 `/api/now`에 의존합니다.

`src/routes/[...timezone]/+page.svelte`에서 1초에 한 번씩 `invalidate('/api/now')`를 호출하는 `onMount` 콜백을 추가합니다.

```svelte
/// file: src/routes/[...timezone]/+page.svelte
<script>
	+++import { onMount } from 'svelte';+++
	+++import { invalidate } from '$app/navigation';+++

	export let data;

+++	onMount(() => {
		const interval = setInterval(() => {
			invalidate('/api/now');
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});+++
</script>

<h1>
	{new Intl.DateTimeFormat([], {
		timeStyle: 'full',
		timeZone: data.timezone
	}).format(new Date(data.now))}
</h1>
```

> 특정 URL이 아닌 패턴을 기반으로 무효화하려는 경우 `invalidate`에 함수를 전달할 수도 있습니다.
