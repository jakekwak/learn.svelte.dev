---
title: Deferred transitions
---

Svelte 전환 엔진의 특히 강력한 기능은 전환을 _지연_하는 기능으로, 여러 요소 간에 조정될 수 있습니다.

할 일을 토글하면 반대 목록으로 보내는 이 한 쌍의 할 일 목록을 가져옵니다. 현실 세계에서 개체는 그렇게 작동하지 않습니다. 다른 위치에서 사라지고 다시 나타나는 대신 일련의 중간 위치를 통해 이동합니다. 모션을 사용하면 사용자가 앱에서 일어나는 일을 이해하는 데 큰 도움이 될 수 있습니다.

`crossfade` 함수를 사용하여 이 효과를 얻을 수 있습니다. transition.js는 `send` 및 `receive`라는 한 쌍의 전환을 생성합니다. 요소가 '전송'되면 '수신'되는 해당 요소를 찾고 해당 요소를 상대 위치로 변환하고 페이드 아웃하는 전환을 생성합니다. 요소가 '수신'되면 그 반대가 발생합니다. 대응 항목이 없으면 'fallback' 전환이 사용됩니다.

TodoList.svelte를 엽니다. 먼저 transition.js에서 `send` 및 `receive` 전환을 가져옵니다.

```svelte
<script>
	+++import { send, receive } from './transition.js';+++

	export let store;
	export let filter;
</script>
```

그런 다음 요소를 일치시키는 키로 `todo.id` 속성을 사용하여 `<label>` 요소에 추가합니다.

```svelte
<label
	+++in:receive={{ key: todo.id }}+++
	+++out:send={{ key: todo.id }}+++
>
```

이제 항목을 전환하면 새 위치로 부드럽게 이동합니다. 전환되지 않는 항목은 여전히 어색하게 이동합니다. 다음 장에서 수정할 수 있습니다.
