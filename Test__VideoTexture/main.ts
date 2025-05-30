import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

init();

const video = document.createElement('video');
video.src = './Graph.mp4';
video.muted = true;
video.loop = true;
video.autoplay = true;

video.addEventListener('canplaythrough', () => {

	const geometry = new THREE.PlaneGeometry(video.videoWidth / video.videoHeight, 1);
	const material = new THREE.MeshBasicMaterial({ map: new THREE.VideoTexture(video) });

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	video.play().catch(e => console.warn('Error al reproducir video:', e));

});


animate();
