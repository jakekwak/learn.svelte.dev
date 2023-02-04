---
title: The animate directive
---

[이전 장](/tutorial/deferred-transitions)에서는 지연 전환을 사용하여 요소가 한 할일 목록에서 다른 목록으로 이동할 때 움직임의 착시를 만들었습니다.

환상을 완성하려면 전환되지 _않는_ 요소에도 동작을 적용해야 합니다. 이를 위해 'animate' 디렉티브를 사용합니다.

먼저, `flip` 함수(flip는 ['First, Last, Invert, Play'](https://aerotwist.com/blog/flip-your-animations/)를 나타냄)를 `svelte/animate`에서 `TodoList.svelte`로 가져옵니다.

```svelte
<script>
	+++import { flip } from 'svelte/animate';+++
	import { send, receive } from './transition.js';

	export let store;
	export let filter;
</script>
```

그런 다음 `<label>` 요소에 추가합니다.

```svelte
<label
	in:receive={{ key: todo.id }}
	out:send={{ key: todo.id }}
	+++animate:flip+++
>
```

이 경우 이동이 약간 느리므로 `duration` 매개변수를 추가할 수 있습니다.

```svelte
<label
	in:receive={{ key: todo.id }}
	out:send={{ key: todo.id }}
	animate:flip+++={{ duration: 200 }}+++
>
```

> `duration`은 `d => milliseconds` 함수일 수도 있습니다. 여기서 `d`는 요소가 이동해야 하는 픽셀 수입니다.

모든 전환 및 애니메이션은 JavaScript가 아닌 CSS로 적용되므로 기본 스레드를 차단(또는 차단)하지 않습니다.
