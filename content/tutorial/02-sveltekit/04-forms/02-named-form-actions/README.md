---
title: Named form actions
---

단일 작업만 있는 페이지는 실제로 매우 드뭅니다. 대부분의 경우 한 페이지에 여러 작업이 필요합니다. 이 앱에서는 할 일을 만드는 것만으로는 충분하지 않습니다. 작업이 완료되면 삭제하고 싶습니다.

`기본` 작업을 이름이 지정된 `만들기` 및 `삭제` 작업으로 바꾸는 것으로 시작합니다.

```js
/// file: src/routes/+page.server.js
export const actions = {
	+++create+++: async ({ cookies, request }) => {
		const data = await request.formData();
		db.createTodo(cookies.get('userid'), data.get('description'));
	}+++,+++

+++	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		db.deleteTodo(cookies.get('userid'), data.get('id'));
	}+++
};
```

> 기본 작업은 명명된 작업과 공존할 수 없습니다.

`<form>` 요소에는 `<a>` 요소의 `href` 속성과 유사한 선택적 `action` 속성이 있습니다. 새로운 `create` 작업을 가리키도록 기존 양식을 업데이트합니다.

```svelte
/// file: src/routes/+page.svelte
<form method="POST" +++action="?/create"+++>
	<label>
		add a todo:
		<input name="description" />
	</label>
</form>
```

> `action` 속성은 모든 URL이 될 수 있습니다. 작업이 다른 페이지에서 정의된 경우 `/todos?/create`와 같은 URL이 있을 수 있습니다. 작업이 _이_ 페이지에 있으므로 경로 이름을 모두 생략할 수 있으므로 선행 `?` 문자가 표시됩니다.

다음으로, 고유하게 식별하는 숨겨진 `<input>`으로 완성된 각 할일에 대한 양식을 작성하려고 합니다.

```svelte
/// file: src/routes/+page.svelte
<ul>
	{#each data.todos as todo (todo.id)}
		<li class="todo">
+++			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={todo.id} />
				<button aria-label="Mark as complete">✔</button>+++
				{todo.description}
+++			</form>+++
		</li>
	{/each}
</ul>
```
