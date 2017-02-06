import { GlobeTypes, GlobeAction } from "../reducers/globe";

export const setLocation = (latitude: number, longitude: number): GlobeAction => ({
  type: GlobeTypes.SET_LOCATION,
  payload: {latitude, longitude},
});

export const setRotation = (x: number, y: number): GlobeAction => ({
  type: GlobeTypes.SET_ROTATION,
  payload: {x, y},
});

export default {
  setLocation,
  setRotation,
}
