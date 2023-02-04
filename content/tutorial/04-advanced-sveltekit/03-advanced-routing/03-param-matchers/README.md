---
title: Param matchers
path: /colors/ff3e00
---

잘못된 입력에 대해 라우터가 일치하지 않도록 하려면 _matcher_를 지정할 수 있습니다. 예를 들어, `/colors/[value]`와 같은 경로는 `/colors/ff3e00`과 같은 16진수 값과 일치하지만 `/colors/octarine`과 같은 이름이 지정된 색상 또는 기타 임의의 입력과는 일치하지 않을 수 있습니다.

먼저 `src/params/hex.js`라는 새 파일을 만들고 여기에서 `match` 함수를 내보냅니다.

```js
/// file: src/params/hex.js
export function match(value) {
	return /^[0-9a-f]{6}$/.test(value);
}
```

그런 다음 새 매처를 사용하려면 `src/routes/colors/[color]`의 이름을 `src/routes/colors/[color=hex]`로 변경합니다.

이제 누군가 해당 경로를 탐색할 때마다 SvelteKit은 'color'가 유효한 'hex' 값인지 확인합니다. 그렇지 않은 경우 SvelteKit은 결국 404를 반환하기 전에 다른 경로를 일치시키려고 시도합니다.

> 매처는 서버와 브라우저 모두에서 실행됩니다.
