var net = require('net')

var chatServer = net.createServer(),
	clientList = []

chatServer.on('connection',function(client){

	clientList.push(client);
	client.write("# of users currently connected: "+clientList.length+"\r\n");
	client.changeName = 0;
	
	
	client.on('data',function(data){
		if(client.changeName == 0){
			client.changeName = 1;
			client.write("Hi! What is your name?\r\n");
		} 
		 else if(client.changeName == 1){
			client.changeName = 2;
			client.name =  String(data).replace(/(\r\n|\n|\r)/gm," ");
			//client.name = client.name.replace(/(\r\n|\n|\r)/gm," ");
			client.write('Hi '+ client.name+'\r\n');
		}else {
			broadcast(data,client);
		}
	});
	client.on('end',function(){
		clientList.splice(clientList.indexOf(client),1);
	})
	
	client.on('error', function(e){
		console.log(e);
	})
	
});

function broadcast(message, client){
	var cleanup = []
	
	for(var i = 0 ; i< clientList.length; i++){
		if(client !== clientList[i]){
			if(clientList[i].writable){
				clientList[i].write(client.name + ": " + message);
			} else {
				cleanup.push(clientList[i]);
				clientList[i].destroy()
			}
			
		}
	}
	
	for(i = 0; i<cleanup.length;i++){
		clientList.splice(clientList.indexOf(cleanup[i],1));
	}
	
}
var port = process.env.PORT || 9876;
chatServer.listen(port);