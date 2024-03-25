<script>

import { onNavigate } from '$app/navigation';

// @ts-ignore
onNavigate((nav) => {
	// @ts-ignore
	console.log('test');
	if (!document.startViewTransition) return;
	return new Promise((resolve) => {
		// @ts-ignore
		document.startViewTransition(async () => {
			resolve();
			console.log('test2');
			
			await nav.complete
			
		});
	});
});
</script>