$(document).on("turbolinks:load",function(){

   function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
    <div class="upper-message">
      <div class="upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="upper-message__date">
        ${message.date}
      </div>
    </div>
    <div class="lower-message">
      <p class="lower-message__content">
        ${content}
      </p>
        ${img}
    </div>
    </div>`
     return html;
   }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
    $('.messages').append(html);
    $('#message_content').val('');
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(message){
      $('.submit-btn').prop('disabled', false);
    })
  })
});
