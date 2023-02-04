---
title: trailingSlash
---

`/foo` 및 `/foo/`와 같은 두 개의 URL은 동일하게 보일 수 있지만 실제로는 다릅니다. `bar`와 같은 상대 URL은 첫 번째 경우에는 `/bar`로, 두 번째 경우에는 `/foo/bar`로 해석되며 검색 엔진은 이를 별도의 항목으로 취급하여 SEO에 해를 끼칩니다.

요컨대, 후행 슬래시를 느슨하게 다루는 것은 나쁜 생각입니다. 기본적으로 SvelteKit은 후행 슬래시를 제거합니다. 즉, `/foo/`에 대한 요청은 `/foo`로 리디렉션됩니다.

대신 후행 슬래시가 항상 있는지 확인하려면 그에 따라 `trailingSlash` 옵션을 지정할 수 있습니다.

```js
/// file: src/routes/always/+page.server.js
export const trailingSlash = 'always';
```

두 가지 경우를 모두 수용하려면(권장하지 않음!) `'ignore'`를 사용하십시오.

```js
/// file: src/routes/ignore/+page.server.js
export const trailingSlash = 'ignore';
```

기본값은 `'never'`입니다.

후행 슬래시 적용 여부는 사전 렌더링에 영향을 미칩니다. `/always/`와 같은 URL은 `always/index.html`로 디스크에 저장되는 반면 `/never`와 같은 URL은 `never.html`로 저장됩니다.