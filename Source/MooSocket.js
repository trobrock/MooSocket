/*
---
description: MooSocket class, a basic WebSocket wrapper for MooTools

license: MIT-style

authors:
- Trae Robrock

requires:
- core/1.3: '*'

provides: MooSocket

...
*/

var MooSocket = new Class({
  Implements: [Options, Events], 
  
  options: {
    reconnect: true, 
    maxReconnects: 10, 
    onOpen: Function.from(), 
    onMessage: Function.from(), 
    onClose: Function.from(), 
    onError: Function.from()
  }, 
  reconnectDelay: 0, 
  reconnectAttempts: 0, 
  
  initialize: function(location, options){
    if (!("WebSocket" in window)) return false
    
    this.setOptions(options)
    this.location = location
    
    this.create()
  }, 
  
  create: function(){
    this.socket = new WebSocket(location)
    this.attachEvents()
  }, 
  
  attachEvents: function(){
    this.socket.onmessage = function(e){
      this.fireEvent("message", [e.data, e])
    }.bind(this)
    
    this.socket.onclose = function(e){
      this.fireEvent("close")
      if (this.options.reconnect) this.reconnect()
    }.bind(this)
    
    this.socket.onopen = function(e){
      this.fireEvent("open", [e.data, e])
    }.bind(this)
    
    this.socket.onerror = function(e){
      this.fireEvent("error", [e.data, e])
    }.bind(this)
    
    return this
  }, 
  
  reconnect: function(){
    if (this.reconnectAttempts > this.options.maxReconnects) return false
    this.create.delay(this.reconnectDelay * 1000)
    this.reconnectDelay = 2 * this.reconnectAttempts
    this.reconnectAttempts++
  }
})