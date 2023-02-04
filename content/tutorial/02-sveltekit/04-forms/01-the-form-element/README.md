---
title: The <form> element
---

이전 장에서는 서버에서 브라우저로 데이터를 가져오는 방법을 살펴보았습니다. 때로는 반대 방향으로 데이터를 보내야 할 때가 있는데, 이때 웹 플랫폼의 데이터 제출 방식인 `<form>`이 필요합니다.

할 일 앱을 만들어 봅시다. 우리는 이미 `src/lib/server/database.js`에 메모리 내 데이터베이스를 설정했으며 `src/routes/+page.server.js`의 `load` 기능은 [`cookies`](https://kit.svelte.dev/docs/load#cookies-and-headers) API를 사용합니다. 사용자별 할일 목록을 가질 수 있지만 새 할일을 생성하려면 `<form>`을 추가해야 합니다.

```svelte
/// file: src/routes/+page.svelte
<h1>Todos</h1>

+++<form method="POST">
	<label>
		add a todo:
		<input name="description" />
	</label>
</form>+++

{#each data.todos as todo}
```

`<input>`에 무언가를 입력하고 Enter 키를 누르면 브라우저는 현재 페이지에 대한 POST 요청 (`method="POST"` 속성 때문에)을 만듭니다. 하지만 POST 요청을 처리하기 위한 서버 측 _작업_(server side action) 을 만들지 않았기 때문에 오류가 발생합니다. 지금 해봅시다:

```js
/// file: src/routes/+page.server.js
import * as db from '$lib/server/database.js';

export function load({ cookies }) {
	// ...
}

+++export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		db.createTodo(cookies.get('userid'), data.get('description'));
	}
};+++
```

Enter 키를 누르면 데이터베이스가 업데이트되고 새 데이터로 페이지가 다시 로드됩니다.

`fetch` 코드나 그와 유사한 것을 작성할 필요가 없었습니다. 데이터가 자동으로 업데이트됩니다. 그리고 `<form>` 요소를 사용하고 있기 때문에 JavaScript가 비활성화되거나 사용할 수 없는 경우에도 이 앱이 작동합니다.
