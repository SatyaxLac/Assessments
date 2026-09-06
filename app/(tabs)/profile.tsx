import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Card, Screen, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface Action {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  badge?: string;
}

const ACTIONS: Action[] = [
  { icon: 'person-outline', title: 'Profile details', subtitle: 'Name, contact and KYC info' },
  { icon: 'cube-outline', title: 'Purchases', subtitle: 'Orders, invoices and loan status' },
  { icon: 'wallet-outline', title: 'Pledge history', subtitle: 'Funds you pledged or released' },
  { icon: 'people-outline', title: 'Invite friends', subtitle: 'Share the app, earn rewards', badge: 'EARN ₹500' },
  { icon: 'help-circle-outline', title: 'Support & FAQs', subtitle: 'Find answers or contact us' },
  { icon: 'shield-checkmark-outline', title: 'Privacy policy', subtitle: 'How we handle your data' },
  { icon: 'document-text-outline', title: 'Terms & conditions', subtitle: 'Rules governing your use' },
];

/** Profile tab, mirroring the app's account settings list. */
export default function ProfileScreen() {
  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="h1">Profile</Text>
        <Text variant="bodyMuted" style={styles.subtitle}>
          Manage your account settings and personal preferences.
        </Text>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text variant="h2" color={colors.primary}>
              U
            </Text>
          </View>
          <View>
            <Text variant="h3">User</Text>
            <Text variant="bodyMuted">+91 98765 43210</Text>
          </View>
        </View>

        <Text variant="sectionLabel" style={styles.section}>
          QUICK ACTIONS
        </Text>

        <View style={styles.list}>
          {ACTIONS.map((action) => (
            <Pressable key={action.title}>
              <Card style={styles.actionCard} padded>
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.actionText}>
                  <Text variant="h3">{action.title}</Text>
                  <Text variant="caption" color={colors.textSecondary}>
                    {action.subtitle}
                  </Text>
                </View>
                {action.badge ? <Badge label={action.badge} tone="primary" /> : null}
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>
          ))}
        </View>

        <Card style={styles.logout} padded>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text variant="h3" color={colors.danger}>
            Log out
          </Text>
        </Card>

        <Text variant="caption" style={styles.footer}>
          Made with 💜 by 1Fi
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  subtitle: { marginTop: spacing.xs },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xl },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { marginTop: spacing.xxl, marginBottom: spacing.md },
  list: { gap: spacing.md },
  actionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { flex: 1, gap: 2 },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  footer: { textAlign: 'center', marginTop: spacing.xl },
});
