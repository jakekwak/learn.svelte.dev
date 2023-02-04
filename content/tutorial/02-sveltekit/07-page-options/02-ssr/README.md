---
title: ssr
---

SSR(서버측 렌더링)은 서버에서 HTML을 생성하는 프로세스이며 SvelteKit이 기본적으로 수행하는 작업입니다. 이는 성능과 [복원력](https://kryogenix.org/code/browser/everyonehasjs.html)에 중요하며 검색 엔진 최적화(SEO)에 매우 유용합니다. 일부 검색 엔진은 JavaScript를 사용하여 브라우저에서 렌더링되는 콘텐츠를 인덱싱할 수 있지만 덜 자주 발생하고 안정적입니다.

즉, 일부 컴포넌트는 'window'와 같은 브라우저 전역에 즉시 액세스할 수 있기를 기대하기 때문에 서버에서 렌더링할 수 _없습니다_. 가능하면 서버에서 렌더링 _할 수_ 있도록 해당 구성 요소를 변경해야 하지만 그렇게 할 수 없는 경우 SSR을 비활성화할 수 있습니다.

```js
/// file: src/routes/+page.server.js
export const ssr = false;
```

> 루트 `+layout.server.js` 내부에서 `ssr`을 `false`로 설정하면 전체 앱이 효과적으로 SPA로 전환됩니다.
