<script lang="ts">
  import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import ReusableGLTF from "./lib/ReusableGLTF.svelte";
	import { statusOfModels, modelURL, modelsLoading, updateModelStatus } from "./lib/store";

  function handleStatusChange(evt) {
		updateModelStatus(evt.detail.name, evt.detail.status);
	}

  let spin = 0;

  SC.onFrame(() => {
		spin += 0.01;
	});
</script>

<main class="container">
  <SC.Canvas
  background={new THREE.Color("skyblue")}
  antialias
>

  <SC.PerspectiveCamera 
    position={[-10, 36, 20]}
    near={0.1}
    far={500}
    fov={40}
  />

  <SC.OrbitControls 
    enabled={true}
    enableZoom={true}
    autoRotate={false}
    autoRotateSpeed={2}
    enableDamping={true}
    dampingFactor={0.1}
		target={[-6, 17, 0]}
  />

  <SC.DirectionalLight
    color={new THREE.Color(0xffffff)}
    position={[0,10,10]}
    intensity={0.75}
    shadow={false}
  />
  <SC.AmbientLight
    color={new THREE.Color(0xffffff)}
    intensity={0.75}
  />
	
	<!-- Don't need this once we have a reusable component! -->
    <ReusableGLTF 
    modelURL={modelURL['lc']} 
    name="lc" 
    scale={[.05,.05,.05]}
    on:statusChange={handleStatusChange} 
  />

  <ReusableGLTF 
		modelURL={modelURL['cc']} 
		name="cc" 
		position={[-6, 20, 0]} 
		rotation={[0, Math.PI * 1.25, 0]} 
		on:statusChange={handleStatusChange} 
	/>
</SC.Canvas>
</main>

<style>

</style>