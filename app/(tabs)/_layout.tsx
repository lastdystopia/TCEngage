import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabelStyle: { fontSize: 13 }
      }}>
        <Tabs.Screen
        name="index"
        options={{
          title: 'Welcome!',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Upcoming"
        options={{
          title: 'Upcoming',
          tabBarIcon: ({ color }) => <TabBarIcon name="exclamation" color={color} />
          
        }}
      />
      <Tabs.Screen
        name="CurrentEvent"
        options={{
          title: 'Current',
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="Archive"
        options={{
          title: 'Archive',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
