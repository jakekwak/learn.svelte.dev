---
title: Keyed each blocks
---

기본적으로 `each` 블록의 값을 수정하면 블록 _끝_ 에 항목이 추가 및 제거되고 변경된 모든 값이 업데이트됩니다. 그것은 당신이 원하는 것이 아닐 수도 있습니다.

이유를 설명하는 것보다 보여주는 것이 더 쉽습니다. **Remove first thing** 버튼을 몇 번 클릭하면 어떤 일이 발생하는지 확인하십시오. 첫 번째 `<Thing>` 컴포넌트가 제거되지만 _마지막_ DOM 노드도 제거됩니다. 그런 다음 나머지 DOM 노드에서 `name` 값을 업데이트(apple이 없어짐)하지만 이모티콘은 업데이트하지 않습니다(🥚가 없어짐).

대신 첫 번째 `<Thing>` 컴포넌트와 해당 DOM 노드만 제거하고 나머지는 그대로 두려고 합니다.

이를 위해 `each` 블록에 대한 고유 식별자(또는 "키")를 지정합니다.

```svelte
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

여기서 `(thing.id)`는 _키_ 이며 컴포넌트가 업데이트될 때 변경할 DOM 노드를 파악하는 방법을 Svelte에 알려줍니다.

> Svelte는 내부적으로 `Map`을 사용하므로 모든 개체를 키로 사용할 수 있습니다. 즉, `(thing.id)` 대신 `(thing)`을 사용할 수 있습니다. 그러나 일반적으로 문자열이나 숫자를 사용하는 것이 더 안전합니다. 예를 들어 API 서버에서 최신 데이터로 업데이트할 때 ID가 참조 동등성 없이 지속됨을 의미하기 때문입니다.
