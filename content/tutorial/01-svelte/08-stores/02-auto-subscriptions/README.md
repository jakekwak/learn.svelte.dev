---
title: Auto-subscriptions
---

이전 예제의 앱은 작동하지만 미묘한 버그가 있습니다. 스토어가 구독(subscribe)되지만 구독 취소(unsubscribe)되지는 않습니다. 컴포넌트가 여러 번 인스턴스화되고 파괴된 경우 _메모리 누수_ 가 발생합니다.

`App.svelte`에서 `unsubscribe`를 선언하여 시작합니다.

```js
const unsubscribe = count.subscribe((value) => {
	count_value = value;
});
```

> `subscribe` 메서드를 호출하면 `unsubscribe` 함수가 반환됩니다.

이제 `unsubscribe`를 선언했지만, 예를 들어 `onDestroy` [수명 주기 후크](/tutorial/ondestroy)를 통해 여전히 호출해야 합니다.

```svelte
<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let count_value;

	const unsubscribe = count.subscribe(value => {
		count_value = value;
	});

	onDestroy(unsubscribe);
</script>

<h1>The count is {count_value}</h1>
```

그러나 특히 컴포넌트가 여러 스토어에 구독하는 경우 약간의 상용구가 나오기 시작합니다. 대신, Svelte는 트릭을 사용합니다. 스토어 이름 앞에 `$`를 붙여 스토어 값을 참조할 수 있습니다.

```svelte
<script>
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

> 자동 구독은 컴포넌트의 최상위 범위에서 선언(또는 가져오기)된 스토어 변수에서만 작동합니다.

마크업 내에서 `$count`를 사용하는 것에 국한되지 않고 이벤트 핸들러나 반응성 선언과 같은 `<script>`에서도 사용할 수 있습니다.

> `$`로 시작하는 모든 이름은 스토어 값을 참조하는 것으로 간주됩니다. 이것은 사실상 예약된 문자입니다 — Svelte는 `$` 접두어로 자신의 변수를 선언하는 것을 방지합니다.
