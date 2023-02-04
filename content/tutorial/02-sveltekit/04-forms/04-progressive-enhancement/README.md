---
title: Progressive enhancement
---

`<form>`을 사용하기 때문에 사용자에게 JavaScript가 없어도 앱이 작동합니다([생각보다 자주 발생](https://kryogenix.org/code/browser/everyonehasjs.html). )). 그것은 우리 앱이 탄력적이라는 것을 의미하기 때문에 훌륭합니다.

대부분의 경우 사용자는 JavaScript를 _사용합니다_. 이러한 경우 SvelteKit이 클라이언트 측 라우팅을 사용하여 `<a>` 요소를 점진적으로 향상시키는 것과 같은 방식으로 경험을 _점진적으로 향상_ 시킬 수 있습니다.

`$app/forms`에서 `enhance` 기능 가져오기...

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { enhance } from '$app/forms';+++

	export let data;
	export let form;
</script>
```

...`use:enhance` 지시문을 `<form>` 요소에 추가합니다.

```svelte
<form method="POST" action="?/create" +++use:enhance+++>
```

```svelte
<form method="POST" action="?/delete" +++use:enhance+++>
```

그게 전부입니다! 이제 JavaScript가 활성화되면 `use:enhance`는 전체 페이지 다시 로드를 제외하고 브라우저 기본 동작을 에뮬레이트합니다. 그것은:

- `form` 소품 업데이트
- 성공적인 응답에 대한 모든 데이터를 무효화하여 '로드' 기능을 다시 실행합니다.
- 리디렉션 응답에서 새 페이지로 이동
- 오류가 발생하면 가장 가까운 오류 페이지를 렌더링합니다.

이제 페이지를 다시 로드하는 대신 업데이트하므로 전환과 같은 기능을 사용할 수 있습니다.

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { fly, slide } from 'svelte/transition';+++
	import { enhance } from '$app/forms';

	export let data;
	export let form;
</script>
```

```svelte
<li class="todo" +++in:fly={{ y: 20 }} out:slide+++>...</li>
```
