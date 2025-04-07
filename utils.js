const WordsNinjaPack = require("wordsninja");
const WordsNinja = new WordsNinjaPack();
const vscode = require("vscode");
const yaml = require("js-yaml");
function injectWords() {
  WordsNinja.addWords("kube");
}

function convertToLowerSnakeCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toLowerCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toLowerCase() + "_";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToUpperSnakeCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toUpperCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toUpperCase() + "_";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToLowerKebabCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toLowerCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toLowerCase() + "-";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToUpperKebabCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toUpperCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += words[i].toUpperCase() + "-";
          }
          resolve(res.slice(0, -1));
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToLowerCamelCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);
        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(words.toLowerCase());
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            if (i == 0) {
              res += words[i].toLowerCase();
            } else {
              res += capitalizeFirstLetter(words[i].toLowerCase());
            }
          }
          resolve(res);
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

function convertToUpperCamelCase(str) {
  return new Promise((resolve, reject) => {
    const _run = async () => {
      try {
        await WordsNinja.loadDictionary();
        injectWords();
        const words = WordsNinja.splitSentence(str);

        let res = "";

        if (typeof words === "string") {
          // 如果值是字符串类型
          resolve(capitalizeFirstLetter(words.toLowerCase()));
        } else if (Array.isArray(words)) {
          for (let i = 0; i < words.length; i++) {
            res += capitalizeFirstLetter(words[i].toLowerCase());
          }
          resolve(res);
        } else {
          reject(new Error("Invalid input"));
        }
      } catch (error) {
        reject(error);
      }
    };
    _run();
  });
}

// 首字母大写
function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return str; // 空字符串不做处理
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const restOfTheString = str.slice(1);

  return firstLetter + restOfTheString;
}

function findParentKeyRecursive(data, targetKey, currentPath = "") {
  const paths = [];
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const newPath = currentPath ? `${currentPath}[${i}]` : `[${i}]`;
        const subPaths = findParentKeyRecursive(data[i], targetKey, newPath);
        paths.push(...subPaths);
      }
    } else {
      for (const [key, value] of Object.entries(data)) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        if (key === targetKey) {
          paths.push(newPath);
        }
        const subPaths = findParentKeyRecursive(value, targetKey, newPath);
        paths.push(...subPaths);
      }
    }
  }
  return paths;
}

// 在 yaml 文件下 复制内容转换为路径
function copyYamlToPath(str) {
  const editor = vscode.window.activeTextEditor;
  // 判断当前选择的是 yaml 文件
  if (!editor) {
    vscode.window.showErrorMessage("没有活动的文本编辑器");
    return;
  }
  const document = editor.document;
  // 获取文档的语言 ID
  const languageId = document.languageId;
  if (languageId !== "yaml" && languageId !== "yml") {
    vscode.window.showErrorMessage("当前文件不是 yaml(yml) 文件");
    return;
  }
  // 获取当前选中的 yaml 内容
  const text = document.getText();
  try {
    const parsedYaml = yaml.load(text);
    const paths = findParentKeyRecursive(parsedYaml, str);
    if (paths.length > 0) {
      // 复制到剪切板
      // vscode.env.clipboard.writeText(combinedPaths);
      // vscode.window.showInformationMessage(`复制成功: ${combinedPaths}`);
      if (paths.length === 1) {
        vscode.env.clipboard.writeText(paths[0]);
        vscode.window.showInformationMessage(`复制成功: ${paths[0]}`);
        return;
      }
      // 打开弹窗 渲染列表
      const panel = vscode.window.createWebviewPanel(
        "pathList",
        "YamlToPath",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );
      panel.webview.html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>YamlToPath</title>
        </head>
        <style>
          * {
            margin: 0;
            padding: 0;
          }
          ul {
            padding: 24px 0 0 0;
            list-style-type: none;
          }
          li {
            margin-bottom: 10px;
            font-size: 18px;
          }
          button {
            color: #fff;
            background-color:rgb(4, 95, 186);
            border-color: rgb(4, 95, 186);
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            border: 1px solid #dcdfe6;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            padding: 4px 10px;
            font-size: 14px;
            border-radius: 4px;
          }
          button:hover {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
          }
          button:active,
          button:focus {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #fff;
          }            
        </style>
        <body>
          <ul>
            ${paths
              .map(
                (path) =>
                  `<li>
                    <span>${path}</span>
                    <button onclick="copyToClipboard('${path}')">COPY</button>
                  </li>`
              )
              .join("")}
          </ul>
           <script>
              function copyToClipboard(path) {
                navigator.clipboard.writeText(path)
              }
            </script>
        </body>
      </html>
    `;
    } else {
      vscode.window.showInformationMessage(`未找到键 ${str} 的路径`);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`解析 YAML 时出错: ${error}`);
  }
}

module.exports = {
  convertToLowerSnakeCase,
  convertToUpperSnakeCase,
  convertToLowerKebabCase,
  convertToUpperKebabCase,
  convertToLowerCamelCase,
  convertToUpperCamelCase,
  asyncFn(fn) {
    return new Promise((resolve) => {
      fn.then((result) => resolve([null, result])).catch((error) =>
        resolve([error || true, null])
      );
    });
  },
  copyYamlToPath,
};
