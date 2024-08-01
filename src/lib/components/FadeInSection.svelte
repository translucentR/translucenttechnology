<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let isVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.01 && entry.intersectionRatio < 0.99) {
						isVisible = true;
					} else {
						isVisible = false;
					}
				});
			},
			{
				rootMargin: '0px 0px -700px 0px',
				threshold: Array.from({ length: 100 }, (_, i) => i / 100)
			}
		);

		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div bind:this={container} class="fade-in-section" class:visible={isVisible}>
	<slot></slot>
</div>

<style>
	.fade-in-section {
		opacity: 0;
		transition: opacity 0.2s ease-out !important;
	}

	.fade-in-section.visible {
		opacity: 1 !important;
	}
</style>
