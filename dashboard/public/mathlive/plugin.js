tinymce.PluginManager.add("mathlive", function (editor, url) {
  let settings = editor.getParam("mathlive");
  // let mathjaxTempClassName = mathjaxClassName + "-original";
  // let mathjaxConfigUrl = (settings.configUrl || url + "/config.js") + "?class=" + mathjaxTempClassName;
  // let mathScripts = [mathjaxConfigUrl];
  let math = {
    latex: "",
    html_latex: "",
    currentTarget: "",
  };
  let mathScripts = [];
  let mathLiveUrl = settings.mathliveCDN || null;
  if (mathLiveUrl) {
    mathScripts.push(mathLiveUrl);
    mathScripts.push("/temml/temml.cjs");
  }
  //init
  editor.on("init", () => {
    var scriptLoader = new tinymce.dom.ScriptLoader();
    mathScripts.forEach(item => {
      scriptLoader.add(item);
    });
    scriptLoader.loadQueue();
    setOnClickEquationContent(editor);
  });
  editor.addCommand("window", (data = {}) => {
    let mathlive = editor.id + "_" + editor.dom.uniqueId();
    if (Object.keys(data).length > 0) {
      editor.windowManager.open({
        title: "Mathlive",
        width: 600,
        height: 300,
        body: {
          type: "panel",
          items: [
            {
              type: "htmlpanel",
              html: `<math-field id="${mathlive}" 
              style="
                vertical-align: middle;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, .3);
                padding-left: 5px; 
                padding-right: 5px;
                width: 100% !important;
              "
              >${data.latex || ""}</math-field>`,
            },
          ],
        },
        onSubmit: () => {
          editor.execCommand("insert", {
            html: math.html_latex,
            latex: math.latex,
            currentTarget: data.currentTarget,
          });
          editor.windowManager.close();
        },
        buttons: [
          {
            text: "Close",
            type: "cancel",
            onclick: "close",
          },
          {
            text: "Insert",
            type: "submit",
            primary: true,
            enabled: false,
          },
        ],
      });
    } else {
      editor.windowManager.open({
        title: "Equation Editor",
        width: 600,
        height: 300,
        body: {
          type: "panel",
          items: [
            {
              type: "htmlpanel",
              html: `<math-field id="${mathlive}" 
              style="
                vertical-align: middle;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, .3);
                padding-left: 5px; 
                padding-right: 5px;
                width: 100% !important;
              "
              ></math-field>`,
            },
          ],
        },
        onSubmit: () => {
          editor.execCommand("insert", {
            html: math.html_latex,
            latex: math.latex,
            currentTarget: math.currentTarget,
          });
          editor.windowManager.close();
        },
        buttons: [
          {
            text: "Close",
            type: "cancel",
            onclick: "close",
          },
          {
            text: "Insert",
            type: "submit",
            primary: true,
            enabled: false,
          },
        ],
      });
    }

    const mathContainer = document.getElementById(mathlive);
    mathContainer.addEventListener("input", ev => {
      math.latex = ev.target.value;
      math.html_latex = temml.renderToString(ev.target.value);
      // math.html_latex = temml.renderToString(ev.target.value);
    });
  });
  editor.addCommand("insert", data => {
    if (!data) {
      return;
    }
    const content = `
    <span class='mq-math-mode' data-latex='${data.latex}'>
        ${data.html}
    </span>&nbsp;`;
    if (data.currentTarget) {
      editor.selection.select(data.currentTarget);
    }
    editor.selection.setContent(content);
    setOnClickEquationContent(editor);
  });
  editor.ui.registry.addButton("mathlive", {
    // text: "Σ",
    icon:"character-count",
    tooltip: "Equation Editor",
    onAction: () => {
      editor.execCommand("window");
    },
  });
});
function setOnClickEquationContent(editor) {
  const tinymceDoc = editor.getDoc();
  const mqSpan = tinymceDoc.getElementsByClassName("mq-math-mode");

  for (const equationContent of mqSpan) {
    equationContent.contentEditable = "false";
    if (equationContent.onclick) {
      continue;
    }

    equationContent.onclick = event => {
      event.stopPropagation();
      editor.execCommand("window", {
        latex: event.currentTarget.dataset.latex,
        currentTarget: event.currentTarget,
      });
    };
  }
}
