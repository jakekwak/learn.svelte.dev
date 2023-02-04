---
title: Page data
path: /blog
---

핵심적으로 SvelteKit의 작업은 세 가지로 요약됩니다.

1. **라우팅** - 들어오는 요청과 일치하는 라우트 파악
2. **로드 중** — 라우트에 필요한 데이터 가져오기
3. **렌더링** - 일부 HTML 생성(서버에서) 또는 DOM 업데이트(브라우저에서)

라우팅과 렌더링이 어떻게 작동하는지 살펴보았습니다. 중간 부분인 로딩에 대해 이야기해 봅시다.

앱의 모든 페이지는 `+page.svelte` 파일과 함께 `+page.server.js` 파일에서 `load` 함수를 선언할 수 있습니다. 파일 이름에서 알 수 있듯이 이 모듈은 클라이언트 측 탐색을 포함하여 서버에서만 실행됩니다. `src/routes/blog/+page.server.js` 파일을 추가하여 `src/routes/blog/+page.svelte`의 하드 코딩된 링크를 실제 블로그 게시물 데이터로 대체할 수 있습니다.

```js
/// file: src/routes/blog/+page.server.js
import { posts } from './data.js';

export function load() {
	return {
		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
```

> 튜토리얼을 위해 `src/routes/blog/data.js`에서 데이터를 가져옵니다. 실제 앱에서는 데이터베이스나 CMS에서 데이터를 로드할 가능성이 높지만 지금은 이렇게 하겠습니다.

`data` prop을 통해 `src/routes/blog/+page.svelte`에서 이 데이터에 액세스할 수 있습니다.

```svelte
+++<script>
	export let data;
</script>+++

<h1>blog</h1>

<ul>
---	<li><a href="/blog/one">one</a></li>
	<li><a href="/blog/two">two</a></li>
	<li><a href="/blog/three">three</a></li>---
+++	{#each data.summaries as { slug, title }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}+++
</ul>
```

이제 게시물 페이지에 대해 동일한 작업을 수행해 보겠습니다.

```js
/// file: src/routes/blog/[slug]/+page.server.js
import { posts } from '../data.js';

export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	return {
		post
	};
}
```

```svelte
/// file: src/routes/blog/[slug]/+page.svelte
+++<script>
	export let data;
</script>+++

---<h1>blog post</h1>---
+++<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>+++
```

주의해야 할 마지막 세부 사항이 있습니다. 사용자가 `/blog/nope`와 같은 유효하지 않은 라우트 이름을 방문할 수 있으며 이 경우 404 페이지로 응답해야 합니다.

```js
/// file: src/routes/blog/[slug]/+page.server.js
+++import { error } from '@sveltejs/kit';+++
import { posts } from '../data.js';

export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	+++if (!post) throw error(404);+++

	return {
		post
	};
}
```

이후 장에서 오류 처리에 대해 자세히 알아볼 것입니다.
