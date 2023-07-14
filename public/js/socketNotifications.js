var socket = io.connect('http://127.0.0.1:3000');

socket.on('connect', function() {
  socket.on('jobNotification', function(job) {
    const link = `/jobs/${job._id}`;
    $("#notifications").prepend($("<li>").html('Notification: New Job: <a href="'+ link +'">'+ job.title +'</a>'));
  });
});