import * as THREE from 'three';
import EventEmitter from './EventEmmiter.js';
import sources from '../sources.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.SetLoaders();
    this.startLoading();
  }

  SetLoaders() {
    this.loaders = {}

    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    this.sources.forEach(source => {
      switch (source.type) {
        case 'texture':
          this.loaders.textureLoader.load(
            source.path,
            (file) => this.sourceLoaded(source, file),
          );

        case 'cubeTexture': {
          this.loaders.cubeTextureLoader.load(
            source.path,
            (file) => this.sourceLoaded(source, file),
          )
        }
      }
    })
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.toLoad === this.loaded) this.trigger('loaded');
  }
}
