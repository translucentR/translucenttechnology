<script lang="ts">
	import '../app.css';
</script>

<nav class="bg-gray-800 p-4 text-white">
	<ul class="flex space-x-4">
		<li><a href="/" class="hover:text-gray-400">Home</a></li>
		<li><a href="/about" class="hover:text-gray-400">About Us</a></li>
		<li><a href="/services" class="hover:text-gray-400">Our Services</a></li>
		<li><a href="/contact" class="hover:text-gray-400">Contact Us</a></li>
	</ul>
</nav>

<main class="p-4">
	<slot></slot>
</main>

<style>
	nav {
		position: fixed;
		width: 100%;
		top: 0;
	}
	main {
		margin-top: 4rem;
	}
</style>
