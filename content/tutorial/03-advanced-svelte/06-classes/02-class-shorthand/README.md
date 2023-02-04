---
title: Shorthand class directive
---

종종 클래스의 이름은 종속된 값의 이름과 동일합니다.

```svelte
<div class:big={big}>
	<!-- ... -->
</div>
```

이러한 경우 축약 양식(form)을 사용할 수 있습니다.

```svelte
<div class:big>
	<!-- ... -->
</div>
```
