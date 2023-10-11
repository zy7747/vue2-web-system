import layout from "@/layout/config/index";

const config = {
  state: {
    layout: layout,
  },
  mutations: {
    setLayoutConfig(state, layout) {
      state.layout = layout;
    },
    removeLayoutConfig(state) {
      state.layout = layout;
    },
  },
};

export default config;
