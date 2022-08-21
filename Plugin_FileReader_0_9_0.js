/*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
　Plugin_FileReader.js　v1.0.0

　File APIで、ローカルのファイルを読み込むためのプラグイン。

　作者:雪乃☆雫　／　ライセンス:CC0　／　制作時のナデシコバージョン:3.3.60
*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*/
const PluginFileReader = {
  // @ファイル選択作成
  'ファイル選択作成': { // @ファイル選択(input[type='file'])を作成しDOMオブジェクトを返す // @ふぁいるせんたくさくせい
    type: 'func',
    josi: [],
    pure: false,
    fn: function (sys) {
      const inp = sys.__exec('DOM部品作成', ['input', sys])
      inp.type = 'file'
      return inp
    }
  },
  // @ドラッグ&ドロップ
  'ファイルドロップ時': { // @DOMにファイルをドロップした時 // @ふぁいるどろっぷしたとき
    type: 'func',
    josi: [['と'],['に', 'へ']],
    fn: function (fn, dom, sys) {
      if (typeof (dom) === 'string') {dom = document.querySelector(dom)}
      dom.addEventListener('dragenter', function(e){
        e.stopPropagation();
        e.preventDefault();
      });
      dom.addEventListener('dragover', function(e){
        e.stopPropagation();
        e.preventDefault();
      });
      dom.addEventListener('drop', function(e){
        e.stopPropagation();
        e.preventDefault();
        const dt = e.dataTransfer;
        const files = dt.files;
        sys.__v0['対象'] = files
        sys.__v0['対象イベント'] = e
        return fn(e, sys);
      });
    }
  },
  'ドロップ禁止': { // @DOMへのファイルドロップ操作を無効にする // @どろっぷきんし
    type: 'func',
    josi: [['に', 'へ']],
    fn: function (dom, sys) {
      if (typeof (dom) === 'string') {dom = document.querySelector(dom)}
      dom.addEventListener('dragover', function(e){
           e.preventDefault();
      }, false);
      dom.addEventListener('drop', function(e){
           e.preventDefault();
           e.stopPropagation();
      }, false);
    }
  },
  // @ファイル開く
  'テキストファイル開時': { // @ローカルのテキストファイルを開く // @てきすとふぁいるひらいたとき
    type: 'func',
    josi: [['と'],['で'],['の', 'を']],
    fn: function (fn, cha, file, sys) {
      if (!file.type.match('text.*')&& !file.name.match(/csv$/m)) {
        console.error("テキストファイル開時：『"+file.name+"』は、テキストファイルではありません。");
        return;
      }
      const reader = new FileReader();
      reader.readAsText(file, cha);
      reader.onload = function() {
        txt = reader.result
        sys.__v0['対象'] = txt
        return fn(txt, sys);
      }
    }
  },
  '画像ファイル開時': { // @ローカルの画像ファイルを開く // @がぞうふぁいるひらいたとき
    type: 'func',
    josi: [['で'],['の', 'を']],
    fn: function (fn, file, sys) {
      if (!file.type.match('image.*')) {
        console.error("画像ファイル開時：『"+file.name+"』は、画像ファイルではありません。");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const img = new window.Image()
        img.src = reader.result
        sys.__v0['対象'] = img
        img.onload = function() {
          return fn(img, sys);
        }
      }
    }
  },
  'オーディオファイル開時': { // @ローカルのオーディオファイルを開く // @おーでぃおふぁいるひらいたとき
    type: 'func',
    josi: [['で'],['の', 'を']],
    fn: function (fn, file, sys) {
      if (!file.type.match('audio.*')) {
        console.error("オーディオファイル開時：『"+file.name+"』は、オーディオファイルではありません。");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const audio = new Audio()
        audio.pause()
        audio.src = reader.result;
        sys.__v0['対象'] = audio
        return fn(audio, sys);
      }
    }
  },
  'データファイル開時': { // @ローカルのデータファイルを開く // @でーたふぁいるひらいたとき
    type: 'func',
    josi: [['で'],['の', 'を']],
    fn: function (fn, file, sys) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const data = reader.result;
        sys.__v0['対象'] = data
        return fn(data, sys);
      }
    }
  }
}

// なでしこ3の本体に関数を登録する
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject("PluginFileReader", PluginFileReader)
} else {
  module.exports = PluginFileReader
}
