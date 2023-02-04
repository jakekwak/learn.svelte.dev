---
title: Your first component
---

Svelte에서 애플리케이션은 하나 이상의 _컴포넌트_ 로 구성됩니다. 컴포넌트는 함께 속해 있는 HTML, CSS 및 JavaScript를 캡슐화하여 `.svelte` 파일에 기록되는 재사용 가능한 자체 포함 코드 블록입니다. 오른쪽의 코드 편집기에서 열리는 `App.svelte` 파일은 간단한 컴포넌트입니다.

## Adding data

일부 정적 마크업만 렌더링하는 컴포넌트는 그리 흥미롭지 않습니다. 일부 데이터를 추가해 보겠습니다.

먼저 구성 요소에 스크립트 태그를 추가하고 `name` 변수를 선언합니다.

```svelte
+++<script>
	let name = 'Svelte';
</script>+++

<h1>Hello world!</h1>
```

그런 다음 마크업에서 `name`을 참조할 수 있습니다.

```svelte
<h1>Hello +++{name}+++!</h1>
```

중괄호 안에 원하는 JavaScript를 넣을 수 있습니다. 더 큰 소리로 인사하려면 `name`을 `name.toUpperCase()`로 변경해 보세요.

```svelte
<h1>Hello {name+++.toUpperCase()+++}!</h1>
```