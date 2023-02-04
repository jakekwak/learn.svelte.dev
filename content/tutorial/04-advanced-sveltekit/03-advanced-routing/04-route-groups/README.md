---
title: Route groups
---

[라우팅 소개](/tutorial/layouts)에서 본 것처럼 레이아웃은 서로 다른 라우트 간에 UI와 데이터 로딩 로직을 공유하는 방법입니다.

경우에 따라 경로에 영향을 주지 않고 레이아웃을 사용하는 것이 유용할 수 있습니다. 예를 들어 `/about` 페이지가 전 세계에 열려 있는 동안 `/app` 및 `/account` 경로가 인증 뒤에 있어야 할 수 있습니다. 괄호 안의 디렉토리인 _route group_으로 이 작업을 수행할 수 있습니다.

`account`의 이름을 `(authed)/account`로 변경한 다음 `app`의 이름을 `(authed)/app`으로 변경하여 `(authed)` 그룹을 만듭니다.

이제 `src/routes/(authed)/+layout.server.js`를 생성하여 이러한 경로에 대한 액세스를 제어할 수 있습니다.

```js
/// file: src/routes/(authed)/+layout.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		throw redirect(307, `/login?redirectTo=${url.pathname}`);
	}
}
```

이 페이지를 방문하려고 하면 `logged_in` 쿠키를 설정하는 `src/routes/login/+page.server.js`에 양식 작업이 있는 `/login` 경로로 리디렉션됩니다.

`src/routes/(authed)/+layout.svelte` 파일을 추가하여 이 두 경로에 일부 UI를 추가할 수도 있습니다.

```svelte
/// file: src/routes/(authed)/+layout.svelte
<form method="POST" action="/logout">
	<button>Log out</button>
</form>

<slot />
```
