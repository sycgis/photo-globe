export interface GlobeAction {
  type: string;
  payload: any;
}

export interface GlobeState {
  location: {
    latitude: number;
    longitude: number;
  }
  zoom: number;
}

export const GlobeTypes = {
  SET_LOCATION: "SET_LOCATION",
  SET_ZOOM: "SET_ZOOM",
};

const initialState: GlobeState = {
  location: {
    latitude: 0.25,
    longitude: 0,
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
