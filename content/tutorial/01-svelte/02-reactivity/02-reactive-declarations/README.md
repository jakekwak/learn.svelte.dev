---
title: Declarations
---

Svelte는 컴포넌트의 상태가 변경되면 자동으로 DOM을 업데이트합니다. 종종 컴포넌트 상태의 일부는 _다른_ &nbsp;부분 (예: `이름` 및 `성`에서 파생된 `전체 이름`)에서 계산하고 변경될 때마다 다시 계산해야 합니다.

이를 위해 우리는 _반응적 선언_ 을 가지고 있습니다. 그들은 다음과 같이 보입니다 :

```js
let count = 0;
+++$: doubled = count * 2;+++
```

> 이것이 약간 외계인처럼 보이더라도 걱정하지 마십시오. Svelte는 '참조된 값이 변경될 때마다 이 코드를 다시 실행'하는 의미로 해석하는 [유효한](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)(전통적이지 않은 경우) JavaScript입니다. 익숙해지면 되돌릴 수 없습니다.

마크업에서 `doubled`를 사용합시다:

```svelte
<button>...</button>

+++<p>{count} doubled is {doubled}</p>+++
```

물론 대신 마크업에 `{count * 2}`를 작성할 수 있습니다. 반응형 값을 사용할 필요가 없습니다. 반응형 값은 여러 번 참조해야 하거나 _다른_ &nbsp;반응형 값에 의존하는 값이 있을 때 특히 유용합니다(말장난이 아님).
