import * as ace from 'brace';
import * as Mock from 'mockjs';
import 'brace/mode/javascript' ;
import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/mode/html';
import 'brace/theme/xcode';
import 'brace/ext/language_tools.js';
import * as json5 from 'json5';
import * as MockExtra from './mock-extra';

var langTools = ace.acequire('ace/ext/language_tools'),
  wordList = [
    { name: '字符串', mock: '@string' },
    { name: '自然数', mock: '@natural' },
    { name: '浮点数', mock: '@float' },
    { name: '字符', mock: '@character' },
    { name: '布尔', mock: '@boolean' },
    { name: 'url', mock: '@url' },
    { name: '域名', mock: '@domain' },
    { name: 'ip地址', mock: '@ip' },
    { name: 'id', mock: '@id' },
    { name: 'guid', mock: '@guid' },
    { name: '当前时间', mock: '@now' },
    { name: '时间戳', mock: '@timestamp' },
    { name: '日期', mock: '@date' },
    { name: '时间', mock: '@time' },
    { name: '日期时间', mock: '@datetime' },
    { name: '图片连接', mock: '@image' },
    { name: '图片data', mock: '@imageData' },
    { name: '颜色', mock: '@color' },
    { name: '颜色hex', mock: '@hex' },
    { name: '颜色rgba', mock: '@rgba' },
    { name: '颜色rgb', mock: '@rgb' },
    { name: '颜色hsl', mock: '@hsl' },
    { name: '整数', mock: '@integer' },
    { name: 'email', mock: '@email' },
    { name: '大段文本', mock: '@paragraph' },
    { name: '句子', mock: '@sentence' },
    { name: '单词', mock: '@word' },
    { name: '大段中文文本', mock: '@cparagraph' },
    { name: '中文标题', mock: '@ctitle' },
    { name: '标题', mock: '@title' },
    { name: '姓名', mock: '@name' },
    { name: '中文姓名', mock: '@cname' },
    { name: '中文姓', mock: '@cfirst' },
    { name: '中文名', mock: '@clast' },
    { name: '英文姓', mock: '@first' },
    { name: '英文名', mock: '@last' },
    { name: '中文句子', mock: '@csentence' },
    { name: '中文词组', mock: '@cword' },
    { name: '地址', mock: '@region' },
    { name: '省份', mock: '@province' },
    { name: '城市', mock: '@city' },
    { name: '地区', mock: '@county' },
    { name: '转换为大写', mock: '@upper' },
    { name: '转换为小写', mock: '@lower' },
    { name: '挑选（枚举）', mock: '@pick' },
    { name: '打乱数组', mock: '@shuffle' },
    { name: '协议', mock: '@protocol' }
  ];

let dom = ace.acequire('ace/lib/dom');
ace.acequire('ace/commands/default_commands').commands.push({
  name: 'Toggle Fullscreen',
  bindKey: 'F9',
  exec: function(editor:any) {
    if (editor._fullscreen_yapi) {
      let fullScreen = dom.toggleCssClass(document.body, 'fullScreen');
      dom.setCssClass(editor.container, 'fullScreen', fullScreen);
      editor.setAutoScrollEditorIntoView(!fullScreen);
      editor.resize();
    }
  }
});

interface EditorInstance {
  curData: {
    text: string;
    format: boolean;
    jsonData: any;
    mockData: () => any;
  };
  getValue: () => string;
  setValue: (data: string) => void;
  editor: any;
  options: {
    container?: string;
    data?: string;
    onChange?: (d: any) => void;
    readOnly?: boolean;
    fullScreen?: boolean;
    wordList?: {
      name: string;
      mock: string;
    };
  };
  insertCode: (code: string) => void;
}




