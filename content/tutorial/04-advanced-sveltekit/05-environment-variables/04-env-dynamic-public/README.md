---
title: $env/dynamic/public
---

[개인 환경 변수](/tutorial/env-static-private)와 마찬가지로 가능하면 정적 값을 사용하는 것이 좋지만 필요한 경우 동적 값을 대신 사용할 수 있습니다.

```svelte
<script>
	import { +++env+++ } from '$env/+++dynamic+++/public';
</script>

<main
	style:background={+++env.+++PUBLIC_THEME_BACKGROUND}
	style:color={+++env.+++PUBLIC_THEME_FOREGROUND}
>
	{+++env.+++PUBLIC_THEME_FOREGROUND} on {+++env.+++PUBLIC_THEME_BACKGROUND}
</main>
```
