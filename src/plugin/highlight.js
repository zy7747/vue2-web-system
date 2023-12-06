import hljs from "highlight.js"; // 导入代码高亮文件

//需要高亮的语言
hljs.registerLanguage("java", require("highlight.js/lib/languages/java"));
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("html", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("vue", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage("sql", require("highlight.js/lib/languages/sql"));
hljs.registerLanguage(
  "typescript",
  require("highlight.js/lib/languages/typescript")
);
hljs.registerLanguage("shell", require("highlight.js/lib/languages/shell"));
hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"));

function highlight(language, text) {
  const textBox = hljs.highlight(language, text || "", true).value;

  return `<div class="botTalkCode">${textBox}</div>`;
}

export default highlight;
