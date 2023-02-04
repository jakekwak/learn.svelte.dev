---
title: Each blocks
---

데이터 목록을 반복해야 하는 경우 `each` 블록을 사용하세요.

```svelte
<ul>
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li>
	{/each}
</ul>
```

> 표현식 (이 경우 `cats`)은 배열 또는 배열과 유사한 객체 (즉 `length` 속성이 있음)가 될 수 있습니다. `each [...iterable]`을 사용하여 일반 이터러블을 반복할 수 있습니다.

다음과 같이 현재 _색인_ 을 두 번째 인수로 가져올 수 있습니다.

```svelte
{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
		{i + 1}: {cat.name}
	</a></li>
{/each}
```

원하는 경우, 분해(`each cats as { id, name }`)해서 사용하고 `cat.id` 및 `cat.name`을 `id` 및 `name`으로 바꿀 수 있습니다.
