import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../../ApiContext';

export function ChatRoomPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const { fetchChatRooms } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChatRooms = async () => {
      try {
        const rooms = await fetchChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    loadChatRooms();
  }, [fetchChatRooms]);

  const handleRoomClick = (roomId) => {
    navigate(`/chatroom/${roomId}`); // Navigate to connected chatroom.
  };

  return (
    <div>
      <h2>Available rooms</h2>
      <ul>
        {chatRooms.map(room => (
          <li key={room.userId} onClick={() => handleRoomClick(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
