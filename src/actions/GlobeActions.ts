import { GlobeTypes, GlobeAction } from "../reducers/globe";

export const setLocation = (latitude: number, longitude: number): GlobeAction => ({
  type: GlobeTypes.SET_LOCATION,
  payload: {latitude, longitude},
});

export default {
  setLocation,
}
