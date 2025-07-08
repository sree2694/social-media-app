package com.socialmedia.app.service;

import com.socialmedia.app.dto.ChatMessage;
import com.socialmedia.app.model.ChatMessageEntity;
import com.socialmedia.app.repository.ChatMessageRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    // Save message to DB
    public ChatMessage saveMessage(ChatMessage message) {
        ChatMessageEntity entity = new ChatMessageEntity();
        entity.setSender(message.getSender());
        entity.setRecipient(message.getRecipient());
        entity.setContent(message.getContent());
        entity.setType(message.getType());
        entity.setTimestamp(LocalDateTime.now());

        // ✅ Use correct variable
        ChatMessageEntity saved = chatMessageRepository.save(entity);

        message.setTimestamp(saved.getTimestamp().toString());
        return message;
    }

    // Get chat history between two users
    public List<ChatMessage> getChatHistory(String user1, String user2) {
        List<ChatMessageEntity> history = chatMessageRepository.findChatBetweenUsers(user1, user2);
        return history.stream().map(entity -> new ChatMessage(
                entity.getSender(),
                entity.getRecipient(),
                entity.getContent(),
                entity.getTimestamp().toString(),
                entity.getType()
        )).collect(Collectors.toList());
    }
}
