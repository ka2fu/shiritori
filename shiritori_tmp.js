class Word {
  constructor(word) {
    this.word = word; // 現在の単語を持つ状態
    this.nextchar = Word.getchar(this.word); //　単語の最後の1文字or2文字を持つ状態
  }

  static smalls = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ"];
  static daku = {
    ゔ: "ふ",
    が: "か",
    ぎ: "き",
    ぐ: "く",
    げ: "け",
    ご: "こ",
    ざ: "さ",
    じ: "し",
    ず: "す",
    ぜ: "せ",
    ぞ: "そ",
    だ: "た",
    ぢ: "し",
    づ: "つ",
    で: "て",
    ど: "と",
    ば: "は",
    び: "ひ",
    ぶ: "ふ",
    べ: "へ",
    ぼ: "ほ",
    ぱ: "は",
    ぴ: "ひ",
    ぷ: "ふ",
    ぺ: "へ",
    ぽ: "ほ",
  };

  //   単語の最後の文字を求める
  // 最後が小文字の時は直前の文字含めて一文字とする
  // 濁音・半濁の時は2パターン許容できるようにする
  static getchar(word) {
    let c = word[word.length - 1];
    if (Word.smalls.includes(c)) {
      // 小文字かどうか
      c = word.slice(-2);
      if (Word.daku.hasOwnProperty(c[0])) {
        // 濁音・半濁音かどうか
        c = [Word.daku[c[0]] + c[1], c];
      }
    } else {
      if (Word.daku.hasOwnProperty(c)) {
        // 濁音・半濁音かどうか
        c = [Word.daku[c], c];
      }
    }
    return Array.isArray(c) ? c : [c];
  }

  //   次の単語が適正かどうか判断する
  validate(old) {
    let isvalid = false;
    if (old.nextchar[0].length == 1) {
      // 次の文字に小文字が含まれない時
      //   nextcharの中に次の単語の一文字目があればtrue
      isvalid = old.nextchar.includes(this.word[0]) ? true : false;
    } else {
      // 小文字が含まれる時
      if (this.word.length >= 2) {
        // 次の単語が2文字未満なら不正
        // 2文字以上の時だけ不正か適正か判断する
        let c = this.word.slice(0, 2);
        isvalid = old.nextchar.includes(c) ? true : false;
      }
    }
    return isvalid;
  }
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function shiritori(word) {
  rl.question(`your answer: `, (answer) => {
    if (answer === "q" || answer[answer.length - 1] === "ん") {
      if (answer[answer.length - 1] === "ん") {
        // んで終わる時はプロセスを終了
        console.log("end with ん");
      } else {
        // qが入力されたら終了
        console.log("exit");
      }
      rl.close();
    } else {
      let newWord = new Word(answer);
      let isvalid = newWord.validate(word);
      if (isvalid) {
        // りしとりが成立してる時
        console.log(`next word starts with ${newWord.nextchar}`);
        shiritori(newWord);
      } else {
        // りしとりが成立しない時
        console.log(`もう一回 (${word.word})`);
        shiritori(word);
      }
    }
  });
}

// とりあえず「しりとり」から開始する
let word = new Word("しりとり");
console.log('quit when enter word end with "ん" or "q" to quit');
console.log(`start from  ${word.word}`);
shiritori(word);
