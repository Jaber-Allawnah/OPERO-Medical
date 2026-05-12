import { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import UserAvatar from '@/components/ui/UserAvatar';
import MenuItem from '@/components/ui/MenuItem';
import { logout } from '@/services/auth.service';
import { saveSecure } from '@/services/storage.service';
import useCurrentUser from '@/hooks/useCurrentUser';
import {router} from "expo-router";

export default function ProfileScreen() {
  const user = useCurrentUser();

  const handleLogout = useCallback(async () => {
    await logout();
    await saveSecure('biometricEnabled', 'false');
    router.replace('/');
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerCard}>
        <View style={styles.userRow}>
          <UserAvatar
            uri={user?.profilePicture}
            size={hp('7%')}
            iconSize={RFValue(28)}
            style={styles.avatar}/>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name ?? 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email ?? ''}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="settings-outline" title="Edit profile" onPress={() => router.push('/edit-profile')} />
        <MenuItem icon="log-out-outline" title="Log Out" onPress={handleLogout} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerCard: {
    backgroundColor: Colors.primary,
    marginHorizontal: wp('5%'),
    marginTop: Spacing.md,
    borderRadius: Spacing.lg,
    padding: Spacing.lg,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  avatar: {
    backgroundColor: Colors.white,
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: Colors.white,
  },
  userEmail: {
    fontSize: RFValue(12),
    color: Colors.white,
    marginTop: Spacing.xxs,
  },
  menuSection: {
    marginHorizontal: wp('5%'),
    marginTop: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    elevation: 2,
  },
});
