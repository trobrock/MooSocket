Class: MooSocket {#MooSocket}
=============================

### Implements:

Options, Events




MooSocket Method: constructor {#MooSocket:constructor}
-------------------------------------------------------


### Syntax:

  var myMooSocket = new MooSocket(location, options);

### Arguments:

1. location - (**)
2. options - (**)

### Options:

* reconnect - (**)
* maxReconnects - (**)

### Events:

* onOpen -
* onMessage -
* onError -
* onClose -


MooSocket Method: reconnect {#MooSocket:reconnect}
---------------------------------------------------


### Syntax:

  myMooSocket.reconnect();