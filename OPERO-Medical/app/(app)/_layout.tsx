/**
 * App Layout
 *
 * Bottom tab navigator. Doctors is the first tab (landing page after login).
 * Tab order: Doctors → Appointments → Profile
 *
 * Doctor Details and Payment are accessible via router.push() but hidden from the tab bar.
 * But we added payment to be visible so that we can access it during discussion 1
 */
import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="doctors/index" options={{ title: 'Doctors' }} />
      <Tabs.Screen name="appointments/index" options={{ title: 'Appointments' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="payment/index" options={{ title: "Payment" }} />
        {/* Hidden from tab bar — navigated to via router.push() */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="doctors/[id]" options={{ href: null }} />
    </Tabs>
  );
}
