---
title: Redirects
---

또한 `throw` 메커니즘을 사용하여 한 페이지에서 다른 페이지로 리디렉션할 수 있습니다.

`src/routes/a/+page.server.js`에서 새로운 `load` 함수를 만듭니다.

```js
/// file: src/routes/a/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/b');
}
```

이제 `/a`로 이동하면 바로 `/b`로 이동합니다.

`load` 함수, 양식 작업, API 경로 및 `handle` 후크 내부에서 `throw redirect(...)`할 수 있습니다. 이에 대해서는 이후 장에서 설명합니다.

사용하게 될 가장 일반적인 상태 코드:

- `303` — 성공적인 제출 후 양식 작업용
- `307` — 임시 리디렉션용
- `308` — 영구 리디렉션의 경우
