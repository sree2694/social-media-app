import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MessageBubble = ({ message, self }) => {
  return (
    <Box display="flex" justifyContent={self ? 'flex-end' : 'flex-start'} mb={1}>
      <Paper elevation={2} sx={{ p: 1.5, bgcolor: self ? 'primary.light' : 'grey.200' }}>
        <Typography variant="subtitle2" color="textSecondary">{message.sender}</Typography>
        <Typography>{message.content}</Typography>
      </Paper>
    </Box>
  );
};

export default MessageBubble;
