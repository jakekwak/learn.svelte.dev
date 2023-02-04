---
title: Error pages
---

로드 함수 내에서 문제가 발생하면 SvelteKit이 오류 페이지를 렌더링합니다.

기본 오류 페이지는 다소 단조롭습니다. `src/routes/+error.svelte` 컴포넌트를 생성하여 사용자 정의할 수 있습니다.

```svelte
/// file: src/routes/+error.svelte
<script>
	import { page } from '$app/stores';

	const emojis = {
		// TODO add the rest!
		420: '🫠',
		500: '💥'
	};
</script>

<h1>{$page.status} {$page.error.message}</h1>
<span style="font-size: 10em">
	{emojis[$page.status] ?? emojis[500]}
</span>
```

> 우리는 `page` 스토어를 사용하고 있으며, 이에 대해서는 이후 장에서 자세히 알아볼 것입니다.

`+error.svelte` 구성 요소는 루트 `+layout.svelte` 내부에 렌더링됩니다. 보다 세분화된 `+error.svelte` 경계를 만들 수 있습니다.

```svelte
/// file: src/routes/expected/+error.svelte
<h1>this error was expected</h1>
```

이 컴포넌트는 `/expected`에 대해 렌더링되는 반면 루트 `src/routes/+error.svelte` 페이지는 발생하는 다른 모든 오류에 대해 렌더링됩니다.
