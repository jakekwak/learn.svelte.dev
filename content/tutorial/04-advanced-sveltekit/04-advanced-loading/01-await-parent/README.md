---
title: Using parent data
---

[레이아웃 데이터](/tutorial/layout-data) 소개에서 보았듯이 `+page.svelte` 및 `+layout.svelte` 구성 요소는 상위 `load` 함수에서 반환된 모든 항목에 액세스할 수 있습니다.

때때로 `load` 함수 자체가 부모의 데이터에 액세스하는 것이 유용합니다. 이것은 `await parent()`로 수행할 수 있습니다.

작동 방식을 보여주기 위해 서로 다른 `load` 함수에서 오는 두 개의 숫자를 합산합니다. 먼저 `src/routes/+layout.server.js`에서 일부 데이터를 반환합니다.

```js
/// file: src/routes/+layout.server.js
export function load() {
	return { +++a: 1+++ };
}
```

그런 다음 `src/routes/sum/+layout.js`에서 해당 데이터를 가져옵니다.

```js
/// file: src/routes/sum/+layout.js
export async function load(+++{ parent }+++) {
	+++const { a } = await parent();+++
	return { +++b: a + 1+++ };
}
```

> [universal](/tutorial/universal-load-functions) `load` 함수는 상위 _server_ `load` 함수에서 데이터를 가져올 수 있습니다. 그 반대는 사실이 아닙니다. 서버 로드 기능은 다른 서버 로드 기능에서만 상위 데이터를 가져올 수 있습니다.

마지막으로 `src/routes/sum/+page.js`에서 두 `load` 함수에서 부모 데이터를 가져옵니다.

```js
/// file: src/sum/+page.js
export async function load(+++{ parent }+++) {
	+++const { a, b } = await parent();+++
	return { +++c: a + b+++ };
}
```

> `await parent()`를 사용할 때 폭포를 도입하지 않도록 주의하세요. 상위 데이터에 종속되지 않은 다른 데이터를 `가져올` 수 있는 경우 먼저 수행하십시오.
