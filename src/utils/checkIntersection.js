import { intersect, polygon as turfPolygon } from '@turf/turf';

const checkIntersections = (polyOne, polyTwo) => {
  if (polyOne.length <= 1 || polyTwo.length <= 1) return null;
  const polyIntersect = intersect(turfPolygon([polyOne]), turfPolygon([polyTwo]));
  return polyIntersect;
};
const checkIntersectionPromise = (polygonCoords, allPolygonsPoints) => {
  return new Promise((resolve, reject) => {
    if (
      checkIntersections(
        polygonCoords.concat([polygonCoords[0]]),
        allPolygonsPoints.concat([allPolygonsPoints[0]])
      ) === null
    ) {
      resolve(true);
    } else {
      reject("Zones can't be intersected");
    }
  });
};
export default checkIntersectionPromise;
