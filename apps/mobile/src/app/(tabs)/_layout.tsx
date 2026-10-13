import { Tabs } from 'expo-router';
import { TabBar } from '@/components/tabbar';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="guild" />
      <Tabs.Screen name="profil" />
    </Tabs>
  );
}
