<script lang="ts">
	import Moon from '$lib/components/Moon.svelte';
	import FadeInSection from '$lib/components/FadeInSection.svelte';
</script>

<div class="mt-8 text-center">
	<h1 class="text-4xl font-bold">Welcome to Translucent Technologies</h1>
	<p class="mt-4 text-lg">Your partner in web solutions and business needs.</p>
</div>

<Moon />

<div class="content">
	<FadeInSection>
		<section class="section">
			<h2 class="text-3xl font-bold">Our Mission</h2>
			<p>We aim to bring clarity and efficiency to your business...</p>
		</section>
	</FadeInSection>

	<FadeInSection>
		<section class="section">
			<h2 class="text-3xl font-bold">Our Services</h2>
			<p>We offer a range of services from full stack development to CRM/ERP solutions...</p>
		</section>
	</FadeInSection>

	<FadeInSection>
		<section class="section">
			<h2 class="text-3xl font-bold">Contact Us</h2>
			<p>Get in touch to see how we can help your business thrive...</p>
		</section>
	</FadeInSection>
</div>

<style>
	.content {
		padding-top: 70vh; /* Adjust to make space for the fixed moon */
	}

	.section {
		margin: 50vh 0; /* Spacing between sections */
		text-align: center;
	}
</style>
