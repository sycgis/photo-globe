import * as React from 'react';
import * as THREE from 'three';
import { GlobeState } from "../reducers/globe";

interface GlobeProps extends GlobeState {}

const {Component} = React;

class Globe extends Component<GlobeProps,undefined> {
  private container: HTMLDivElement;
  private scene;
  private renderer;
  private mesh;
  private camera;

  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({alpha: true});

  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }

  componentDidMount() {
    const container = this.container;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    this.camera.position.z = 1000;

    const geometry = new THREE.SphereGeometry(200, 10, 10);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    container.appendChild(this.renderer.domElement);
    this.animate();
  }

  // We don't want to do a full re-render on this component, just rotate the globe.
  shouldComponentUpdate = () => false;

  render() {
    return (
      <div>
        <div style={{height: '500px', width: '500px'}} ref={(ref) => this.container = ref }/>
      </div>
    )
  }
}

export default Globe;
