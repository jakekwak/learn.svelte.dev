---
title: GET handlers
---

SvelteKit을 사용하면 단순한 페이지 이상을 만들 수 있습니다. 또한 HTTP 메서드인 `GET`, `PUT`, `POST`, `PATCH` 및 `DELETE`에 해당하는 함수를 내보내는 `+server.js` 파일을 추가하여 _API 경로_를 생성할 수 있습니다.

이 앱은 버튼을 클릭하면 `/roll` API 경로에서 데이터를 가져옵니다. `src/routes/roll/+server.js` 파일을 추가하여 해당 경로를 만듭니다.

```js
/// file: src/routes/roll/+server.js
export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	return new Response(number, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
```

이제 버튼을 클릭하면 작동합니다.

요청 핸들러는 [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) 개체를 반환해야 합니다. API 경로에서 JSON을 반환하는 것이 일반적이므로 SvelteKit은 이러한 응답을 생성하기 위한 편의 기능을 제공합니다.

```js
/// file: src/routes/roll/+server.js
+++import { json } from '@sveltejs/kit';+++

export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

---	return new Response(number, {
		headers: {
			'Content-Type': 'application/json'
		}
	});---
+++	return json(number);+++
}
```
