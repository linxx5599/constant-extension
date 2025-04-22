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
            if (i === 0) {
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
const SEARCH_STR = "sdsdfdfghgjhksddszdxzxcdfdfdfdfdfdsafderetrhfghfsdf";
function dfs(obj, path, searchStr) {
  let testPath;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      testPath = JSON.parse(JSON.stringify(path));
      testPath.push(`[${i}]`);
      if (obj[i] === searchStr) {
        return testPath;
      } else if (typeof obj[i] === "object" && obj[i] !== null) {
        const dfsResult = dfs(obj[i], testPath, searchStr);
        if (dfsResult !== undefined) {
          return dfsResult;
        }
      }
    }
  } else {
    for (const key in obj) {
      testPath = JSON.parse(JSON.stringify(path));
      testPath.push(key);
      if (obj[key] === searchStr) {
        return testPath;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const dfsResult = dfs(obj[key], testPath, searchStr);
        if (dfsResult !== undefined) {
          return dfsResult;
        }
      }
    }
  }
}
function copyYamlPath() {
  const textEditor = vscode.window.activeTextEditor;
  if (textEditor !== undefined) {
    const selectedLine = textEditor.selection.active.line;
    const selection = new vscode.Selection(
      0,
      0,
      selectedLine,
      textEditor.document.lineAt(selectedLine).range.end.character
    );
    const yamlString = textEditor.document.getText(selection);
    const yamlLines = yamlString.split(/\r?\n/);
    const lastLine = yamlLines[yamlLines.length - 1];
    const propertyData = lastLine.split(":", 1);
    propertyData[1] = `${SEARCH_STR}`;
    yamlLines[yamlLines.length - 1] = propertyData.join(": ");
    const yamlData = yaml.load(yamlLines.join("\n"));
    const objPath = dfs(yamlData, [], `${SEARCH_STR}`);
    const path = objPath.join(".");
    vscode.window.showInformationMessage(`复制成功: ${path}`);
    vscode.env.clipboard.writeText(path);
  }
}

function copyYamlJson() {
  const textEditor = vscode.window.activeTextEditor;
  if (textEditor !== undefined) {
    const selectedLine = textEditor.selection.active.line;
    const selection = new vscode.Selection(
      0,
      0,
      selectedLine,
      textEditor.document.lineAt(selectedLine).range.end.character
    );
    const yamlString = textEditor.document.getText(selection);
    const yamlLines = yamlString.split(/\r?\n/);
    const lastLine = yamlLines[yamlLines.length - 1];
    const propertyData = lastLine.split(":", 1);
    propertyData[1] = `${SEARCH_STR}`;
    yamlLines[yamlLines.length - 1] = propertyData.join(": ");
    const yamlData = yaml.load(yamlLines.join("\n"));
    const objPath = dfs(yamlData, [], `${SEARCH_STR}`);
    const result = {};
    let current = result;
    objPath.forEach((curr, i) => {
      const value = objPath[i + 1];
      const isArray = /^\[\d+\]$/.test(value);
      const k = isArray ? curr.replace(/^\[/, "").replace(/\]$/, "") : curr;
      const v = isArray ? [] : {};
      if (Array.isArray(current)) {
        current.push(v);
      } else {
        current[k] = v;
      }
      current = v;
    });
    const jsonStr = JSON.stringify(result, null, 2);
    vscode.window.showInformationMessage(`复制成功: ${jsonStr}`);
    vscode.env.clipboard.writeText(jsonStr);
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
  copyYamlPath,
  copyYamlJson,
};
