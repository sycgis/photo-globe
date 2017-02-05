interface GlobeAction {
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

const initialState: GlobeState = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  zoom: 1,
};

const application = (state: GlobeState = initialState, action: GlobeAction) => {
  switch (action.type) {
    case "set-location":
      const {latitude, longitude} = action.payload;

      return {
        ...state,
        location: {
          latitude,
          longitude,
        },
      };
    case "set-zoom":
      return {
        ...state,
        zoom: action.payload,
      };
    default:
      return state;
  }
};

export default application;
