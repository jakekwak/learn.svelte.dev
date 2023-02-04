---
title: Layouts
---

앱의 다른 라우트는 종종 공통 UI를 공유합니다. 각 `+page.svelte` 컴포넌트에서 반복하는 대신 동일한 디렉터리의 모든 경로에 적용되는 `+layout.svelte` 구성 요소를 사용할 수 있습니다.

이 앱에는 동일한 탐색 UI를 포함하는 `src/routes/+page.svelte` 및 `src/routes/about/+page.svelte`의 두 가지 라우트가 있습니다. 새 파일 `src/routes/+layout.svelte`를 만들어 봅시다...

```diff
src/routes/
├ about/
│ └ +page.svelte
+├ +layout.svelte
└ +page.svelte
```

...복제된 콘텐츠를 `+page.svelte` 파일에서 새 `+layout.svelte` 파일로 이동합니다. `<slot />` 요소는 페이지 콘텐츠가 렌더링되는 위치입니다.

```svelte
/// file: src/routes/+layout.svelte
<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>

<slot />
```

`+layout.svelte` 파일은 형제 `+page.svelte`(존재하는 경우)를 포함하여 모든 하위 경로에 적용됩니다. 레이아웃을 임의의 깊이로 중첩할 수 있습니다.
