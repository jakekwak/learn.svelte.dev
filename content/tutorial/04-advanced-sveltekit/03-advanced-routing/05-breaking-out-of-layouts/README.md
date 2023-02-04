---
title: Breaking out of layouts
---

일반적으로 페이지는 그 위에 있는 모든 레이아웃을 상속합니다. 즉, `src/routes/a/b/c/+page.svelte`는 네 가지 레이아웃을 상속합니다.

- `src/routes/+layout.svelte`
- `src/routes/a/+layout.svelte`
- `src/routes/a/b/+layout.svelte`
- `src/routes/a/b/c/+layout.svelte`

경우에 따라 현재 레이아웃 계층 구조에서 벗어나는 것이 유용합니다. `@` 기호 다음에 '재설정'할 상위 세그먼트의 이름을 추가하여 이를 수행할 수 있습니다. 예를 들어 `+page@b.svelte`는 `/a/b/c`를 `src/routes에 넣습니다. /a/b/+layout.svelte`, `+page@a.svelte`는 `src/routes/a/+layout.svelte`에 넣습니다.

`+page@.svelte`로 이름을 변경하여 루트 레이아웃으로 완전히 재설정해 보겠습니다.

> 루트 레이아웃은 앱의 모든 페이지에 적용되므로 중단할 수 없습니다.
