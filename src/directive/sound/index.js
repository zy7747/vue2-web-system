// 全局按键音效
const input = require("@/assets/audio/input/input.mp3");
const search = require("@/assets/audio/button/search.mp3");

export default {
  bind(el, binding) {
    el.addEventListener("click", () => {
      let audio;
      switch (binding.value) {
        case "input":
          audio = new Audio(input);
          break;
        case "search":
          audio = new Audio(search);
          break;
        default:
          break;
      }

      audio.play();
    });
  },
};
