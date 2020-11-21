const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
    //  var recognition = new SpeechRecognition();
let user = document.getElementById("user");
let computer = document.getElementById("computer");
let voice = document.getElementById("voice");
let chat_msg = document.getElementById("chat_msg");
let chat_body = document.getElementById("body");


var transcript = "";
var textBox;



// double print ho rha h isliye comment kr diya ////////////////////////
function showMsg(user_msg){
    let output = '';
    output += ` <div class="msg user" id="user">${user_msg}</div>`;
    chat_msg.innerHTML += output;

    return chat_msg;
}


function showBotMsg(final_bot_msg){
    // let output = '';
    // if (user_msg=="who am I") {
    // output += ` <div class="msg computer" id="computer">${bot_msg}</div>`;
    // }
    // else if (user_msg == "what is your name") {
    //     output += ` <div class="msg computer" id="computer"> My name is Mini Cortana.</div>`;
    // }
    //      else if (user_msg == "this project is for") {
    //     output += ` <div class="msg computer" id="computer">Hack CBS3.0</div>`;
    // }
    //     else if (user_msg == "who made this project") {
    //     output += ` <div class="msg computer" id="computer"> This Project is Made by - <li> Abhinav Gupta</li>
    //     <li> Abhishek Patel </li> <li> Abhishek Shivhare </li> <li> Pankaj Choubey </li></div>`;
    // }
    //     else if (user_msg == "can you make me a coffee") {
    //     output += ` <div class="msg computer" id="computer"> Sorry, I can't do this for you.</div>`;
    // }
    //     else if (user_msg == "what up") {
    //     output += ` <div class="msg computer" id="computer">Everything is fine. What about you?</div>`;
    // }
    // else {
    //     output += ` <div class="msg computer" id="computer">Hello sir, How can I help you?</div>`;
    // }
    // chat_msg.innerHTML += output;
    let output = '';
    output += ` <div class="msg computer" id="computer">${final_bot_msg}</div>`;
    chat_msg.innerHTML += output;
    return chat_msg;
}


recognition.onresult = function(e){
    let resultIndex = e.resultIndex;
    transcript = e.results[resultIndex][0].transcript;
    // console.log(transcript);
    // console.log(e);
    chat_body.appendChild(showMsg(transcript));
    //    chat_body.appendChild(showBotMsg(transcript));
    fetchFunction();
 
}

function chatBotVoice(botMsg){
    const speech = new SpeechSynthesisUtterance();
      speech.lang = "en-US";
      speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = botMsg ;                                   // speech wala section
    window.speechSynthesis.speak(speech);
    

    // console.log(speech.text);
    // chat_body.appendChild(showBotMsg( speech.text));
}

voice.addEventListener("click", function(){
    recognition.start();
    console.log("actyubtyuive");
});




// ---------------------------------
function fetchFunction(){
    var data = {transcript};
    let url = "http://localhost:8000/api";
    
    fetch(url, {
        method : 'post',
        body : JSON.stringify(data),
    
        headers:{
            'Content-Type': "application/json"
        }
    }).then(res=>{   return res.json() }).then(res2 => {
        let final_bot_msg ="";
        final_bot_msg = res2.Reply
        chat_body.appendChild(showBotMsg(final_bot_msg));
        chatBotVoice(final_bot_msg);
    });
}

function btn(){
    textBox = document.getElementById('text').value;
    transcript = textBox;
    chat_body.appendChild(showMsg(transcript));
   //    chat_body.appendChild(showBotMsg(transcript));
   fetchFunction();
   console.log(textBox);
   document.getElementById("text").value=null;
}


//-------------------------------------
// let url = "http://localhost:8000";

// let promise = fetch(url, {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Type': 'text/plain; charset=UTF-8',
//   },
//   body: JSON.stringify(data)

// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });


