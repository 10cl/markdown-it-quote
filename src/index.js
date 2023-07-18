const regex1 = /(\S+)\s?(\{([\d,-]+)})\s?(\{([\d,-]+)})\s?([\S]+)/i;
const regex2 = /(\S+)\s+(\{\d+-\d+\})?\s+(\S+)/i;
const regex3 = /(\S+)\s?(\{([\d,-]+)})/i;
const regex4 = /(\S+)\s+([^\{]\S+)/i;
const regex5 = /(\S+)/i;

export default (md) => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, , self] = args;
    const token = tokens[idx];

    if (
      !token.info ||
      !(
        regex1.test(token.info) ||
        regex2.test(token.info) ||
        regex3.test(token.info) ||
        regex4.test(token.info)
      )
    ) {
      return fence(...args);
    }

    let text = token.info;
    const matches = [];

    let match = regex1.exec(text);
    if (match !== null) {
      const language = match[1];
      const wrapLine = match[2] || null;
      const highlightLine = match[5] || null;
      const linkUrl = match[6];

      matches.push({
        language,
        wrapLine,
        highlightLine,
        linkUrl,
      });
    }

    if (matches.length === 0) {
      if ((match = regex2.exec(text)) !== null) {
        const language = match[1];
        const wrapLine = match[2] || null;
        const linkUrl = match[3];

        matches.push({
          language,
          wrapLine,
          linkUrl,
        });
      }
    }

    if (matches.length === 0) {
      if ((match = regex3.exec(text)) !== null) {
        const language = match[1];
        const highlightLine = match[2] || null;

        matches.push({
          language,
          highlightLine,
        });
      }
    }

    if (matches.length === 0) {
      if ((match = regex4.exec(text)) !== null) {
        const language = match[1];
        const linkUrl = match[2];

        matches.push({
          language,
          linkUrl,
        });
      }
    }

    if (matches.length === 0) {
      if ((match = regex5.exec(text)) !== null) {
        const language = match[1];

        matches.push({
          language,
        });
      }
    }

    let wrapLineNumbers;
    if (matches[0] && matches[0].wrapLine !== undefined) {
      wrapLineNumbers = matches[0].wrapLine
        .replace("{", "")
        .replace("}", "")
        .split(",")
        .map((v) => v.split("-").map((v) => parseInt(v, 10)));
    }

    let linkUrl = matches[0] && matches[0].linkUrl;
    if (linkUrl !== undefined) {
      linkUrl = linkUrl.replace("(", "").replace(")", "");
    }

    let lineNumbersCode = "";
    let highlightWrapCode = "";
    let lineNumbersWrapperCode = "";
    let lines = [];
    let extraClassName = "extra-class";
    const langName = matches[0].language;

    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content;

    if (matches[0] && (matches[0].highlightLine !== undefined || matches[0].wrapLine !== undefined)) {
      extraClassName = "line-numbers-mode";
      lines = code.split("\n");
      lines.pop();

      let wrapLineNumStart = 1;
      if (wrapLineNumbers !== undefined) {
        wrapLineNumStart = parseInt(wrapLineNumbers[0]);
      }

      let highLightLineNumbers = matches[0] && matches[0].highlightLine;

      if (highLightLineNumbers !== undefined) {
        highLightLineNumbers = highLightLineNumbers
          .replace("{", "")
          .replace("}", "")
          .split(",")
          .map((v) => v.split("-").map((v) => parseInt(v, 10)));
      }

      lines.map((split, index) => {
        const lineNumber = index + wrapLineNumStart;
        lineNumbersCode += `<span class="line-number">${lineNumber}</span><br>`;

        let inRange = false;
        if (highLightLineNumbers !== undefined) {
          inRange = highLightLineNumbers.some(([start, end]) => {
            if (start && end) {
              return lineNumber >= start && lineNumber <= end;
            }
            return lineNumber === start;
          });

          if (inRange) {
            highlightWrapCode += `<div class="highlighted">&nbsp;</div>`;
          } else {
            highlightWrapCode += `<br>`;
          }
        }
      });

      lineNumbersWrapperCode = `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`;
      if (highLightLineNumbers !== undefined) {
        highlightWrapCode = `<div class="highlight-lines">${highlightWrapCode}</div>`;
      }
    }

    let generateCode = `${code.trim()}`;
    if (linkUrl !== undefined) {
      if (highlightWrapCode !== "" || lineNumbersWrapperCode !== ""){
        extraClassName = "line-numbers-mode line-numbers-source";
      }
      const gistInfo = `<div class="gist-meta-quote"><a href="${linkUrl}" target="_blank">view raw</a></div>`;
      return `<div class="language-${langName} ${extraClassName}">${highlightWrapCode}${generateCode}${gistInfo}${lineNumbersWrapperCode}</div>`;
    } else {
      return `<div class="language-${langName} ${extraClassName}">${highlightWrapCode}${generateCode}${lineNumbersWrapperCode}</div>`;
    }
  };
};
