var camera, scene, renderer, controls;
init();
animate();
window.addEventListener("resize", onWindowResize, false);
function init() {
  //RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
    antialias: true
  });
  renderer.setClearColor(0xfafafa);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapType = THREE.PCFSoftShadowMap;

  //SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfafafa);

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    12,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 500);
  // CONTROLS
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.minDistance = 200;
  controls.maxDistance = 500;

  //LIGHTS
  scene.add(new THREE.AmbientLight(0xfefefe));
  var light = new THREE.PointLight(0xffffff);
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  light.position.copy(camera.position);
  scene.add(light);

  // OBJECT

  var loader = new THREE.JSONLoader();
  loader.load("mesh.json", handle_load);
  function handle_load(geometry, materials) {
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);
    mesh.scale.multiplyScalar(5);
  }
}
function animate() {
  scene.rotation.x += 0.005;
  scene.rotation.y += 0.005;
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}