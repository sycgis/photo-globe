export interface GlobeAction {
  type: string;
  payload: any;
}

export interface GlobeState {
  location: {
    latitude: number;
    longitude: number;
  }
  rotation: {
    x: number;
    y: number;
  }
  zoom: number;
}

export const GlobeTypes = {
  SET_LOCATION: "SET_LOCATION",
  SET_ROTATION: "SET_ROTATION",
  SET_ZOOM: "SET_ZOOM",
};

const initialState: GlobeState = {
  location: {
    latitude: 0.25,
    longitude: 0,
  },
  rotation: {
    x: 0.25,
    y: 0,
  },
  zoom: 1,
};

const application = (state: GlobeState = initialState, action: GlobeAction) => {
  switch (action.type) {
    case GlobeTypes.SET_LOCATION:
      const {latitude, longitude} = action.payload;

      return {
        ...state,
        location: {latitude, longitude},
      };
    case GlobeTypes.SET_ROTATION:
      const {x, y} = action.payload;

      return {
        ...state,
        rotation: {
          x: x % (2 * Math.PI),
          y: y % (2 * Math.PI),
        },
      };
    case GlobeTypes.SET_ZOOM:
      return {
        ...state,
        zoom: action.payload,
      };
    default:
      return state;
  }
};

export default application;
