---
title: Route parameters
path: /blog
---

동적 매개변수로 경로를 생성하려면 유효한 변수 이름 주위에 대괄호를 사용하십시오. 예를 들어 `src/routes/blog/[slug]/+page.svelte`와 같은 파일은 `/blog/one`, `/blog/two`, `/blog/three` 등과 일치하는 경로를 생성합니다. 에.

해당 파일을 생성해 보겠습니다.

```svelte
/// file: src/routes/blog/[slug]/+page.svelte
<h1>blog post</h1>
```

이제 `/blog` 페이지에서 개별 블로그 게시물로 이동할 수 있습니다. 다음 장에서는 콘텐츠를 로드하는 방법을 살펴보겠습니다.

> 여러 경로 매개변수가 하나 이상의 정적 문자로 구분되는 한 하나의 URL 세그먼트 _내_ 에 나타날 수 있습니다. `foo/[bar]x[baz]`는 `[bar]` 및 `[baz]`가 동적 매개변수인 유효한 라우트입니다.
