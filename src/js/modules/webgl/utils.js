import * as THREE from 'three'

export const computeFaceCentroids = (geometry) => {
  let f;
  let fl;
  let face;
  for (f = 0, fl = geometry.faces.length; f < fl; f ++) {
    face = geometry.faces[ f ];
    face.centroid = new THREE.Vector3(0, 0, 0)
    if ( face instanceof THREE.Face3 ) {
      face.centroid.add(geometry.vertices[ face.a ])
      face.centroid.add(geometry.vertices[ face.b ])
      face.centroid.add(geometry.vertices[ face.c ])
      face.centroid.divideScalar(3)
    }
  }
}
