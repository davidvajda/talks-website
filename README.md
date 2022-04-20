<div>
  <h1>Talks - online chat app</h1>
  <p>
    Talks is basic chat application connecting you with other enqueued person online. I've chosen React Js as a framework to use together with Material UI for  majority of style.
  </p>
  <p>
    The app is published on heroku, you can find and try it out on this link -> <a href="http://my-talks.herokuapp.com/" target="blank">my-talks.herokuapp.com</a>.
  </p>
  <h1>Screenshots</h1>
  <h3>Homescreen</h3>
  <img src="./screenshots/welcome_screen.png" alt="Homescreen">   
  <h3>Chat window</h3>
  <img src="./screenshots/chat.png" alt="Chat window"> 
  
  <h1>Communication</h1>
  <p>
    I'm using socket.IO for the communication between clients and the server. <a href="https://github.com/davidvajda/talks">Server repo</a>
  </p>
  <h3>Joining chat</h3>
  <p>
    After joining a chat (as talkee/listener) you are either connected with opposite role or enqueued in case there's no one in the queue's front.
  </p>
  <h3>Reconnecting</h3>
  <p>
    In case you lose an internet connection or accidentally press reload on a web browser your last socket ID is stored in browser's local storage. On loading a page this ID is send to the server, if the connection with the ID is still alive then you will be reconnected. The messages sent before connection loss won't be displayed since app is not using any database yet.
  </p>
    <h3>Messages and alerts</h3>
  <p>
    Messages contain only the text, type and time when they've been sent. Server emits the message to the other client. Type of messages can be (currently) either message or alert. Alerts are sent by server on disconnects and reconnects.
  </p>
    <h1>Ideas for future commits</h1>
  <ul>
    <li>Using local storage to store chat messages (not losing messages on reconnect)</li>
    <li>Registration form for Listeners</li>
    <li>Rating system for Listeners - at the end of chat talkee will get to rate the experience</li>
    <li>Animations when message is added</li>
    <li>Other client is typing - animation</li>
    <li>...</li>
  </ul>
</div>
