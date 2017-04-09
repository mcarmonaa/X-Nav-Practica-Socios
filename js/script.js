$(document).ready(function() {
  'use strict';

  $('#tabs').tabs();

  var setAccordion = function() {
    $('#accordion:nth-child(1n)').accordion({
      collapsible: true,
      active: false
    });
  };

  var buildMessage = function(message) {
    return `
    <div class="row">
      <div class="box">
        <div class="col-lg-12 text-center">
          <div class="media">
            <div class="media-left media-top">
              <a href="#">
                <img class="media-object img-circle img-thumbnail img-responsive" src="` + message.avatar + `" alt="" style="width: 200px; height: 200px;">
              </a>
            </div>
            <div class="media-body">
              <h2 class="media-heading">` + message.title + `
                            <br>
                            <small>` + message.author + ` ` + message.date + `</small>
                        </h2>
              <div id="accordion">
                <h3 class="btn btn-info">View Message</h3>
                <div>
                  <p>` + message.content + `</p>
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  };

  var buildUnread = function(numUnreads) {
    return `
    <div id="unread">
    <div class="row">
      <div class="box">
        <div class="col-lg-12 text-center">
          <div class="col-lg-12">
            <hr>
            <h2 class="intro-text text-center">Unread messages
                                  <strong style="color: green;">+` + numUnreads + `</strong>
                              </h2>
                              <h3 id ="update" class="btn btn-info">Show messages</h3>
            <hr>

          </div>
        </div>
      </div>
    </div>
    </div>
  `;
  };

  var showMessages = function(jsonURL, placeID) {
    $('#contents .container').empty();
    $.getJSON(jsonURL, function(messages) {
      for (var i = 0; i < messages.length; i++) {
        $('#' + placeID).append(buildMessage(messages[i]));
        setAccordion(i);
      }
    });
  };

  var unreads;
  var unreadMessages = function(jsonURL, placeID) {
    $.getJSON(jsonURL, function(messages) {
      $('#' + placeID).prepend(buildUnread(messages.length));
      $('#update').click(function() {
        for (var i = unreads.length - 1; i >= 0; i--) {
          $('#timeline-content').prepend(buildMessage(unreads[i]));
          setAccordion(i);
        }

        $('#unread').empty();
      });
      
      unreads = messages;
    });
  };

  $('#timeline').click(function() {
    showMessages('json/timeline.json', 'timeline-content');
    unreadMessages('json/update.json', 'timeline-content');
  });

  $('#messages').click(function() {
    showMessages('json/myline.json', 'messages-content');
  });

  $('#timeline').click();

});
