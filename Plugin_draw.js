/**
 * なでしこ3 プラグイン
 * 描画命令
 */
const PluginDraw = {
  '角丸四角描画': { // @[x,y,w,h]に[rx,ry]の角の丸い四角を描く // @かどまるしかくびょうが
    type: 'func',
    josi: [['へ', 'に'], ['の']],
    fn: function (xywh, r, sys) {
      sys.__ctx.beginPath();
      sys.__ctx.moveTo(xywh[0]+r[0], xywh[1]);

      sys.__ctx.lineTo(xywh[0]+xywh[2]-r[0], xywh[1]);
      sys.__ctx.ellipse(xywh[0]+xywh[2]-r[0], xywh[1]+r[1], r[0], r[1], 0, Math.PI*1.5, 0, 0);

      sys.__ctx.lineTo(xywh[0]+xywh[2], xywh[1]+xywh[3]-r[1]);
      sys.__ctx.ellipse(xywh[0]+xywh[2]-r[0], xywh[1]+xywh[3]-r[1], r[0], r[1], 0, 0, Math.PI*0.5, 0);

      sys.__ctx.lineTo(xywh[0]+r[0], xywh[1]+xywh[3]);
      sys.__ctx.ellipse(xywh[0]+r[0], xywh[1]+xywh[3]-r[1], r[0], r[1], 0, Math.PI*0.5, Math.PI, 0);

      sys.__ctx.lineTo(xywh[0], xywh[1]+r[1]);
      sys.__ctx.ellipse(xywh[0]+r[0], xywh[1]+r[1], r[0], r[1], 0, Math.PI, Math.PI*1.5, 0);

      sys.__ctx.fill();
      sys.__ctx.closePath();
      sys.__ctx.stroke();
    },
    return_none: true
  },
  '扇描画': { // @[x,y]に開始角から終了角まで半径の扇形を描く // @おうぎびょうが
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
