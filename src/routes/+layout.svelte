<script lang="ts">
	import '../app.css';
</script>

<nav
	class="sticky top-0 z-50 bg-opacity-80 bg-gradient-to-r from-black via-gray-900 to-gray-800 p-4 text-white backdrop-blur-lg backdrop-filter"
>
	<ul class="flex space-x-4">
		<li><a href="#home" class="transition-colors duration-300 hover:text-gray-400">Home</a></li>
		<li>
			<a href="#about" class="transition-colors duration-300 hover:text-gray-400">About Us</a>
		</li>
		<li>
			<a href="#services" class="transition-colors duration-300 hover:text-gray-400">Our Services</a
			>
		</li>
		<li>
			<a href="#contact" class="transition-colors duration-300 hover:text-gray-400">Contact Us</a>
		</li>
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
