export const cubeParameters = {
  width: 1,
  height: 1,
  depth: 1,
  towerHeight: 3, // Cubes tower height
}
// Because our boxes have height, they will be placed a little under the floor by default.
// To fix that, we need to find an offset to push our cubes up by adding the offset to the y coordinate.
cubeParameters.yOffset = cubeParameters.height / 2;
