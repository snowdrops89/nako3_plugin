﻿/**
 * Plugin_FileReader.js
 * ローカルのファイルを読み込むためのプラグイン
 */
const PluginFileReader = {
  
  // @HOGE定数
  '対象IMG': {type: 'const', value:''}, // @たいしょうIMG
  
  // @ファイル開く
  'テキストファイル開時': { // @ローカルのテキストファイルを開く // @てきすとふぁいるひらいたとき
    type: 'func',
    josi: [['と'],['で'],['の', 'を']],
    fn: function (fn, cha, file, sys) {
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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const img = new window.Image()
        img.src = reader.result
        sys.__v0['対象IMG'] = img
        sys.__v0['対象'] = img.src
        img.onload = function() {
          return fn(img, sys);
        }
      }
    }
  }
}

// モジュールのエクスポート(必ず必要)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PluginFileReader
}
//プラグインの自動登録
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject('PluginFileReader', PluginFileReader)
}
