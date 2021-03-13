/**
 * なでしこ3 プラグイン
 * 画像処理用
 */
const PluginImageProcessing = {
  '画像情報取得': { // @描画中キャンバスから[x,y,w,h]の画像情報を取得する // @がぞうじょうほうしゅとく
    type: 'func',
    josi: [['の', 'を']],
    fn: function (xywh,sys) {
      if (!sys.__ctx) {throw new Error(errMsgCanvasInit)}
      const img = sys.__ctx.getImageData(xywh[0], xywh[1], xywh[2], xywh[3]);
      return img;
    },
  },
  '色データ取得': { // @描画中キャンバスから[x,y,w,h]の色データを取得する // @いろでーたしゅとく
    type: 'func',
    josi: [['の', 'を']],
    fn: function (xywh,sys) {
      if (!sys.__ctx) {throw new Error(errMsgCanvasInit)}
      const img = sys.__ctx.getImageData(xywh[0], xywh[1], xywh[2], xywh[3]);
      return img.data;
    },
  },
  '画像処理反映': { // @描画中キャンバスの[x,y,w,h]に色データで画像処理反映する // @がぞうしょりはんえい
    type: 'func',
    josi: [['に', 'を'],['で']],
    fn: function (xywh,color,sys) {
      if (!sys.__ctx) {throw new Error(errMsgCanvasInit)}
      const img = sys.__ctx.getImageData(xywh[0], xywh[1], xywh[2], xywh[3]);
      let data = img.data;
      for (let i=0; i<data.length;i++) {data[i]=color[i]}
      sys.__ctx.putImageData(img,xywh[0], xywh[1]);
    },
  }
}
// モジュールのエクスポート(必ず必要)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PluginImageProcessing
}
//プラグインの自動登録
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject('PluginImageProcessing', PluginImageProcessing)
}
