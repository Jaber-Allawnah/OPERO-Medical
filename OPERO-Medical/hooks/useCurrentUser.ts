import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getCachedUser } from '@/services/user.service';

export default function useCurrentUser() {
  const [user, setUser] = useState<any>(undefined);
  useFocusEffect(
    useCallback(() => {
      getCachedUser().then(setUser);
    }, [])
  );
  return user;
}
