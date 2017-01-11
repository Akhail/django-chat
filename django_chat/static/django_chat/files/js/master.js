///<reference path="jquery/index.d.ts"/>
(function () {
    var last = 0;
    function getMessage() {
        $.ajax({
            url: 'http://127.0.0.1:8000/chat-room/get-message/starting=' + last,
            method: "GET",
            success: function (data) {
                var messages = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var message = data_1[_i];
                    var fields = message['fields'];
                    var author = fields['message_author'];
                    var content = fields['message_content'];
                    last = message['pk'];
                    messages.push("<div class=\"message\"><div class=\"message-top\"><h3>" + author + "</h3><span></span></div><div>" + content + "</div></div>");
                }
                if (messages.length > 0) {
                    $('.chat-window').append(messages);
                }
            }
        });
    }
    function sendMessage(evt) {
        if (evt.key == 'Enter') {
            var author = $('#author').val();
            author = author == '' ? 'Anónimo' : author;
            var msg = $('#content').val();
            $.get("http://127.0.0.1:8000/chat-room/send-message?author=" + author + "&content=" + msg);
            window.setTimeout(function () {
                $('.chat-window').scrollTop(99999);
            }, 1000);
        }
    }
    $('#content').keydown(sendMessage);
    setInterval(getMessage, 500);
    window.setTimeout(function () {
        $('.chat-window').scrollTop(99999);
    }, 1000);
})();
