// 产品画像子项目注册验证：检查 OKComputer_基金画像构建 关键文件存在，并做 JS 语法解析。
// 路径使用 Unicode 转义，避免 Windows cmd 中文参数编码问题。
const fs = require("fs");

const base = "\u4EA7\u54C1\u753B\u50CF/OKComputer_\u57FA\u91D1\u753B\u50CF\u6784\u5EFA";
const htmlFiles = ["index.html", "analysis.html", "compare.html", "risk.html"];
const jsFiles = ["main.js", "analysis.js", "compare.js", "risk.js"];

for (const f of htmlFiles) {
  if (!fs.existsSync(`${base}/${f}`)) {
    console.error(`missing ${f}`);
    process.exit(1);
  }
}

for (const f of jsFiles) {
  try {
    // 仅做语法编译，不执行（浏览器全局可引用）
    new Function(fs.readFileSync(`${base}/${f}`, "utf8"));
  } catch (err) {
    console.error(`syntax error in ${f}: ${err.message}`);
    process.exit(1);
  }
}

console.log("chanpin-huaxiang verify OK");
