const WordsNinjaPack = require("wordsninja");
const WordsNinja = new WordsNinjaPack();

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
};
