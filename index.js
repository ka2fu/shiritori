function loadScript(url) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

function loadStyle(url) {
  return new Promise((resolve) => {
    const link_tag = document.createElement("link");
    link_tag.rel = "stylesheet";
    link_tag.type = "text/css";
    link_tag.href = url;
    link_tag.onload = resolve;
    document.head.appendChild(link_tag);
  });
}

async function loadAllScripts(urls) {
  for (let url of urls) {
    await loadScript(url);
  }
}

async function loadAllStyles(urls) {
  for (let url of urls) {
    await loadStyle(url);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const args = {};
  // ?以降の結果を取得する
  document.location.search
    .substring(1)
    .split("&")
    .forEach((s) => {
      let [name, value] = s.split("=");
      // decode
      args[name] = decodeURIComponent(value);
    });
  const codelist = args["code"];
  const stylelist = args["style"];

  console.log("codelist", codelist);
  console.log("stylelist", stylelist);

  if (codelist) {
    let urls = codelist.split(/,/);
    loadAllScripts(urls);
  }

  if (stylelist) {
    let urls = stylelist.split(/,/);
    loadAllStyles(urls);
  }
});
