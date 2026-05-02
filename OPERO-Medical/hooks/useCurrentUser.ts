import { useEffect, useState } from 'react';
import { getCachedUser } from '@/services/user.service';

export default function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    getCachedUser().then(setUser);
  }, []);
  return user;
}
