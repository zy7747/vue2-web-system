const typewriterButton = require("@/assets/audio/button/typewriter-button.mp3");
const button2 = require("@/assets/audio/button/button2.mp3");

export default {
  bind(el, binding) {
    el.addEventListener("click", () => {
      let audio;
      switch (binding.value) {
        case "typewriterButton":
          audio = new Audio(typewriterButton);
          break;
        case "button2":
          audio = new Audio(button2);
          break;
        default:
          break;
      }

      audio.play();
    });
  },
};
