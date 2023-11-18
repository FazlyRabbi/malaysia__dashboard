// utils/replaceImageLinksWithFullImageLinks.js
export function replaceImageLinkss(markdownText, branch) {
  const baseUrl = `https://github.com/abuanwar072/${branch}/raw/master`;

  // Replace image links with .png, .jpg, or .gif extensions

  const imageRegex = /!\[([^\]]+)\]\((\/?[^)]+\.(png|jpg|gif))\)/g;

  const textWithImagesReplaced = markdownText.replace(
    imageRegex,
    `![\$1](${baseUrl}$2)`
  );

  return textWithImagesReplaced;
}
