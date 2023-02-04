---
title: Default values
---

`Nested.svelte`에서 props의 기본값을 쉽게 지정할 수 있습니다.

```svelte
<script>
	export let answer +++= 'a mystery'+++;
</script>
```

이제 `answer` prop _없이_ 두 번째 컴포넌트를 추가하면 기본값으로 돌아갑니다.

```svelte
<Nested answer={42}/>
+++<Nested/>+++
```
