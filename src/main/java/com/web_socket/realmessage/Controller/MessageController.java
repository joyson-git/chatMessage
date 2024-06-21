package com.web_socket.realmessage.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.web_socket.realmessage.model.Message;

@RestController
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getContent(Message message) { // Removed @RequestBody
        try {
            Thread.sleep(2000); 
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return message;
    }
}
