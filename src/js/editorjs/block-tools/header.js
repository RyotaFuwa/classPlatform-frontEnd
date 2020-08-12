import autosize from 'autosize';
import './code-snippet.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('bash', bash);


const codeIcon = '<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-code-slash edit-icon" fill="green" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill-rule="evenodd" stroke-width="2" d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/>' +
  ' </svg>'

const global = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe edit-icon" fill="black" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill-rule="evenodd" stroke-width="2" d="M1.018 7.5h2.49c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM2.255 4H4.09a9.266 9.266 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.024 7.024 0 0 0 2.255 4zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.077c-.67.204-1.335.82-1.887 1.855-.173.324-.33.682-.468 1.068H7.5V1.077zM7.5 5H4.847a12.5 12.5 0 0 0-.338 2.5H7.5V5zm1 2.5V5h2.653c.187.765.306 1.608.338 2.5H8.5zm-1 1H4.51a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm1 2.5V8.5h2.99a12.495 12.495 0 0 1-.337 2.5H8.5zm-1 1H5.145c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm-2.173 2.472a6.695 6.695 0 0 1-.597-.933A9.267 9.267 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM1.674 11H3.82a13.651 13.651 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm8.999 3.472A7.024 7.024 0 0 0 13.745 12h-1.834a9.278 9.278 0 0 1-.641 1.539 6.688 6.688 0 0 1-.597.933zM10.855 12H8.5v2.923c.67-.204 1.335-.82 1.887-1.855A7.98 7.98 0 0 0 10.855 12zm1.325-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm.312-3.5h2.49a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.91 4a9.277 9.277 0 0 0-.64-1.539 6.692 6.692 0 0 0-.597-.933A7.024 7.024 0 0 1 13.745 4h-1.834zm-1.055 0H8.5V1.077c.67.204 1.335.82 1.887 1.855.173.324.33.682.468 1.068z"/>' +
  '</svg>'


class CodeSnippet {
  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return {
      title: 'Code',
      icon: codeIcon,
    };
  }

  renderSettings() {
    let wrapper = document.createElement('div');
    this.settings.forEach( tune => {
      let button = document.createElement('div');
      button.classList.add('cdx-settings-button');
      button.innerHTML = tune.icon;
      wrapper.appendChild(button);
    })
    return wrapper;
  }

  constructor({data, config, api}) {
    this.data = {
      code: data.code || '',
    };
    this.nodes = {
      holder: null,
      codeArea: null,
    }
    this.settings = [
      {
        name: 'language',
        icon: global,
      }
    ]

    // set render elements
    const renderElement = document.createElement('div');
    renderElement.classList.add(api.styles.block, 'ce-code');

    const codeArea = document.createElement('textarea');
    codeArea.classList.add(api.styles.input, 'code-area');
    codeArea.textContent = this.data.code;
    autosize(codeArea);
    hljs.highlightBlock(codeArea);

    renderElement.appendChild(codeArea);
    this.nodes.holder = renderElement;
    this.nodes.codeArea = codeArea;
  }

  render() {
    return this.nodes.holder;
  }

  save(blockContent) {
    return {
      code: blockContent.querySelector('.code-area').value,
    }
  }
}

export default Code