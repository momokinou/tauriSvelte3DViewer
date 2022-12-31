import { writable, readable, derived } from "svelte/store";

// Contains the status of all models
export const statusOfModels = writable({}); // { uniqueName: "LOADING" | "ERROR" | "SUCCESS" }

// Returns a boolean if any model has a status of loading
export const modelsLoading = derived(statusOfModels, statusObj => {
	return Object.values(statusObj).includes("LOADING");
})

// Updates a model's status based on its unique name
export const updateModelStatus = (name, status) => {
	statusOfModels.update(current => {
		return {
			...current,
			[name]: status,
		}
	})
}

// List of example model URLs
export const modelURL = {
	lc: "https://threejs.org/manual/examples/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
	cc: "cc.gltf",
};
/*
	Models taken from the threejs examples. 
	Little City model created by antonmoek:
	https://sketchfab.com/antonmoek
*/