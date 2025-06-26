package com.socialmedia.app.model;

import com.socialmedia.app.dto.ChatMessage.MessageType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message_entity")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String recipient;
    private String content;

    @Enumerated(EnumType.STRING)
    private MessageType type;


    private LocalDateTime timestamp = LocalDateTime.now();
}
