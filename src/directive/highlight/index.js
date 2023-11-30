import hl from "highlight.js"; // 导入代码高亮文件
import "highlight.js/styles/a11y-dark.css"; // 导入代码高亮样式

export default function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hl.highlightBlock(block);
  });
}
