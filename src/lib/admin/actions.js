export const removeNestedTags = (html, tag) => {
  let oldHtml;
  do {
    oldHtml = html;
    html = html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "g"), "");
  } while (html !== oldHtml);
  return html;
};
