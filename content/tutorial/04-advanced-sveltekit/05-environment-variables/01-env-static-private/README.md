---
title: $env/static/private
---

API 키 및 데이터베이스 자격 증명과 같은 환경 변수는 `.env` 파일에 추가할 수 있으며 애플리케이션에서 사용할 수 있습니다.

> `.env.local` 또는 `.env.[mode]` 파일을 사용할 수도 있습니다.- 자세한 내용은 [Vite 설명서](https://vitejs.dev/guide/env-and-mode.html#env-files)를 참조하세요. `.gitignore` 파일에 민감한 정보가 포함된 파일을 추가했는지 확인하세요!

이 연습에서는 사용자가 환경 변수를 사용하여 올바른 암호를 알고 있는 경우 웹 사이트에 들어갈 수 있도록 허용하려고 합니다.

먼저 `.env`에서 새 환경 변수를 추가합니다.

```env
/// file: .env
PASSPHRASE=+++"open sesame"+++
```

Open `src/routes/+page.server.js`. Import `PASSPHRASE` from `$env/static/private` and use it inside the [form action](/tutorial/the-form-element):
`src/routes/+page.server.js`를 엽니다. `$env/static/private`에서 `PASSPHRASE`를 가져와 [form action](/tutorial/the-form-element) 내에서 사용합니다.

```js
/// file: src/routes/+page.server.js
import { redirect, fail } from '@sveltejs/kit';
+++import { PASSPHRASE } from '$env/static/private';+++

export function load({ cookies }) {
	if (cookies.get('allowed')) {
		throw redirect(307, '/welcome');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === +++PASSPHRASE+++) {
			cookies.set('allowed', 'true', {
				path: '/'
			});

			throw redirect(303, '/welcome');
		}

		return fail(403, {
			incorrect: true
		});
	}
};
```

이제 올바른 암호를 아는 모든 사람이 웹 사이트에 액세스할 수 있습니다.

> `process.env`의 환경 변수는 `$env/static/private`를 통해서도 사용할 수 있습니다.

## Keeping secrets

민감한 데이터가 해커와 악당에 의해 쉽게 도난당할 수 있는 브라우저로 실수로 전송되지 않는 것이 중요합니다.

SvelteKit을 사용하면 이러한 일이 발생하지 않도록 쉽게 방지할 수 있습니다. `PASSPHRASE`를 `src/routes/+page.svelte`로 가져오려고 하면 어떤 일이 발생하는지 확인하십시오.

```svelte
/// file: src/routes/+page.svelte
<script>
	+++import { PASSPHRASE } from '$env/static/private';+++
	export let form;
</script>
```

`$env/static/private`를 클라이언트 측 코드로 가져올 수 없다는 오류 오버레이가 나타납니다. 서버 모듈로만 가져올 수 있습니다.

- `+page.server.js`
- `+layout.server.js`
- `+server.js`
- `.server.js`로 끝나는 모든 모듈
- `src/lib/server` 내부의 모든 모듈

차례로 이러한 모듈은 _다른_&nbsp; 서버 모듈에서만 가져올 수 있습니다.

## Static vs dynamic

`$env/static/private`의 `static`은 이러한 값이 빌드 시 알려지고 _정적으로 대체_ 될 수 있음을 나타냅니다. 이를 통해 유용한 최적화가 가능합니다.

```js
import { FEATURE_FLAG_X } from '$env/static/private';

if (FEATURE_FLAG_X === 'enabled') {
	// code in here will be removed from the build output
	// if FEATURE_FLAG_X is not enabled
}
```

경우에 따라 _동적_인 환경 변수를 참조해야 할 수도 있습니다. 즉, 앱을 실행할 때까지 알 수 없습니다. 다음 실습에서 이 사례를 다룰 것입니다.
