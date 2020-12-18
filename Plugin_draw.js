/**
 * なでしこ3 プラグイン
 * 扇形描くやつ
 */
const PluginDraw = {
  '扇描画': { // @[x,y,半径,開始角,終了角]に扇形を描く // @おうぎびょうが
    type: 'func',
    josi: [['へ', 'に'], ['から'], ['まで'], ['の']],
    fn: function (xy,start,end,r, sys) {
      sys.__ctx.beginPath();
      sys.__ctx.moveTo(xy[0], xy[1]);
      sys.__ctx.arc(xy[0], xy[1], r, start, end, false);
      sys.__ctx.fill();
      sys.__ctx.closePath();
      sys.__ctx.stroke();
    },
    return_none: true
  }
}
// モジュールのエクスポート(必ず必要)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PluginDraw
}
//プラグインの自動登録
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject('PluginDraw', PluginDraw)
}
