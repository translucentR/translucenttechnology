"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MoonGlobe2 = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const initScene = () => {
    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(ambientLight);
    scene.add(directionalLight);
    sceneRef.current = scene;
  };

  const initCamera = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(15, aspectRatio, 1, 1000);
    camera.position.set(0, 0, 3);
    camera.lookAt(new THREE.Vector3(0, 1.2, 0));
    cameraRef.current = camera;
  };

  const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    }
  };

  const loadMoonModel = () => {
    const loader = new GLTFLoader();
    loader.load("/moon-blend-v2.glb", (gltf) => {
      if (sceneRef && sceneRef.current) {
        sceneRef.current.add(gltf.scene);
      }
    });
  };

  const onWindowResize = () => {
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };

  const animate = (renderer: THREE.WebGLRenderer) => {
    const render = () => {
      requestAnimationFrame(render);
      if (sceneRef.current && cameraRef.current) {
        renderer.render(sceneRef.current, cameraRef.current);
      }
    };
    render();
  };

  useEffect(() => {
    initScene();
    initCamera();
    initRenderer();
    loadMoonModel();
    animate(rendererRef.current!);

    window.addEventListener("resize", onWindowResize);
    const currentMount = mountRef.current;

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
        sceneRef.current?.clear();
        rendererRef.current.clear();
        cameraRef.current = null;
        rendererRef.current = null;
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default MoonGlobe2;
