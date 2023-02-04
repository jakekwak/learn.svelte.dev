---
title: Key blocks
---

키 블록은 식의 값이 변경될 때 내용을 파괴하고 다시 만듭니다. 이는 요소가 DOM에 들어가거나 나올 때만이 아니라 값이 변경될 때마다 전환을 재생하려는 경우에 유용합니다.

예를 들어 여기서는 로드 메시지가 변경될 때마다 `transition.js`에서 `typewriter` 전환을 재생하려고 합니다. `<p>` 요소를 키 블록으로 래핑합니다.

```svelte
+++{#key i}+++
	<p in:typewriter={{ speed: 10 }}>
		{messages[i] || ''}
	</p>
+++{/key}+++
```