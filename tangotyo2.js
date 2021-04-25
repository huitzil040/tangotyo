//let mysql = require("mysql");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
const stbtn = document.querySelector("#start");
const edbtn = document.querySelector("#edit");
const opbtn = document.querySelector("#option");
const quiz = document.querySelector("#quiz");
const quiz2 = document.querySelector("#quiz2");
let qubtn;
let nebtn;
let enbtn;
let sebtn;
let dobtn;
let sgbtn;
let areaQ;
let areaA;
let checkR = 0;
let random;
let randoms = [];
//アクティブにする問題配列
let qanda_array = [];
//問題配列の全体集合
let content_array = {};
let check = 0;

console.log("newtype_1");

$(function(){
        $('.upload').on('click', function(){
            $(this).find('input').val('');
            $(this).find('input[type="file"]').trigger('click');
        });
        $('.upload input[type="file"]').on('click', function(event){
            event.stopPropagation();
        });
        $('.upload input[type="file"]').on('change', function(){
            if (this.files.length) {
                $(this).parent().find('input[disabled]')
                    .val(this.files[0].name);
            }
        });
    });

let local_content_reader =()=>{
  let form = document.forms.myform;
  form.data_reader.addEventListener('change', function(e) {
    let result = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText( result );
    reader.addEventListener( 'load', function() {
        console.log( JSON.parse(reader.result) );
        content_array = JSON.parse(reader.result);
        console.log(content_array);
    })
  })
}

//目次を作る
let table_reader =()=>{
  let table_array = [];
  url = "https://huitzil040.github.io/tangotyo/tango_data1.json";
  $.getJSON(url,(data) =>{
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      table_array.push(data[i]);
      console.log(table_array)
    }
  })

  url2 = "https://huitzil040.github.io/tangotyo/tango_data2.json";
  $.getJSON(url2,(data) =>{
    console.log(data);
    for (let i = 0; i < table_array.length; i++) {
      //console.log(table_array);
      let connum = table_array[i];
      content_array[connum] = data[connum] ;
      //console.log(content_array);
    }
  })
}

let check_loORne = confirm("githubのファイルを読み込みますか？");
if(check_loORne){
  table_reader();
  console.log(content_array);
  if(content_array == {}){
    alert("ファイルの読み取りに失敗しました");
  }
}else{
  local_content_reader();
}

//jsonファイル作成
let json_maker = (originalData, fileName) => {
  const data = JSON.stringify(originalData);
  const link = document.createElement("a");
  link.href = "data:text/plain," + encodeURIComponent(data);
  link.download = fileName;
  link.click();
}

//json読み取り
let json_reader = (genre,mini_genre) => {
    console.log(content_array);
    qanda_array = [];
    if(mini_genre == ""){
      console.log("mini_genre=nothing");
        for (var k in content_array[genre]) {
          console.log("項目：" + k);
          console.log("内容：" + content_array[genre][k]);
          console.log(content_array[genre][k]);
          for (let i = 0; i < content_array[genre][k].length; i++) {
            areaQ = content_array[genre][k][i].question;
            areaA = content_array[genre][k][i].answer;
            qanda_array.push({
              areaQ,
              areaA,
            });
          }
        console.log(qanda_array);
        }
    }else{
      console.log("mini_genre=content");
      for (let i = 0; i < content_array[genre]["mini_"+mini_genre].length; i++) {
        areaQ = content_array[genre]["mini_"+mini_genre][i].question;
        areaA = content_array[genre]["mini_"+mini_genre][i].answer;
        qanda_array.push({
          areaQ,
          areaA,
        });
      }
    }

}


