<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	let container: HTMLDivElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let moon: THREE.Object3D;

	// Define the event handler functions
	const onScroll = () => {
		if (moon) {
			const scrollPosition = window.scrollY || window.pageYOffset;
			moon.rotation.x = scrollPosition * 0.01;
		}
	};

	const handleResize = () => {
		if (container && camera && renderer) {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(
				50,
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

			// Load the moon model
			const loader = new GLTFLoader();
			loader.load(
				'/models/moon-blend.glb',
				(gltf) => {
					moon = gltf.scene;
					moon.scale.set(1, 1, 1);
					moon.position.set(0, 0, 0);
					scene.add(moon);
					animate();
				},
				undefined,
				(error) => {
					console.error('An error happened loading the GLTF model:', error);
				}
			);

			camera.position.set(0, 0.65, 1);

			function animate() {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			}

			window.addEventListener('scroll', onScroll);
			window.addEventListener('resize', handleResize);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<div bind:this={container} class="canvas-container"></div>

<style>
	.canvas-container {
		width: 100%;
		height: 50vh;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: -1;
	}
</style>
