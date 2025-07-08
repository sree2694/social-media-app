package com.socialmedia.app.repository;

import com.socialmedia.app.model.ChatMessageEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {

    @Query("SELECT m FROM ChatMessageEntity m WHERE " +
           "(m.sender = :user1 AND m.recipient = :user2) OR " +
           "(m.sender = :user2 AND m.recipient = :user1) " +
           "ORDER BY m.timestamp ASC")
    List<ChatMessageEntity> findChatBetweenUsers(String user1, String user2);
     List<ChatMessageEntity> findTop10BySenderAndRecipientOrderByTimestampDesc(String sender, String recipient);
}
