---
title: Media elements
---

> 이 연습은 현재 작동하지 않습니다. 대신 이전 자습서로 전환할 수 있습니다. https://svelte.dev/tutorial/media-elements

`<audio>` 및 `<video>` 요소에는 바인딩할 수 있는 여러 속성이 있습니다. 이 예제는 그 중 몇 가지를 보여줍니다.

62행에서 `currentTime={time}`, `duration` 및 `paused` 바인딩을 추가합니다.

```svelte
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMove}
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
	bind:currentTime={time}
	bind:duration
	bind:paused>
	<track kind="captions">
</video>
```

> `bind:duration`은 `bind:duration={duration}`과 동일합니다.

이제 동영상을 클릭하면 'time', 'duration' 및 'paused'가 적절하게 업데이트됩니다. 즉, 사용자 지정 컨트롤을 빌드하는 데 사용할 수 있습니다.

> 일반적으로 웹에서는 `timeupdate` 이벤트를 수신하여 `currentTime`을 추적합니다. 그러나 이러한 이벤트는 너무 드물게 실행되어 고르지 못한 UI가 발생합니다. Svelte가 더 좋습니다. `requestAnimationFrame`을 사용하여 `currentTime`을 확인합니다.

`<audio>` 및 `<video>`에 대한 전체 바인딩 세트는 다음과 같습니다 — 6개의 _읽기 전용_ 바인딩...

- `duration`(읽기 전용) — 비디오의 총 재생 시간(초)
- `buffered`(읽기 전용) — `{start, end}` 개체의 배열
- `검색 가능`(읽기 전용) — 마찬가지
- `played`(읽기 전용) — 마찬가지
- `seeking`(읽기 전용) — 부울
- `ended`(읽기 전용) — 부울

...그리고 5개의 _양방향_ 바인딩:

- `currentTime` — 비디오의 현재 지점(초)
- `playbackRate` — 동영상 재생 속도, 여기서 `1`은 '보통'입니다.
- `paused` — 설명이 필요하지 않습니다.
- `volume` — 0과 1 사이의 값
- `muted` — true가 음소거된 부울 값

비디오에는 읽기 전용 `videoWidth` 및 `videoHeight` 바인딩이 추가로 있습니다.
