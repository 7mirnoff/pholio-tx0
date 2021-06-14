import GUM from './gum/gum'
import SRCS from './srcs'
import * as THREE from 'three'
import { computeFaceCentroids } from './utils'

window.onload = function () {
  director.init()
}

const director = {
  init: function () {
    function hideSimplePreloader () {
      document.querySelector('#simple_preloader').style.display = 'none'
    }

    function changeSimpleProgress (p) {
      document.querySelector('#simple_progress_bar').style.width = Math.round(p * 100) + '%'
    }

    this.g = new GUM({
      container: document.querySelector('#webgl_container'),
      renderData: {
        antialias: true,
        alpha: true
      }
    }, {
      srcs: SRCS.preloader,
      loadCb: () => {
        hideSimplePreloader()

        initScene(this.g)
      },
      progressCb: changeSimpleProgress
    })
  }
}

const initScene = (gum) => {
  const g = gum
  console.log(g)

  const objectArt = new THREE.Object3D()
  g.v.scene.add(objectArt)

  const geometry = new THREE.IcosahedronGeometry(1, 0)
  const material = new THREE.MeshMatcapMaterial({ matcap: g.d.res.textures.matcap })
  const icosahedron = new THREE.Mesh(geometry, material)
  objectArt.add(icosahedron)

  const sphereGeometry = new THREE.SphereGeometry(0.05,12,12)
  const sphereMaterial = new THREE.MeshMatcapMaterial({ matcap: g.d.res.textures.matcap2 })

  computeFaceCentroids(geometry)
  icosahedron.geometry.faces.forEach((face) => {
    const centerFace = face.centroid.clone()
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(centerFace.x, centerFace.y, centerFace.z)
    objectArt.add(sphere)
  })

  g.l.addLoop('rotate', () => {
    objectArt.rotation.y -= 0.002
  })
}
