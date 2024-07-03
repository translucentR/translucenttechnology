<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	let container: HTMLDivElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let moon: THREE.Object3D;

	onMount(() => {
		if (typeof window !== 'undefined') {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(
				75,
				container.clientWidth / container.clientHeight,
				0.1,
				1000
			);
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(container.clientWidth, container.clientHeight);
			container.appendChild(renderer.domElement);

			// Add ambient light
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
			scene.add(ambientLight);

			// Add directional light
			const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
			directionalLight.position.set(5, 5, 5).normalize();
			scene.add(directionalLight);

			const loader = new GLTFLoader();
			loader.load(
				'/models/moon-blend.glb',
				(gltf) => {
					moon = gltf.scene;
					moon.scale.set(275, 220, 40); // Adjust the scale to fit the viewport width
					moon.position.set(0, -180, 0); // Position it so the top is visible
					scene.add(moon);
					animate();
				},
				undefined,
				(error) => {
					console.error('An error happened loading the GLTF model:', error);
				}
			);

			camera.position.z = 80; // Move the camera back to fit the moon in view

			function animate() {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			}

			window.addEventListener('resize', () => {
				camera.aspect = container.clientWidth / container.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(container.clientWidth, container.clientHeight);
			});
		}
	});
</script>

<div bind:this={container} class="canvas-container"></div>

<style>
	.canvas-container {
		width: 100%;
		height: 50vh; /* Increase the height to ensure the moon is fully visible */
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: -1; /* Ensure it's behind other content */
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
