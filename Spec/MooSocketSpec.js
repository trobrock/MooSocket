describe("MooSocket", function() {
  beforeEach(function() {
    spyOn(window, "WebSocket");
  });
  
  describe("#instantiate", function() {
    it("should set the location", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      expect(mooSocket.location).toEqual("ws://localhost:8080");
    });
    
    it("should setup the socket", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      expect(typeOf(mooSocket.socket)).toEqual("object");
    });
  });
  
  describe("#create", function() {
    it("should create a socket", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      expect(window.WebSocket).wasCalled();
    });
    
    it("should setup the socket's events", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      spyOn(mooSocket, "attachEvents");
      
      mooSocket.create()
      expect(mooSocket.attachEvents).wasCalled();
    });
  });
  
  describe("#attachEvents", function() {
    ["message", "open", "close", "error"].each(function(event){
      
      it("should attach a function to the event: " + event, function() {
        var mooSocket = new MooSocket("ws://localhost:8080")
        
        expect(Object.keys(mooSocket.socket)).toContain("on" + event);
        expect(typeOf(mooSocket.socket["on" + event])).toEqual("function");
      });
      
    })
  });
  
  describe("#reconnect", function() {
    it("should return false if the reconnect attempts exceed the max attempts", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      
      mooSocket.reconnectAttempts = 5
      mooSocket.options.maxReconnects = 4
      
      expect(mooSocket.reconnect()).toBeFalsy();
    });
    
    it("should wait to create a new socket based on the delay", function() {
      runs(function() {
        this.mooSocket = new MooSocket("ws://localhost:8080")
        
        this.mooSocket.reconnectDelay = 2
        spyOn(this.mooSocket, "create");
        
        this.mooSocket.reconnect()
      });
      
      waits(2000)
      
      runs(function() {
        expect(this.mooSocket.create).wasCalled();
      });
    });
    
    it("should increase the reconnect delay", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      spyOn(mooSocket, "create");
      
      mooSocket.reconnectAttempts = 2
      
      mooSocket.reconnect()
      
      expect(mooSocket.reconnectDelay).toEqual(6);
    });
    
    it("should increment the reconnect attempts count", function() {
      var mooSocket = new MooSocket("ws://localhost:8080")
      spyOn(mooSocket, "create");
      
      mooSocket.reconnectAttempts = 2
      
      mooSocket.reconnect()
      
      expect(mooSocket.reconnectAttempts).toEqual(3);
    });
  });
});