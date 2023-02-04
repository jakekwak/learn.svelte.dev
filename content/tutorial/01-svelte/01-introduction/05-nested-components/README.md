---
title: Nested components
---

전체 앱을 단일 컴포넌트에 넣는 것은 비실용적입니다. 대신 다른 파일에서 컴포넌트를 가져와 마크업에 포함할 수 있습니다.

`Nested.svelte`를 가져오는 `<script>` 태그를 추가합니다....

```svelte
+++<script>
	import Nested from './Nested.svelte';
</script>+++
```

...`<Nested />` 컴포넌트를 넣어봅니다..

```svelte
<p>This is a paragraph.</p>
+++<Nested />+++
```

`Nested.svelte`에 `<p>` 요소가 있더라도 `App.svelte`의 스타일이 누출되지 않는다는 점에 유의하세요.

> 컴포넌트 이름은 HTML 요소와 구별하기 위해 항상 대문자로 표시됩니다.
