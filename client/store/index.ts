interface Tag {
  name: string;
  color: string;
}

interface State {
  tags: Tag[] | null;
}

const initialStore: State = {
  tags: null
};

export const state = () => {
  return initialStore;
};

export const mutations = {
  setTag(state: State, tag: Tag) {
    state.tags = [tag, ...state.tags];
  }
};

export const actions = {
  formatTag({ commit }, tagMessage: any) {
    console.log("incoming tag", tagMessage);
    commit("setTag", tagMessage);
  }
};
