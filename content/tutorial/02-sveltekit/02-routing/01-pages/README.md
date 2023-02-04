---
title: Pages
---

SvelteKit은 파일 시스템 기반 라우팅을 사용합니다. 즉, 앱의 _라우트_, 즉 사용자가 특정 URL로 이동할 때 앱이 수행해야 하는 작업은 코드베이스의 디렉터리에 의해 정의됩니다.

라우트는 `src/routes` 내에 있습니다. `+page.svelte` 파일이 포함된 모든 디렉토리는 앱에서 라우트를 생성합니다.

이 앱에는 현재 `/`에 매핑되는 `src/routes/+page.svelte`라는 하나의 라우트가 있습니다.

`/about`에 매핑되는 두 번째 라우트 `src/routes/about/+page.svelte`를 추가해 보겠습니다.

```svelte
/// file: src/routes/about/+page.svelte
<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>

<h1>about</h1>
<p>this is the about page.</p>
```

이제 `/`와 `/about` 사이를 탐색할 수 있습니다.

> 기존의 다중 페이지 앱과 달리 `/about`으로 이동하고 뒤로 이동하면 단일 페이지 앱처럼 현재 페이지의 콘텐츠가 업데이트됩니다. 이것은 빠른 서버 렌더링 시작과 즉각적인 탐색이라는 두 가지 장점을 모두 제공합니다. (이 동작은 [구성](https://kit.svelte.dev/docs/page-options)할 수 있습니다.)
