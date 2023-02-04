---
title: Fallback errors
---

일이 _정말로_ 잘못되면(루트 레이아웃 데이터를 로드하는 동안 또는 오류 페이지를 렌더링하는 동안 오류가 발생함) SvelteKit은 정적 오류 페이지로 돌아갑니다.

새 `src/routes/+layout.server.js` 파일을 추가하여 작동을 확인하세요.

```js
/// file: src/routes/+layout.server.js
export function load() {
	throw new Error('😬');
}
```

대체 오류 페이지를 사용자 정의할 수 있습니다. `src/error.html` 파일을 생성합니다:

```html
/// file: src/error.html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>%sveltekit.error.message%</title>
		<style>
			body {
				color: #ff531a;
			}
		</style>
	</head>
	<body>
		<h1>Game over</h1>
		<p>Error code %sveltekit.status%</p>
	</body>
</html>
```

이 파일에는 다음이 포함될 수 있습니다.

- `%sveltekit.status%` — HTTP 상태 코드
- `%sveltekit.error.message%` — 오류 메시지
