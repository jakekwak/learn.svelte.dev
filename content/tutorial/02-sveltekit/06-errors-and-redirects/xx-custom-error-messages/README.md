---
title: Customizing the error message
---

이전 연습의 오류 페이지는 다소 정적입니다. 사람들이 지원 채널을 더 빨리 찾을 수 있도록 오류 메시지를 표시하고 싶을 수도 있습니다.

이를 위해 SvelteKit은 오류 및 상태 코드에 대한 정보가 포함된 `$page.error` 및 `$page.status`를 제공합니다. `+error.svelte`에 추가해 봅시다:

```svelte
/// file: src/routes/+error.svelte
<script>
	+++import { page } from '$app/stores';+++

	let online = typeof navigator !== 'undefined'
		? navigator.onLine
		: true;
</script>

+++{#if $page.status === 404}
	<h1>Not found</h1>
{:else +++if !online}
	<h1>You're offline</h1>
{:else}
	<h1>Oops!</h1>
	---<p>Something went wrong</p>---
	+++<p>{$page.error.message}</p>+++
{/if}
```

더 좋지만 `$page.error.message`에는 항상 "내부 오류"가 포함됩니다. 어떻게 그렇습니까? 이는 SvelteKit이 안전하게 처리하고 오류 메시지의 일부로 중요한 정보를 실수로 표시하는 것을 방지하기 때문입니다.

사용자 지정하려면 서버 또는 클라이언트에서 데이터를 로드하는 동안 예기치 않은 오류가 발생할 때 실행되는 `hooks.server.js` 및 `hooks.client.js`에서 `handleError` 후크를 각각 구현합니다.

```js
// hooks.server.js
export function handleError(+++{ error }+++) {
    ---return { message: 'Internal Error' }; // the default implementation of this hook---
    +++return { message: error instanceof Error ? error.message : 'Internal Error' };+++
}
```

```js
// hooks.client.js
export function handleError(+++{ error }+++) {
    ---return { message: 'Internal Error' }; // the default implementation of this hook---
    +++return { message: error instanceof Error ? error.message : 'Internal Error' };+++
}
```

이러한 후크에서 오류 보고 서비스를 호출할 수도 있습니다.

원하는 경우 오류 메시지 이상을 반환할 수 있습니다. 반환하는 개체 모양이 무엇이든 `$page.error`에서 사용할 수 있으며 유일한 요구 사항은 `message` 속성입니다. [오류 문서](https://kit.svelte.dev/docs/errors)에서 이에 대한 자세한 내용(및 형식을 안전하게 만드는 방법!)을 읽을 수 있습니다.

> 오류를 처리할 때 `Error` 개체라고 가정하지 않도록 주의하세요. 무엇이든 발생할 수 있습니다. 또한 너무 많은 정보를 전달하여 민감한 데이터가 노출되지 않도록 하십시오.
