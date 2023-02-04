---
title: $env/static/public
---


일부 환경 변수는 브라우저에 안전하게 _노출될_&nbsp; 수 있습니다. 이들은 `PUBLIC_` 접두사가 있는 개인 환경 변수와 구별됩니다.

`.env`의 공개 환경 변수 두개에 값을 추가합니다.

```env
PUBLIC_THEME_BACKGROUND=+++"steelblue"+++
PUBLIC_THEME_FOREGROUND=+++"bisque"+++
```

그런 다음 `src/routes/+page.svelte`로 가져옵니다.

```svelte
/// file: src/routes/+page.svelte
<script>
---	const PUBLIC_THEME_BACKGROUND = 'white';
	const PUBLIC_THEME_FOREGROUND = 'black';---
+++	import {
		PUBLIC_THEME_BACKGROUND,
		PUBLIC_THEME_FOREGROUND
	} from '$env/static/public';+++
</script>
```
