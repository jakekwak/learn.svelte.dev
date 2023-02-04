---
title: Optional parameters
---

[라우팅](/tutorial/pages)에 대한 첫 번째 장에서 [동적 매개변수](/tutorial/params)로 라우트를 만드는 방법을 배웠습니다.

경우에 따라 매개 변수를 선택 사항으로 만드는 것이 도움이 됩니다. 고전적인 예는 라우트 이름을 사용하여 로케일(`/fr/...`, `/de/...` 등)을 결정하지만 기본 로케일도 사용하려는 경우입니다.

이를 위해 이중 괄호를 사용합니다. `[lang]` 디렉토리의 이름을 `[[lang]]`로 변경합니다.

이제 `src/routes/+page.svelte` 및 `src/routes/[[lang]]/+page.svelte`가 모두 `/`와 일치하기 때문에 앱 빌드에 실패합니다. `src/routes/+page.svelte`를 삭제합니다. (오류 페이지에서 복구하려면 앱을 다시 로드해야 할 수 있습니다.)

마지막으로 `src/routes/[[lang]]/+page.server.js`를 편집하여 기본 로케일을 지정합니다.

```js
/// file: src/routes/[[lang]]/+page.server.js
const greetings = {
	en: 'hello!',
	de: 'hallo!',
	fr: 'bonjour!'
};

export function load({ params }) {
	return {
		greeting: greetings[params.lang +++?? 'en'+++]
	};
}
```
