---
title: Project structure
---

오른쪽의 파일 트리 뷰어에는 SvelteKit이 프로젝트에서 찾을 것으로 예상하는 소수의 파일이 표시됩니다.

이전에 Node.js로 작업한 적이 있다면 `package.json`이 익숙할 것입니다. 여기에는 `svelte` 및 `@sveltejs/kit`을 포함한 프로젝트의 종속성과 SvelteKit CLI와 상호 작용하기 위한 다양한 `scripts`가 나열됩니다. (현재 하단 창에서 `npm run dev`를 실행하고 있습니다.)

> `"type": "module"`도 지정합니다. 이는 `.js` 파일이 레거시 CommonJS 형식이 아니라 기본적으로 기본 JavaScript 모듈로 취급됨을 의미합니다.

`svelte.config.js`에는 프로젝트 구성이 포함되어 있습니다. 지금은 이 파일에 대해 걱정할 필요가 없지만 궁금한 점이 있으면 [문서를 방문](https://kit.svelte.dev/docs/configuration)하십시오.

`src`는 앱의 소스 코드가 들어가는 곳입니다. `src/app.html`은 페이지 템플릿입니다(SvelteKit은 `%sveltekit.head%` 및 `%sveltekit.body%`를 적절하게 대체함). `src/routes`는 앱의 [라우트](/tutorial/pages)를 정의합니다.

마지막으로 `static`에는 앱이 배포될 때 포함되어야 하는 모든 자산(예: `favicon.png` 또는 `robots.txt`)이 포함됩니다.
