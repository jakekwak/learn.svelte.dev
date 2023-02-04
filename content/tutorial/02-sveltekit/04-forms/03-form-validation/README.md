---
title: Validation
---

사용자는 기회가 주어지면 모든 종류의 무의미한 데이터를 제출하는 장난꾸러기 무리입니다. 혼돈을 일으키지 않도록 양식 데이터의 유효성을 검사하는 것이 중요합니다.

첫 번째 방어선은 브라우저의 [내장 양식 유효성 검사](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation)입니다. 예를 들어 `<input>`을 필요에 따라 표시합니다.

```svelte
<form method="POST" action="?/create">
	<label>
		Add a todo
		<input
			name="description"
			+++required+++
		/>
	</label>
</form>
```

`<input>`이 비어 있는 동안 Enter 키를 눌러 보십시오.

이러한 종류의 검증은 도움이 되지만 불충분합니다. 일부 유효성 검사 규칙(예: 고유성)은 `<input>` 속성을 사용하여 표현할 수 없으며 어떤 경우에도 사용자가 엘리트 해커인 경우 브라우저의 devtools를 사용하여 속성을 삭제할 수 있습니다. 이러한 종류의 헛소리를 방지하려면 항상 서버측 유효성 검사를 사용해야 합니다.

`src/lib/server/database.js`에서 설명이 존재하고 고유한지 확인하십시오.

```js
/// file: src/lib/server/database.js
export function createTodo(userid, description) {
+++	if (description === '') {
		throw new Error('todo must have a description');
	}+++

	if (!db.has(userid)) {
		db.set(userid, []);
	}

	const todos = db.get(userid);

+++	if (todos.find((todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}+++

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}
```

중복 할 일을 제출해 보세요. 이런! SvelteKit은 친숙하지 않은 오류 페이지로 안내합니다. 서버에서 'todos must be unique' 오류가 표시되지만 SvelteKit은 종종 민감한 데이터를 포함하는 예기치 않은 오류 메시지를 사용자에게 숨깁니다.

같은 페이지에 머물면서 사용자가 수정할 수 있도록 무엇이 잘못되었는지 표시하는 것이 훨씬 낫습니다. 이를 위해 `fail` 함수를 사용하여 적절한 HTTP 상태 코드와 함께 작업에서 데이터를 반환할 수 있습니다.

```js
/// file: src/routes/+page.server.js
+++import { fail } from '@sveltejs/kit';+++
import * as db from '$lib/server/database.js';

export function load({ cookies }) {...}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();

+++		try {+++
			db.createTodo(cookies.get('userid'), data.get('description'));
+++		} catch (error) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}+++
	}
```

`src/routes/+page.svelte`에서 양식 제출 후에만 채워지는 `form` prop을 통해 반환된 값에 액세스할 수 있습니다.

```svelte
/// file: src/routes/+page.svelte
<script>
	export let data;
	+++export let form;+++
</script>

<h1>todos</h1>

+++{#if form?.error}
	<p class="error">{form.error}</p>
{/if}+++

<form method="POST" action="?/create">
	<label>
		add a todo:
		<input
			name="description"
			+++value={form?.description ?? ''}+++
			required
		/>
	</label>
</form>
```

> 또한 `fail`로 — 예를 들어 'success!' 데이터 저장 시 메시지 — 래핑하지 _않고_ 작업에서 데이터를 반환할 수 있으며 `form` 소품을 통해 사용할 수 있습니다.
