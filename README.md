MooSocket
=========

MooSocket is a basic wrapper for WebSockets in MooTools, this should hopefully make working with the WebSocket API easier and more familiar to MooTools Devlopers.

**NOTE**
This is still very early version and untested, feel free to fork this project and make it more complete.

How to use
----------

The API of this class is aimed towards being as close to the actual WebSocket API as possible, all that is necessary is to instantiate a MooSocket by providing the web socket url, and any events you want fired.

This class also allows for automatically attempting to reconnect to the socket when the connection is closed (this is switched with the reconnect option), and the max number of reconnect attempts is handled by the maxReconnects option.

    var mooSocket = new MooSocket('ws://websocket.url', {
      reconnect: true, // Default true
      maxReconnects: 10 // Default 10
      onOpen: function(event){
        // Some event for when a new connection is opened
      },
      onMessage: function(data, event){
        // Some event for when a new message is received from the socket
      }, 
      onError: function(event){
        // Some event for when an error occurs on the socket
      },
      onClose: function(event){
        // An Event for when the connection to the socket is closed
      }
    })