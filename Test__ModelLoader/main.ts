import * as THREE from "three";
import { OrbitControls, FBXLoader, GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 5);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(10, 10, 10);
	scene.add(directionalLight);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
}

function loadModel(data: string | ArrayBuffer, extension: string) {
	switch (extension) {
		case "fbx":
			const fbxLoader = new FBXLoader();
			const fbx = fbxLoader.parse(data as ArrayBuffer, "");
			fbx.scale.set(0.01, 0.01, 0.01);
			scene.add(fbx);
			break;

		case "glb":
		case "gltf":
			const gltfLoader = new GLTFLoader();
			gltfLoader.parse(data as ArrayBuffer, "", (gltf) => {
				scene.add(gltf.scene);
			}, console.error);
			break;

		case "obj":
			const objLoader = new OBJLoader();
			const obj = objLoader.parse(data as string);
			scene.add(obj);
			break;

		default:
			console.warn("No se reconoce el tipo de archivo");
	}
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

init();

document.getElementById("file-input")!.addEventListener("change", (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (input.files && input.files.length > 0) {
		const file = input.files[0];
		const extension = file.name.split('.').pop()?.toLowerCase();

		const reader = new FileReader();
		reader.onload = function (e) {
			const contents = e.target?.result;

			if (typeof contents === "string" || contents instanceof ArrayBuffer) {
				loadModel(contents, extension!);
			}
		};

		if (extension === "fbx" || extension === "glb" || extension === "gltf") {
			reader.readAsArrayBuffer(file); // binarios
		} else if (extension === "obj") {
			reader.readAsText(file); // texto
		} else {
			alert("Formato no soportado");
		}
	}
});

animate();
