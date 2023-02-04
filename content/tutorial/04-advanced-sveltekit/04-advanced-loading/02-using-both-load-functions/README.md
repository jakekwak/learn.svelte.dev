---
title: Using both load functions
---

경우에 따라 서버 로드 기능과 범용 로드 기능을 함께 사용해야 할 수도 있습니다. 예를 들어 서버에서 데이터를 반환해야 하지만 서버 데이터로 직렬화할 수 없는 값도 반환해야 할 수 있습니다.

이 예제에서 우리는 `src/routes/+page.server.js`에서 가져온 데이터가 `cool`인지 여부에 따라 `load`에서 다른 구성 요소를 반환하려고 합니다.

`data` 속성을 통해 `src/routes/+page.js`의 서버 데이터에 액세스할 수 있습니다.

```js
/// file: src/routes/+page.js
export async function load(+++{ data }+++) {
	const module = +++data.cool+++
		? await import('./CoolComponent.svelte')
		: await import('./BoringComponent.svelte');

	return {
		component: module.default,
		message: +++data.message+++
	};
}
```

> 데이터가 병합되지 않는다는 점에 유의하세요. 범용 `load` 함수에서 명시적으로 `message`를 반환해야 합니다.
