import { View, ActivityIndicator } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Spacing } from '@/constants/theme';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function AppLayout() {
  const user = useCurrentUser();

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const isDoctor = user?.role === 'doctor';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          borderTopLeftRadius: Spacing.xl,
          borderTopRightRadius: Spacing.xl,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: Spacing.md,
          paddingBottom: Spacing.md,
        },
        tabBarActiveTintColor: Colors.nero,
        tabBarInactiveTintColor: Colors.white,
        tabBarLabelStyle: {
          fontSize: RFValue(10),
        },
      }}>

      <Tabs.Screen
        name="doctors"
        options={{
          href: isDoctor ? null : undefined,
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={RFValue(22)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments/index"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={RFValue(22)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={RFValue(22)} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="payment/index" options={{ href: null }} />
    </Tabs>
  );
}