let random_maker = () => {
  let min = 1,
    max = qanda_array.length;

  for (i = min; i <= max; i++) {
    while (true) {
      let tmp = intRandom(min, max);
      if (!randoms.includes(tmp)) {
        randoms.push(tmp);
        break;
      }
    }
  }
}
/** min以上max以下の整数値の乱数を返す */
function intRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//「開始する」ボタンのなかみs
let start_quiz_part = () => {
  check = 0;
  //配列を順々に使っていき、配列が終わったらもう一度乱数の配列を持ってくる
  if (qanda_array == 0) {
    console.log("miss" + qanda_array.length)

    title.textContent = "";
    quiz.textContent = "";
    content.innerText = "問題が登録されていません";
    quiz2.textContent = "";
  } else {
    if (checkR == qanda_array.length) {
      checkR = 0;
    };
    console.log(checkR)
    if (checkR == 0) {
      randoms = [];
      random_maker();
      console.log(randoms);
    };

    random = randoms[checkR] - 1;
    console.log(random);
    let questionN = qanda_array[random];
    title.innerText = "問題";
    content.innerText = (checkR + 1) + "/" + qanda_array.length + ":   " + questionN.areaQ;
    quiz.innerHTML = '<input type="text" id="answer">';
    quiz.innerHTML += '<button type="button" id="question">回答</button>'
    quiz2.textContent = "";

    //「回答」ボタン
    let answer_quiz = () => {
      check = 1;
      title.innerText = "答え合わせ";
      let answer = document.querySelector("#answer").value;
      if(answer == ""){
        answer = "無回答";
      };
      let correct = questionN.areaA;
      //console.log(answer);
      console.log(qanda_array);
      content.innerText = 'あなたの回答:　' + answer;
      content.innerHTML += "<br>"
      content.innerText += '答え　　　　:　' + correct;
      quiz.innerHTML = '<button type="button" id="next">次の問題へ</button>';
      quiz.innerHTML += '<button type="button" id="end">終わり</button>';
      console.log(quiz);
      //「次の問題」ボタン
      let next_quiz = () => {
        check = 0;
        checkR = checkR + 1;
        start_quiz()
      }
      //「終わり」ボタン
      let end_quiz = () => {
        check = 0;
        checkR = 0;
        randoms = [];
        title.textContent = "";
        content.textContent = "";
        quiz.textContent = "";
        quiz2.textContent = "";
      }
      nebtn = document.querySelector("#next");
      nebtn.addEventListener("click", next_quiz);
      enbtn = document.querySelector("#end");
      enbtn.addEventListener("click", end_quiz);
    }
    qubtn = document.querySelector("#question");
    qubtn.addEventListener("click", answer_quiz);
    console.log(quiz)
    console.log(stbtn)
  }
}


let edit_quiz_part = () => {
  check = 0;
  title.innerText = "編集";
  content.textContent = "";
  quiz.innerHTML = '<textarea rows="3" cols="25" id="quiz_editer" placeholder="問題を入力"></textarea></br>';
  quiz.innerHTML += '<textarea rows="3" cols="25" id="answer_editer" placeholder="答えを入力"></textarea></br>';
  quiz.innerHTML += '<textarea rows="1" cols="25" id="genreS_editer" placeholder="小ジャンルを入力"></textarea></br>';
  quiz.innerHTML += '<textarea rows="1" cols="25" id="genreB_editer" placeholder="大ジャンルを入力"></textarea>';
  quiz.innerHTML += '<button type="button" id="send_quiz">確定</button>'
  quiz2.textContent = "";
  //console.log(quiz);
  //クイズを作成する
  let quiz_make = () => {
    let textQ = document.querySelector("#quiz_editer").value;
    let textA = document.querySelector("#answer_editer").value;
    let textGS = "mini_"+document.querySelector("#genreS_editer").value;
    let textGB = document.querySelector("#genreB_editer").value;
    if(!textA || !textQ || !textGB || !textGS){
      let conf = window.confirm("記入されていない項目がありますが、このまま登録しますか？");
      if(conf){
        console.log(Object.keys(content_array).indexOf(textGB) !== -1);
        //console.log(Object.keys(content_array[textGB]).indexOf(textGS) !== -1);
        if(Object.keys(content_array).indexOf(textGB) !== -1){
          console.log(Object.keys(content_array[textGB]).indexOf(textGS) == -1);
          if(Object.keys(content_array[textGB]).indexOf(textGS) == -1){
            //content_array[textGB][textGS] = ;
            content_array[textGB][textGS] = [{question:textQ, answer:textA}];
          }
        }else{
          content_array[textGB] = {};
          content_array[textGB][textGS] = [{question:textQ, answer:textA}];
        }
        console.log(content_array)

        //let cont_length = content_array[textGB][textGS].length
        //content_array[textGB][textGS][cont_length] = {question:textQ,answer:textA};
        //console.log(content_array);
        quiz2.innerText = "登録しました";
      }
    }else{
      console.log(Object.keys(content_array).indexOf(textGB) !== -1);
      //console.log(Object.keys(content_array[textGB]).indexOf(textGS) !== -1);
      if(Object.keys(content_array).indexOf(textGB) !== -1){
        console.log(Object.keys(content_array[textGB]).indexOf(textGS) == -1);
        if(Object.keys(content_array[textGB]).indexOf(textGS) == -1){
          console.log("1");
          //content_array[textGB][textGS] = ;
          content_array[textGB][textGS] = [{question:textQ, answer:textA}];
        }else{
          let cont_length = content_array[textGB][textGS].length
          content_array[textGB][textGS][cont_length] = {question:textQ,answer:textA};
        }
      }else{
        console.log("2");
        content_array[textGB] = {};
        content_array[textGB][textGS] = [{question:textQ, answer:textA}];
      }
      console.log(content_array)

      quiz2.innerText = "登録しました";
    }
  }
  sebtn = document.querySelector("#send_quiz");
  sebtn.addEventListener("click", quiz_make);
}

