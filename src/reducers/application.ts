interface ApplicationAction {
  type: string;
}

const application = (state = "", action: ApplicationAction) => {
  switch (action.type) {
    case "TEST":
      return ["test"];
    default:
      return state;
  }
};

export default application;
