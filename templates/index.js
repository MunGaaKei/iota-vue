/*
 * 运行 npm make ${ComponentName} 创建组件文件夹模板
 */

import fs from "fs";
import { resolve, join } from "path";
import chalk from "chalk";
import { tplComponent, tplExport } from "./templates.js";

const __dirname = resolve();
const args = process.argv.slice(2);
const name = args[0];

if (!name) {
  console.log(chalk.redBright("请输入组件名称"));
} else {
  const lowername = name.toLowerCase();
  const targetDir = join(__dirname, "/packages/components/", lowername);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.redBright(`创建失败：目录文件夹 ${lowername} 已存在`));
  } else {
    fs.mkdirSync(targetDir);

    generate(targetDir, tplComponent, name, `${lowername}.vue`);
    generate(targetDir, tplExport, name, "index.ts");
    generate(targetDir, "", name, `${lowername}.scss`);
  }
}

function generate(path, tpl, name, filename) {
  const targetFile = `${path}/${filename}`;

  if (fs.existsSync(targetFile)) {
    console.log(chalk.redBright(`创建失败：组件文件 ${name} 已存在`));
  } else {
    tpl = tpl.replace(
      /(\{\{name\}\})|(\{\{lowername\}\})/g,
      (match, p1, p2) => {
        if (p1) {
          return name;
        } else if (p2) {
          return name.toLowerCase();
        } else {
          return match;
        }
      }
    );

    fs.writeFile(targetFile, tpl, (err) => {
      err && console.log(chalk.redBright(`创建失败：${err}`));
    });
  }
}
