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
let area1;
let area2;
let question_array = [];
let answer_array = [];
let check = 0;


//jsonファイル作成
let json_maker =(originalData,fileName)=>{
  //originalData = {
  //  id: 123,
  //  name: "mochi",
  //  food:["mochi","moti"]
  //};
  //const fileName = test.json;
  const data = JSON.stringify(originalData);
  const link = document.createElement("a");
  link.href = "data:text/plain," + encodeURIComponent(data);
  link.download = fileName;
  link.click();
}


//json読み取り
let json_reader =()=>{
  url = "https://huitzil040.github.io/tangotyo/test1.json";

  $.getJSON(url, (data) => {
    console.log(data)
        //console.log(`id=${data.id}, name=${data.name}, food=${data.food}`);
  });
}

json_reader();

console.log(quiz)
console.log(title)

//「開始する」ボタンのなかみs
let start_quiz_part =()=>{
  check = 0;
  //ランダムな問題を出題する変数
  let random = 0;
  console.log(random)
  title.innerText = "問題";
  content.innerText = question_array[random];
  quiz.innerHTML = '<input type="text" id="answer">';
  quiz.innerHTML += '<button type="button" id="question">回答</button>'
  quiz2.textContent = "";

  //「回答」ボタン
  let answer_quiz =()=>{
    check = 1;
    title.innerText = "答え合わせ";
    let answer = document.querySelector("#answer").value;
    let correct = answer_array[random];
    console.log(answer);
    content.innerText = 'あなたの回答:'+ answer;
    content.innerHTML += "<br>"
    content.innerText += '答え:'+ correct;
    quiz.innerHTML = '<button type="button" id="next">次の問題へ</button>';
    quiz.innerHTML += '<button type="button" id="end">終わり</button>';
    console.log(quiz);
    //「次の問題」ボタン
    let next_quiz=()=>{
      check = 0;
      start_quiz()
    }
    //「終わり」ボタン
    let end_quiz=()=>{
      check = 0;
      title.textContent = "";
      content.textContent = "";
      quiz.textContent = "";
      quiz2.textContent = "";
    }
    nebtn = document.querySelector("#next");
    nebtn.addEventListener("click",next_quiz);
    enbtn = document.querySelector("#end");
    enbtn.addEventListener("click",end_quiz);
  }
  qubtn = document.querySelector("#question");
  qubtn.addEventListener("click",answer_quiz);
  console.log(quiz)
  console.log(stbtn)
}


let edit_quiz_part =()=>{
  check = 0;
  title.innerText = "編集";
  content.textContent = "";
  quiz.innerHTML = '<textarea rows="3" cols="30" id="quiz_editer" placeholder="問題を記入してください"></textarea></br>';
  quiz.innerHTML += '<textarea rows="3" cols="30" id="answer_editer" placeholder="答えを記入してください"></textarea>';
  quiz.innerHTML += '<button type="button" id="send_quiz">確定</button>'
  quiz2.textContent = "";
  console.log(quiz);
  //クイズを作成する
  let quiz_make =()=>{
    area1 = document.querySelector("#quiz_editer").value;
    area2 = document.querySelector("#answer_editer").value;
    question_array.push(area1);
    answer_array.push(area2);
    quiz2.innerText = "登録しました";
    console.log(area1);
    console.log(area2);
    console.log(question_array);
    console.log(answer_array);
    json_maker({
        id: 123,
        name: "mochi",
        food:[area1,area2]
      },"test.json");
  }
  sebtn = document.querySelector("#send_quiz");
  sebtn.addEventListener("click",quiz_make);
  console.log(quiz2);
}

let option_quiz_part =()=>{
  check = 0;
  title.innerText = "設定";
  content.textContent = "";
  quiz.textContent = "";
  quiz2.textContent = "";
}

//「開始する」ボタン
let start_quiz =()=>{
  //問題回答中に誤って他ページに飛ぶことの帽子　check=1が回答中
  if(check == 1){
    conf = window.confirm("ページから離れますか？")
    if(conf == true){
      start_quiz_part();
    }
  }else{
    start_quiz_part();
  }
}

let edit_quiz =()=>{
  if(check == 1){
    conf = window.confirm("ページから離れますか？")
    if(conf == true){
      edit_quiz_part();
    }
  }else{
    edit_quiz_part();
  }
}

let option_quiz =()=>{
  if(check == 1){
    conf = window.confirm("ページから離れますか？")
    if(conf == true){
      option_quiz_part();
    }
  }else {
    option_quiz_part();
  }
}
stbtn.addEventListener("click",start_quiz);
edbtn.addEventListener("click",edit_quiz);
opbtn.addEventListener("click",option_quiz);
