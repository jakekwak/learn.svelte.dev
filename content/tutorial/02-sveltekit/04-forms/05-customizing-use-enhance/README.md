---
title: Customizing use:enhance
---

`use:enhance`를 사용하면 브라우저의 기본 동작을 에뮬레이션하는 것 이상을 수행할 수 있습니다. 콜백을 제공함으로써 **보류 상태** 및 **낙관적 UI**와 같은 것을 추가할 수 있습니다. 두 작업에 인위적인 지연을 추가하여 느린 네트워크를 시뮬레이션해 보겠습니다.

```js
/// file: src/routes/+page.server.js
export const actions = {
	create: async ({ cookies, request }) => {
		+++await new Promise((fulfil) => setTimeout(fulfil, 1000));+++
		...
	},

	delete: async ({ cookies, request }) => {
		+++await new Promise((fulfil) => setTimeout(fulfil, 1000));+++
		...
	}
};
```

항목을 생성하거나 삭제할 때 이제 UI가 업데이트되기까지 1초가 걸리므로 사용자는 항목이 어떻게든 엉망이 되었는지 궁금해합니다. 이를 해결하려면 로컬 상태를 추가하십시오...

```svelte
/// file: src/routes/+page.svelte
<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

+++	let creating = false;
	let deleting = [];+++
</script>
```

...첫 번째 `use:enhance` 내부에서 `creating`을 토글합니다.

```svelte
<form
	method="POST"
	action="?/create"
+++	use:enhance={() => {
		creating = true;

		return async ({ update }) => {
			await update();
			creating = false;
		};
	}}+++
>
	<label>
		+++{creating? 'saving...' : 'add a todo:'}+++
		<input
			+++disabled={creating}+++
			name="description"
			value={form?.description ?? ''}
			required
		/>
	</label>
</form>
```

삭제의 경우, 서버가 유효성을 검사할 때까지 실제로 기다릴 필요가 없습니다. UI를 즉시 업데이트하면 됩니다.

```svelte
<ul>
	{#each +++data.todos.filter((todo) => !deleting.includes(todo.id))+++ as todo (todo.id)}
		<li class="todo" in:fly={{ y: 20 }} out:slide>
			<form
				method="POST"
				action="?/delete"
				+++use:enhance={() => {
					deleting = [...deleting, todo.id];
					return async ({ update }) => {
						await update();
						deleting = deleting.filter((id) => id !== todo.id);
					};
				}}+++
			>
				<input type="hidden" name="id" value={todo.id} />
				<button aria-label="Mark as complete">✔</button>

				{todo.description}
			</form>
		</li>
	{/each}
</ul>
```

> `use:enhance`는 매우 사용자 정의가 가능합니다. `cancel()` 제출, 리디렉션 처리, 양식 재설정 여부 제어 등을 할 수 있습니다. 자세한 내용은 [문서 참조](https://kit.svelte.dev/docs/modules#$app-forms-enhance)를 참조하십시오.
