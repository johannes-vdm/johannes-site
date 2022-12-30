async function getReadmeContent() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/johannes-vdm/dalle-2-dashboard/master/Readme.md');
    const readmeContent = await response.text();
    return readmeContent;
  } catch (error) {
    console.error(error);
    return 'Error: Unable to retrieve readme content';
  }
}

async function main(element) {
  try {
    const readmeContent = await getReadmeContent();
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    });

    element.innerHTML =
      marked.parse(readmeContent);

  } catch (error) {
    console.error(error);
    document.getElementById('content').innerHTML = 'Error: Unable to parse readme content';
  }
}

const element = document.getElementById('content');
if (element) {
  main(element);
}