function run(options: {
  container?: string;
  data?: string;
  onChange?: (d: any) => void;
  readOnly?: boolean;
  fullScreen?: boolean;
  wordList?: {
    name: string;
    mock: string;
  }[];
}): 
EditorInstance 
{
  let editor: any, mockEditor: any, rhymeCompleter: any;

  function handleJson(json: string) {
    const curData = mockEditor.curData;
    try {
      curData.text = json;
      const obj = json5.parse(json);
      curData.format = true;
      curData.jsonData = obj;
      curData.mockData = () => Mock.mock(MockExtra(obj, {}));
    } catch (e) {
      curData.format = e.message;
    }
  }

  options = options || {};
  const container = options.container || 'mock-editor';
  const data = options.data || '';
  const readOnly = options.readOnly || false;
  const fullScreen = options.fullScreen || false;

  editor = ace.edit(container);
  editor.$blockScrolling = Infinity;
  editor.getSession().setMode('ace/mode/javascript');
  if (options.readOnly === true) {
    editor.setReadOnly(true);
    editor.renderer.$cursorLayer.element.style.display = 'none';
  }
  editor.setTheme('ace/theme/xcode');
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: false,
    enableLiveAutocompletion: true,
    useWorker: true
  });
  editor._fullscreen_yapi = options.fullScreen;
  mockEditor = {
    curData: {},
    getValue: () => mockEditor.curData.text,
    setValue: function(data: string) {
      editor.setValue(handleData(data));
    },
    editor: editor,
    options: options,
    insertCode: (code: string) => {
      let pos = editor.selection.getCursor();
      editor.session.insert(pos, code);
    }
  };

  function formatJson(json: string) {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch (err) {
      return json;
    }
  }

  function handleData(data: string) {
    data = data || '';
    if (typeof data === 'string') {
      return formatJson(data);
    } else if (typeof data === 'object') {
      return JSON.stringify(data, null, '  ');
    } else {
      return '' + data;
    }
  }

  rhymeCompleter = {
    identifierRegexps: [/[@]/],
    getCompletions: function(editor: any, session: any, pos: any, prefix: any, callback: any) {
      if (prefix.length === 0) {
        callback(null, []);
        return;
      }
      callback(
        null,
        wordList.map(function(ea) {
          return { name: ea.mock, value: ea.mock, score: ea.mock, meta: ea.name };
        })
      );
    }
  };

  langTools.addCompleter(rhymeCompleter);
  mockEditor.setValue(handleData(data));
  handleJson(editor.getValue());

  editor.clearSelection();
/** 
  langTools.addCompleter(rhymeCompleter);
  mockEditor.setValue(handleData(data));
  handleJson(editor.getValue());

  editor.clearSelection();

  editor.getSession().on('change', () => {
    handleJson(editor.getValue());
    if (typeof options.onChange === 'function') {
      options.onChange.call(mockEditor, mockEditor.curData);
    }
    editor.clearSelection();
  });
  return mockEditor;
}

  });
*/
  // editor.getSession().on('change', () => {
  //   handleJson(editor.getValue());
  //   if (typeof options.onChange === 'function') {
  //     options.onChange.call(mockEditor, mockEditor.curtData)
  //       editor.clearSelection();

  //       editor.getSession().on('change', () => {
  //         handleJson(editor.getValue());
  //         if (typeof options.onChange === 'function') {
  //           options.onChange.call(mockEditor, mockEditor.curData);
  //         }
  //         editor.clearSelection();
  //       });
      
  //       return mockEditor;
  //     }
  //   }
  // )
  editor.getSession().on('change', () => {
    handleJson(editor.getValue());
    if (typeof options.onChange === 'function') {
      options.onChange.call(mockEditor, mockEditor.curData);
    }
    editor.clearSelection();
  });
  return mockEditor;

}

export default run;
        /**
 * mockEditor({
      container: 'req_body_json', //dom的id
      data: that.state.req_body_json, //初始化数据
      onChange: function (d) {
        that.setState({
          req_body_json: d.text
        })
      }
    })
 */
// module.exports = run;
