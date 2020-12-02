/**
 * なでしこ3 プラグインテンプレート
 * UserInfo
 * ユーザーの各情報を取得
 */
const UserInfo = {
  // ディスプレイの幅と高さ
  'デスクトップW': { // @デスクトップの幅 // @ですくとっぷW
    type: 'func',
    josi: [],
    fn: function () {
      return window.screen.width
    }
  },
  'デスクトップH': { // @デスクトップの高さ // @ですくとっぷH
    type: 'func',
    josi: [],
    fn: function () {
      return window.screen.height
    }
  },
  'デスクトップ幅': { // @デスクトップの幅 // @ですくとっぷはば
    type: 'func',
    josi: [],
    fn: function () {
      return window.screen.width
    }
  },
  'デスクトップ高': { // @デスクトップの高さ // @ですくとっぷたかさ
    type: 'func',
    josi: [],
    fn: function () {
      return window.screen.height
    }
  },

  // ブラウザ内の表示域の幅と高さ（スクロールバーを除く）
  'クライアントW': { // @ブラウザ内の表示域の幅（スクロールバーを除く） // @くらいあんとW
    type: 'func',
    josi: [],
    fn: function () {
      return document.documentElement.clientWidth
    }
  },
  'クライアントH': { // @ブラウザ内の表示域の高さ（スクロールバーを除く） // @くらいあんとH
    type: 'func',
    josi: [],
    fn: function () {
      return document.documentElement.clientHeight
    }
  },
  'クライアント幅': { // @ブラウザ内の表示域の幅（スクロールバーを除く） // @くらいあんとはば
    type: 'func',
    josi: [],
    fn: function () {
      return document.documentElement.clientWidth
    }
  },
  'クライアント高': { // @ブラウザ内の表示域の高さ（スクロールバーを除く） // @くらいあんとたかさ
    type: 'func',
    josi: [],
    fn: function () {
      return document.documentElement.clientHeight
    }
  },

  'アクセスデバイス': { // @接続してきた端末を判別 // @あくせすでばいす
    type: 'func',
    josi: [],
    fn: function () {
      var UA = navigator.userAgent;
      var iPhone = UA.indexOf('iPhone');
      var iPad = UA.indexOf('iPad');
      var Android = UA.indexOf('Android');
      var Mobile = UA.indexOf('Mobile');

      if(iPhone > 0 || Android > 0 && Mobile > 0){
        return "スマホ"
      }
      else if(iPad > 0 || Android > 0){
        return "タブレット"
      }
      else{
        return "ＰＣ他"
      }
    }
  }
}

// モジュールのエクスポート(必ず必要)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserInfo
}
//プラグインの自動登録
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject('UserInfo', UserInfo)
}
