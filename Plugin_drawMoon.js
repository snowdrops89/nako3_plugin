/**
 * なでしこ3 プラグイン
 * お月様描画命令
 ※月線色を背景色に合わせると月の周囲の薄い線が見えなくなる。
 */
const PluginDrawMoon = {
  '月色': {type: 'var', value: '#FFDD33'}, // @つきいろ
  '影色': {type: 'var', value: '#112233'}, // @かげいろ
  '月線色': {type: 'var', value: 'rgba(0,0,0,0)'}, // @つきせんいろ
  '月描画': { // @[x,y]に半径で月齢のお月様を描く // @つきびょうが
    type: 'func',
    josi: [['へ', 'に'], ['で'], ['の']],
    fn: function (xy, r, age, sys) {
      var x = xy[0]; var y = xy[1];
      var fillStyle = sys.__ctx.fillStyle;
      var strokeStyle = sys.__ctx.strokeStyle;

    ///満月を描画///
      sys.__ctx.beginPath();
      sys.__ctx.arc(x, y, r, 0, Math.PI*2);
      sys.__ctx.fillStyle = sys.__v0['月色'];
      sys.__ctx.strokeStyle = sys.__v0['月線色'];
      sys.__ctx.fill();
      sys.__ctx.stroke();
      sys.__ctx.closePath();

    ///影の部分を上書き///
      sys.__ctx.beginPath();
      var left = false; if (age < 16) {left = true};//《左回りか》//上弦の月は左が影、下弦の月は右が影なので、右回りか左回りかで描き分ける。
      sys.__ctx.arc(x, y, r, Math.PI*3/2, Math.PI*1/2, left);//角度0は右端なので頂点は270度の位置になるので気を付ける。

      //影の端位置計算
      var fu = 1; if (left == false) {a = -1};//《影膨らみ》//上弦の月は影の膨らみが右、下弦の月は左になる。中点を0としてプラスかマイナスか。
      var kx = r * fu * Math.cos(age/30*Math.PI*2); //《影端x》
      var se = 0.55228474983;//《制御点》ベジェ曲線で円描画する時の制御点// https://cat-in-136.github.io/2014/03/bezier-1-kappa.html

      //３次ベジェ曲線// http://www.htmq.com/canvas/bezierCurveTo.shtml　※開始のx,yは直前の座標。指定するのは終着のx,y。
      sys.__ctx.bezierCurveTo(x+kx*se, y+r,    x+kx,    y+r*se, x+kx, y);
      sys.__ctx.bezierCurveTo(x+kx,    y-r*se, x+kx*se, y-r,    x,  y-r);

      sys.__ctx.fillStyle = sys.__v0['影色'];  
      sys.__ctx.fill();
      sys.__ctx.closePath();
      sys.__ctx.fillStyle = fillStyle;
      sys.__ctx.strokeStyle = strokeStyle;
    },
    return_none: true
  }

}
// モジュールのエクスポート(必ず必要)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PluginDrawMoon
}
//プラグインの自動登録
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject('PluginDrawMoon', PluginDrawMoon)
}
