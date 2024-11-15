// src/lib/chatStore.js

import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';
import { useUserStore } from './userStore'

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;
    
    // Set up real-time listener for block status
    if (user && currentUser) {
      // Listen for changes to the other user's document
      const unsubOther = onSnapshot(doc(db, "users", user.id), (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          // Check if current user is blocked by the other user
          const isBlocked = userData.blocked?.includes(currentUser.id) || false;
          set(state => ({
            ...state,
            isCurrentUserBlocked: isBlocked
          }));
        }
      });

      // Listen for changes to current user's document
      const unsubCurrent = onSnapshot(doc(db, "users", currentUser.id), (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          // Check if current user has blocked the other user
          const hasBlocked = userData.blocked?.includes(user.id) || false;
          set(state => ({
            ...state,
            isReceiverBlocked: hasBlocked
          }));
        }
      });

      // Initial block status check
      const isCurrentlyBlocked = user.blocked?.includes(currentUser.id) || false;
      const hasBlockedReceiver = currentUser.blocked?.includes(user.id) || false;

      set({
        chatId,
        user,
        isCurrentUserBlocked: isCurrentlyBlocked,
        isReceiverBlocked: hasBlockedReceiver,
      });

      // Clean up listeners when chat changes
      return () => {
        unsubOther();
        unsubCurrent();
      };
    }
  },

  changeBlock: () => {
    set(state => ({...state, isReceiverBlocked: !state.isReceiverBlocked}))
  },
}))