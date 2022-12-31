<script>
	import { setup } from 'svelte-cubed/utils/context';
	import * as THREE from 'three';
	export let selectedClips;
	export let allClips;
	export let time = 0;
	export let timeScale = 1;
	export let weight = 1;
	const ROOT = {};
	const PARENT = {};
	const { root, parent } = setup();
	const mixer = new THREE.AnimationMixer(parent);
	/* NOTE: 
	THIS IS AN EXPERIMENT AND MIGHT BE TERRIBLE CODE, but it seems to work? 
	This might be more aligned with the rest of SC if it stuck to 1 animation per instance, and
	you would just add <Animation {clip} {time} /> for each selected animation. 
	For now, this'll do.
	
	Original component: https://github.com/Rich-Harris/svelte-cubed/blob/main/src/lib/components/animation/Animation.svelte
	Component bug: 
	*/
	// TODO: Improve clip crossfading, fadeIn, fadeOut and allow custom params
	// DOCS: https://threejs.org/docs/#api/en/animation/AnimationMixer
	$: {
		allClips.forEach(modelClip => {
			let action = mixer.clipAction(modelClip)
			if(selectedClips.includes(modelClip.uuid)){
				action.weight = weight;
				action.play();
			} else {
				action.stop();
			}
		})
		// TODO uncache stuff
	}
	$: {
		mixer.timeScale = timeScale;
		mixer.setTime(time);
		root.invalidate();
	}
</script>