---
title: onMount
---

> 이 연습의 코드는 현재 작동하지 않습니다. 대신 이전 튜토리얼로 전환할 수 있습니다: https://svelte.dev/tutorial/onmount

모든 컴포넌트에는 생성될 때 시작되고 소멸될 때 끝나는 _수명 주기_ 가 있습니다. 수명 주기 동안 중요한 순간에 코드를 실행할 수 있는 몇 가지 기능이 있습니다.

가장 자주 사용하게 될 것은 `onMount`로 컴포넌트가 처음 DOM에 렌더링된 후에 실행됩니다.

네트워크를 통해 일부 데이터를 로드하는 `onMount` 핸들러를 추가합니다.

```svelte
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});
</script>
```

> 서버 측 렌더링(SSR) 때문에 `<script>`의 최상위 수준이 아닌 `onMount`에 `fetch`를 넣는 것이 좋습니다. `onDestroy`를 제외하고 수명 주기 함수는 SSR 중에 실행되지 않습니다. 즉, 컴포넌트가 DOM에 마운트된 후 느리게 로드되어야 하는 데이터를 가져오는 것을 피할 수 있습니다.

콜백이 `setTimeout`이 아닌 컴포넌트 인스턴스에 바인딩되도록 컴포넌트가 초기화되는 동안 수명 주기 함수를 호출해야 합니다.

`onMount` 콜백이 반환한 함수는, 컴포넌트가 소멸될 때 해당 함수가 호출될 수 있습니다.
