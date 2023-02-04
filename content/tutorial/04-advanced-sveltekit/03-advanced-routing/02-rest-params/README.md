---
title: Rest parameters
---

알 수 없는 수의 경로 세그먼트를 일치시키려면 `[...rest]` 매개변수를 사용합니다. 이 매개변수는 [JavaScript의 나머지 매개변수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)와 유사하여 이름이 지정되었습니다.

`src/routes/[path]`의 이름을 `src/routes/[...path]`로 변경합니다. 이제 경로가 모든 경로와 일치합니다.

> 다른 더 구체적인 경로가 먼저 테스트되어 나머지 매개변수를 '포괄적인' 경로로 유용하게 만듭니다. 예를 들어 `/categories/...` 내부 페이지에 대한 사용자 정의 404 페이지가 필요한 경우 다음 파일을 추가할 수 있습니다:
>
> ```diff
> src/routes/
> ├ categories/
> │ ├ animal/
> │ ├ mineral/
> │ ├ vegetable/
> +│ ├ [...catchall]/
> +│ │ ├ +error.svelte
> +│ │ └ +page.server.js
> ```
>
> `+page.server.js` 파일 내부 `load` 내부 `throw error(404)`.
