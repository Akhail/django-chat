///<reference path="jquery/index.d.ts"/>

(function() {
    var last = 0;
    function getMessage(){
        $.ajax({
            url: 'http://127.0.0.1:8000/chat-room/get-message/starting=' + last,
            method: "GET",
            success: function (data) {
                let messages: Array<string> = [];
                for(let message of data){
                    let fields:{} = message['fields'];
                    let author = fields['message_author'];
                    let content = fields['message_content'];
                    last = message['pk'];
                    messages.push(`<div class="message"><div class="message-top"><h3>${author}</h3><span></span></div><div>${content}</div></div>`);
                }
                if(messages.length > 0){
                    $('.chat-window').append(messages);
                }
            }
        });
    }
    function sendMessage(evt){
        if(evt.key == 'Enter'){
            let author = $('#author').val();
            author = author == '' ? 'Anónimo' : author;
            let msg = $('#content').val();
            $.get(`http://127.0.0.1:8000/chat-room/send-message?author=${author}&content=${msg}`);
            window.setTimeout(function () {
                $('.chat-window').scrollTop(99999);
            },1000)
        }
    }

    $('#content').keydown(sendMessage);
    setInterval(getMessage, 500);
    window.setTimeout(function () {
        $('.chat-window').scrollTop(99999);
    },1000)
})();