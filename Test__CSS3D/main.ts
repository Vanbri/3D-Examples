import * as THREE from "three";
import { OrbitControls, CSS3DRenderer, CSS3DObject } from "three/examples/jsm/Addons.js";

let camera: THREE.OrthographicCamera, scene2: THREE.Scene, renderer2: CSS3DRenderer;

const frustumSize = 500;

init();
animate();

function init() {

	const aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);

	camera.position.set(- 200, 200, 200);

	scene2 = new THREE.Scene();

	// left
	createPlane(
		100, 100,
		'chocolate',
		new THREE.Vector3(- 50, 0, 0),
		new THREE.Euler(0, - 90 * THREE.MathUtils.DEG2RAD, 0)
	);
	// right
	createPlane(
		100, 100,
		'saddlebrown',
		new THREE.Vector3(0, 0, 50),
		new THREE.Euler(0, 0, 0)
	);
	// top
	createPlane(
		100, 100,
		'yellowgreen',
		new THREE.Vector3(0, 50, 0),
		new THREE.Euler(- 90 * THREE.MathUtils.DEG2RAD, 0, 0)
	);
	// bottom
	createPlane(
		300, 300,
		'seagreen',
		new THREE.Vector3(0, - 50, 0),
		new THREE.Euler(- 90 * THREE.MathUtils.DEG2RAD, 0, 0)
	);

	//

	renderer2 = new CSS3DRenderer();
	renderer2.setSize(window.innerWidth, window.innerHeight);
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = '0';
	document.body.appendChild(renderer2.domElement);

	const controls = new OrbitControls(camera, renderer2.domElement);
	controls.minZoom = 0.5;
	controls.maxZoom = 2;

	function createPlane(width: number, height: number, cssColor: string, pos: THREE.Vector3, rot: THREE.Euler) {

		const element = document.createElement('div');
		element.style.width = width + 'px';
		element.style.height = height + 'px';
		element.style.opacity = '0.75';
		element.style.background = cssColor;

		const object = new CSS3DObject(element);
		object.position.copy(pos);
		object.rotation.copy(rot);
		scene2.add(object);

	}

	window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	camera.left = - frustumSize * aspect / 2;
	camera.right = frustumSize * aspect / 2;
	camera.top = frustumSize / 2;
	camera.bottom = - frustumSize / 2;

	camera.updateProjectionMatrix();

	renderer2.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);
	renderer2.render(scene2, camera);

}