let option_quiz_part = () => {
  check = 0;
  title.innerText = "設定";
  content.textContent = "";
  quiz.innerText = "問題データのダウンロード→";
  quiz.innerHTML += '<button type="button" id="download_quiz">ダウンロード</button>'
  quiz2.innerHTML = "</br>"
  quiz2.innerText += "問題の出題範囲の設定";
  // = document.querySelector("#quiz_editer").value;
  let quiz_data_download = () => {
    let json_make_array = [];
    for (let c in content_array) {
      console.log("項目：" + c);
      console.log("内容：" + content_array[c]);
      console.log(content_array[c]);
      json_make_array.push(c);
      console.log(json_make_array);
    }
    json_maker(content_array, "tango_data2.json");
    json_maker(json_make_array, "tango_data1.json");
  }
  dobtn = document.querySelector("#download_quiz");
  dobtn.addEventListener("click", quiz_data_download);

  quiz2.innerHTML += '</br><textarea rows="2" cols="20" id="nowGenre" placeholder="出題範囲を入力"></textarea></br>';
  quiz2.innerHTML += '<textarea rows="2" cols="20" id="miniGenre" placeholder="詳細範囲を入力"></textarea>';
  quiz2.innerHTML += '<button type="button" id="send_genre">確定</button></br>'

  let Send_genrer = () =>{
    let nowGenre = document.querySelector("#nowGenre").value;
    let miniGenre = document.querySelector("#miniGenre").value;
    //quiz2.innerHTMl += "<p>変更しました</p>";
    if(nowGenre=="" && miniGenre==""){
      alert("ジャンルが選択されていません");
    }else{
      json_reader(nowGenre,miniGenre);
      alert("変更しました");
      //if(miniGenre==""){
      //  json_reader()
      //}
    }

  };

  sgbtn = document.querySelector("#send_genre");
  sgbtn.addEventListener("click", Send_genrer);
}

//「開始する」ボタン
let start_quiz = () => {
  //問題回答中に誤って他ページに飛ぶことの帽子　check=1が回答中
  if (check == 1) {
    conf = window.confirm("ページから離れますか？")
    if (conf == true) {
      start_quiz_part();
    }
  } else {
    start_quiz_part();
  }
}

let edit_quiz = () => {
  if (check == 1) {
    conf = window.confirm("ページから離れますか？")
    if (conf == true) {
      edit_quiz_part();
    }
  } else {
    edit_quiz_part();
  }
}

let option_quiz = () => {
  if (check == 1) {
    conf = window.confirm("ページから離れますか？")
    if (conf == true) {
      option_quiz_part();
    }
  } else {
    option_quiz_part();
  }
}
stbtn.addEventListener("click", start_quiz);
edbtn.addEventListener("click", edit_quiz);
opbtn.addEventListener("click", option_quiz);
