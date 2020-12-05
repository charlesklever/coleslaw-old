
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); //Log on Message in terminal.
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevents bot from replyi ng to its own message
        return
    };
    
    if (receivedMessage.content.startsWith("!")) { // Command Prompt from user
        processCommand(receivedMessage)
    };
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(1) // Removes the leading exlamation mark
    let splitCommand = fullCommand.split(" ") //Split Message up in pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exlaimation is the command
    let arguements = splitCommand.slice(1) // All other words are arguements/options for the command
    
    console.log("Command received: " + primaryCommand)
    console.log("Arguements: " + arguements) // there might not BE any arguements
    
    if (primaryCommand == "help"){
        helpCommand(arguements, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguements, receivedMessage)
        
    } else if (primaryCommand == "ted") {
        tedCommand(arguements, receivedMessage)

    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguements, receivedMessage)
    } else if (primaryCommand == "play") {
        playCommand(arguements, receivedMessage)
    
    } else {
        receivedMessage.channel.send("I'm just a head of lettuce. I don't understand or like capital letters. \nTry '!help' or '!multiply, I know those ones.")
    }
}

function helpCommand(arguements, receivedMessage) {
    if (arguements.length > 0) {
        receivedMessage.channel.send("Oh you were really specific. I'm just gonna hop out of this one. You can just type !help")
    } else {
        receivedMessage.channel.send("coleslaw Ver 0.1.\nUhhh I don't have much going on, check back with Ver 0.2.\n!multiply lets you multiply things. \nCan you find the secret commands?")
    }
}

function tedCommand(arguements, receivedMessage) {
    if (arguements.length > 0) {
        receivedMessage.channel.send("you can just type ted, please.")
    } else {
        receivedMessage.channel.send("Name : Ted \nAge: 28(?)")
    }
}
function playCommand(arguements, receivedMessage) {
    
    if (arguements.length > 0) {
        receivedMessage.channel.send("Oh you want me to play something specific? Ah gee lets see beep boop.... oh no it crashed sorry. Gotta blast")
    
    } else if (receivedMessage.member.voiceChannel){
    
     receivedMessage.member.voiceChannel.join().then(connection => {
         const stream = ytdl('https://www.youtube.com/watch?v=q7DfQMPmJRI', { filter: 'audioonly' });
         const dispatcher = connection.playStream(stream);
         
         dispatcher.on('end', () => voiceChannel.leave());
     }
                              
                              
                             )
    } else {  
        receivedMessage.channel.send("How are you going to listen if you aren't in a voice channel")
    
    }
}
function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

client.on('ready', () => {
    client.user.setActivity("Ted", {type: "WATCHING"})
});

client.on('message', (receivedMessage) => {
    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send("Hello I got your message " +
            receivedMessage.author.toString() + ": " + receivedMessage.content)
    }
})

client.login(auth.token);

