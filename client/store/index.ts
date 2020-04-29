import { Tag } from "../../shared/interfaces";

interface State {
  tags: Tag[];
}

const initialStore: State = {
  tags: []
};

export const state = () => {
  return initialStore;
};

export const mutations = {
  setTag(state: State, tag: Tag) {
    state.tags.unshift(tag);
  },
  setTags(state: State, tags: Tag[]) {
    state.tags = tags;
  }
};
