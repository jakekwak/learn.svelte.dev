---
title: Component events
---

컴포넌트는 이벤트를 전달할 수도 있습니다. 그렇게 하려면 이벤트 디스패처를 만들어야 합니다. `Inner.svelte`를 업데이트합니다:

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
```

> 컴포넌트가 처음 인스턴스화될 때 `createEventDispatcher`를 호출해야 합니다. — 내부에서 (예를들면 `setTimeout` 콜백) 나중에 할 수 없습니다.  이것은 `dispatch`를 컴포넌트 인스턴스에 연결합니다.

`App` 컴포넌트는 `on:message` 지시문 덕분에 `Inner` 컴포넌트가 보낸 메시지를 수신하고 있습니다. 이 지시문은 `on:` 접두사가 붙은 속성이며 그 뒤에 우리가 발송하는 이벤트 이름(이 경우 `message`)이 옵니다.

이 속성이 없으면 메시지는 계속 발송되지만 앱은 이에 반응하지 않습니다. `on:message` 속성을 제거하고 버튼을 다시 눌러 볼 수 있습니다.

> 이벤트 이름을 다른 것으로 변경할 수도 있습니다. 예를 들어 `Inner.svelte`에서 `dispatch('message')`를 `dispatch('myevent')`로 변경하고 `App.svelte` 컴포넌트에서 속성 이름을 `on:message`에서 `on:myevent`로 변경합니다.
