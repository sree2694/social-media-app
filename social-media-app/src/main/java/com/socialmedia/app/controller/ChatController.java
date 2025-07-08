package com.socialmedia.app.controller;

import com.socialmedia.app.dto.ChatMessage;
import com.socialmedia.app.model.ChatMessageEntity;
import com.socialmedia.app.repository.ChatMessageRepository;
import com.socialmedia.app.service.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageRepository chatRepo;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.sendMessage") // maps to /app/chat.sendMessage
    @SendTo("/topic/public") // not required if using messagingTemplate
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // Save to DB
        ChatMessageEntity msg = new ChatMessageEntity();
        msg.setSender(chatMessage.getSender());
        msg.setRecipient(chatMessage.getRecipient());
        msg.setContent(chatMessage.getContent());
        msg.setType(chatMessage.getType());
        msg.setTimestamp(LocalDateTime.now());
        chatRepo.save(msg);

        // Send to recipient/topic
        messagingTemplate.convertAndSend("/topic/public", chatMessage);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage) {
        chatMessage.setContent(chatMessage.getSender() + " joined");
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        messagingTemplate.convertAndSend("/topic/public", chatMessage);
    }

   @MessageMapping("/private-message")
public void receivePrivateMessage(@Payload ChatMessage chatMessage) {
    // Save and enrich message (timestamp)
    ChatMessage saved = chatService.saveMessage(chatMessage);

    // Send to recipient
    messagingTemplate.convertAndSendToUser(
            saved.getRecipient(),
            "/queue/messages",
            saved
    );
}

}
