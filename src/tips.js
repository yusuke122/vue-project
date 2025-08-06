// # はい、そのとおりです

// Chrome と Edge（いずれも Blink ベース）で同じスタイルを適用したいなら、先にご紹介した `::-webkit-scrollbar` 系の疑似要素で十分です。Ubuntu 上の Chrome/Edge も Chromium エンジンなので、以下のポイントを抑えれば問題なく動作します。

// ---

// ## 実装例

// ```css
// /* スクロールバー全体の幅 */
// ::-webkit-scrollbar {
//   width: 6px;
//   height: 6px;
// }

// /* トラック（レール）のスタイル */
// ::-webkit-scrollbar-track {
//   background: transparent;
// }

// /* サム（つまみ）の基本スタイル */
// ::-webkit-scrollbar-thumb {
//   background-color: rgba(0, 0, 0, 0.3);
//   border-radius: 3px;
//   transition: background-color 0.2s;
// }

// /* ホバースタイル */
// ::-webkit-scrollbar-thumb:hover {
//   background-color: rgba(0, 0, 0, 0.5);
// }
// ```

// - 上記 CSS をグローバル（`main.css` など）か、対象コンポーネントのスタイルに追加  
// - `overflow-y: auto;` などでスクロールが発生する要素に適用  

// ---

// ## 注意点とテスト手順

// 1. 対象ブラウザで DevTools → Elements → Styles に `::-webkit-scrollbar` が効いているか確認  
// 2. タブレット画面サイズで本当にスクロールバーが現れるかエミュレータ＋実機でチェック  
// 3. 必要ならばメディアクエリで「画面幅◯px以下は非表示」「◯px以上は表示」と切り替え  

// ```css
// @media (max-width: 768px) {
//   ::-webkit-scrollbar-thumb {
//     background-color: transparent;
//   }
// }
// ```

// ---

// ## もし他ブラウザ対応も視野に入れるなら

// - Firefox は別仕様（`scrollbar-width` / `scrollbar-color`）なので、  
//   ```css
//   /* Firefox 用 */
//   * {
//     scrollbar-width: thin;
//     scrollbar-color: rgba(0,0,0,0.3) transparent;
//   }
//   ```
// - ただし今回は Chrome/Edge 限定なので上記は不要です  

// ---

// ## 次に試してみると良いこと

// - Vue コンポーネント単位でスタイルを切り分ける（Scoped CSS＋Global CSS）  
// - カスタムスクロールバーライブラリ（OverlayScrollbars, SimpleBar など）と比較検討  
// - レスポンシブ時のユーザビリティ（タッチ操作時はスクロールバー非表示、マウス操作時は表示）  

// お好きな方法でチューニングしつつ、Ubuntu 上の Chrome と Edge での挙動をしっかり確認してみてください。
