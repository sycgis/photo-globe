import * as React from 'react';
import * as THREE from 'three';
import {GlobeState} from "../reducers/globe";

interface GlobeProps extends GlobeState {
  setLocation: Function;
}

const {Component} = React;

class Globe extends Component<GlobeProps,undefined> {
  private container: HTMLDivElement;
  private scene;
  private group;
  private renderer;
  private earth;
  private earthMaterial;
  private earthMesh;
  private clouds;
  private cloudsMaterial;
  private cloudsMesh;
  private camera;
  private rotation: {x: number, y: number};
  private size: {width: number, height: number};

  // Point of interest
  private location: {latitude: number, longitude: number};

  constructor(props) {
    super(props);

    this.rotation = {x: 0, y: 0};
    this.size = {width: 1, height: 1};

    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.earth = new THREE.SphereGeometry(400, 32, 32);
    this.earthMaterial = new THREE.MeshPhongMaterial({overdraw: 0.5});
    this.earthMesh = new THREE.Mesh(this.earth, this.earthMaterial);
    this.group.add(this.earthMesh);

    this.clouds = new THREE.SphereGeometry(405, 32, 32);
    this.cloudsMaterial = new THREE.MeshPhongMaterial({opacity: 0.8, transparent: true});
    this.cloudsMesh = new THREE.Mesh(this.clouds, this.cloudsMaterial);
    this.group.add(this.cloudsMesh);

    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.earthMesh.rotation.x = this.rotation.x;
    this.earthMesh.rotation.y = this.rotation.y;

    this.cloudsMesh.rotation.x = this.rotation.x;
    this.cloudsMesh.rotation.y = this.rotation.y;

    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    const width = this.container.offsetWidth;
    const height = width;

    this.earth.radius = width / 2;
    this.clouds.radius = (width / 2) * 1.05;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    this.size = {width, height};
  }

  private loadTexture() {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load('static/textures/earth-texture-map.jpg', (texture) => {
        this.earthMaterial.map = texture;
        resolve();
      });
    });
  }

  private loadBumpMap() {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load('static/textures/earth-bump-map.jpg', (texture) => {
        this.earthMaterial.bumpMap = texture;
        this.earthMaterial.bumpScale = 10;
        resolve();
      });
    });
  }

  private loadSpecMap() {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load('static/textures/earth-spec-map.jpg', (texture) => {
        this.earthMaterial.specularMap = texture;
        this.earthMaterial.shininess = 100;
        resolve();
      });
    });
  }

  private loadCloudMap() {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load('static/textures/earth-cloud-map.jpg', (texture) => {
        this.cloudsMaterial.map = texture;
        this.cloudsMaterial.alphaMap = texture;
        resolve();
      });
    });
  }

  private letThereBeLight() {
    const ambient = new THREE.AmbientLight(0x404040, 2); // soft white light
    const hemisphere = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    const spot = new THREE.SpotLight(0xffffff, 0.75);
    spot.position.set(-750, 750, 750);

    this.scene.add(ambient);
    this.scene.add(hemisphere);
    this.scene.add(spot);
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(60, this.size.width / this.size.height, 1, 2000);
    this.camera.position.z = 1000;

    this.container.appendChild(this.renderer.domElement);

    setInterval(() => {
      this.rotation.y = this.rotation.y + 0.001;
    }, 10);

    Promise.all([
      this.loadTexture(),
      this.loadBumpMap(),
      this.loadSpecMap(),
      this.loadCloudMap(),
    ]).then(this.letThereBeLight.bind(this))
      .then(() => setTimeout(() => {
        const classes = this.container.className;
        this.container.className = `${classes} mounted`;
      }, 100));

    this.animate();
    setTimeout(() => this.resize(), 1); // This timing hack seems to be the only way to get it to run correctly.

    // The globe needs to be 'responsive'
    window.addEventListener("resize", this.resize.bind(this));
  }

  componentWillReceiveProps(newProps: GlobeProps) {
    this.location = newProps.location;
  }

  // We don't want to do a full re-render on this component, just rotate the globe.
  shouldComponentUpdate = () => false;

  render() {
    return (
      <div className="three-js-mount" ref={(ref) => this.container = ref }/>
    )
  }
}

export default Globe;
