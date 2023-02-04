---
title: Layout data
path: /blog
---

`+layout.svelte` 파일이 모든 자식 라우트에 대한 UI를 생성하는 것처럼 `+layout.server.js` 파일은 모든 자식 라우트에 대한 데이터를 로드합니다.

블로그 게시물 페이지에 '더 많은 게시물' 사이드바를 추가하고 싶다고 가정해 보겠습니다. `src/blog/+page.server.js`에서와 같이 `src/blog/[slug]/+page.server.js`의 `load` 함수에서 `summaries`를 반환할 수 있습니다. 그러나 그것은 반복적일 것입니다.

대신 `src/blog/+page.server.js`의 이름을 `src/blog/+layout.server.js`로 바꾸겠습니다. `/blog` 경로는 계속 작동합니다. `data.summaries`는 여전히 페이지에서 사용할 수 있습니다.

이제 게시물 페이지의 레이아웃을 만듭니다.

```svelte
/// file: src/routes/blog/[slug]/+layout.svelte
<script>
	export let data;
</script>

<div class="layout">
	<main>
		<slot />
	</main>

	<aside>
		<h2>More posts</h2>
		<ul>
			{#each data.summaries as { slug, title }}
				<li>
					<a href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>
```

레이아웃(및 그 아래 페이지)은 상위 `+layout.server.js`에서 `data.summaries`를 상속합니다.

한 게시물에서 다른 게시물로 이동할 때 게시물 자체에 대한 데이터만 로드하면 됩니다. 레이아웃 데이터는 여전히 유효합니다. 자세한 내용은 [무효화](https://kit.svelte.dev/docs/load#invalidation) 문서를 참조하세요.
