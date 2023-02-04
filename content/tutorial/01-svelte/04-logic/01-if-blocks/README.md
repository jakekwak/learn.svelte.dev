---
title: If blocks
---

HTML에는 조건문 및 루프와 같은 _논리_ 를 표현하는 방법이 없습니다. Svelte는 있습니다.

일부 마크업을 조건부로 렌더링하기 위해 `if` 블록으로 래핑합니다.

```svelte
+++{#if user.loggedIn}+++
	<button on:click={toggle}>
		Log out
	</button>
+++{/if}+++

+++{#if !user.loggedIn}+++
	<button on:click={toggle}>
		Log in
	</button>
+++{/if}+++
```

사용해 보십시오. 컴포넌트를 업데이트하고 버튼을 클릭하십시오.
