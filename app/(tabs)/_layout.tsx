import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { colors, shadow } from '@/theme';

type IoniconName = keyof typeof Ionicons.glyphMap;

function TabIcon({ name, focused }: { name: IoniconName; focused: boolean }) {
  return (
    <View style={styles.iconWrap}>
      {focused && <View style={styles.indicator} />}
      <Ionicons
        name={name}
        size={22}
        color={focused ? colors.primary : colors.textMuted}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="home-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon name="storefront-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="emi-dues"
        options={{
          title: 'EMI Dues',
          tabBarIcon: ({ focused }) => <TabIcon name="receipt-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="limit"
        options={{
          title: 'Limit',
          tabBarIcon: ({ focused }) => <TabIcon name="stats-chart-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="refer"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Platform.select({ ios: 88, default: 64 }),
    paddingTop: 8,
    paddingBottom: Platform.select({ ios: 28, default: 8 }),
    ...shadow.floating,
  },
  tabItem: { paddingTop: 4 },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  iconWrap: { alignItems: 'center', justifyContent: 'center', width: 40 },
  indicator: {
    position: 'absolute',
    top: -10,
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
