import "highlight.js/styles/panda-syntax-dark.css";
import hljs from "highlight.js"; // 导入代码高亮文件

export default function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
}
