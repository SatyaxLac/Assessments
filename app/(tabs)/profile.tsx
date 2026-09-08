import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Card, Screen, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';
import { useAuth } from '@/context/AuthContext';

interface Action {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  badge?: string;
  onPress?: () => void;
}

interface KycField {
  label: string;
  value: string;
  status: 'verified' | 'not_provided';
}

function getKycFields(phone: string): KycField[] {
  return [
    { label: 'Full Name', value: '—', status: 'not_provided' },
    { label: 'Email', value: '—', status: 'not_provided' },
    { label: 'Phone Number', value: phone ? `+91 ${phone}` : '—', status: phone ? 'verified' : 'not_provided' },
    { label: 'PAN', value: '—', status: 'not_provided' },
    { label: 'Date of Birth', value: '—', status: 'not_provided' },
    { label: 'Gender', value: '—', status: 'not_provided' },
  ];
}

export default function ProfileScreen() {
  const router = useRouter();
  const { phoneNumber } = useAuth();
  const [currentView, setCurrentView] = useState<'details' | 'menu'>('details');
  const KYC_FIELDS = getKycFields(phoneNumber);
  const displayPhone = phoneNumber ? `+91 ${phoneNumber}` : '+91 —';

  const actions: Action[] = [
    {
      icon: 'person-outline',
      title: 'Profile details',
      subtitle: 'Name, contact and KYC info',
      onPress: () => setCurrentView('details'),
    },
    {
      icon: 'people-outline',
      title: 'Invite friends',
      subtitle: 'Share the app, earn rewards',
      badge: 'EARN ₹1,000',
      onPress: () => router.push('/refer'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Support & FAQs',
      subtitle: 'Find answers or contact us',
      onPress: () => router.push('/faq'),
    },
    {
      icon: 'cube-outline',
      title: 'Purchases',
      subtitle: 'Orders, invoices and loan status',
      onPress: () => router.push('/shop'),
    },
    {
      icon: 'wallet-outline',
      title: 'Pledge history',
      subtitle: 'Funds you pledged or released',
      onPress: () => router.push('/limit'),
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy policy',
      subtitle: 'How we handle your data',
    },
    {
      icon: 'document-text-outline',
      title: 'Terms & conditions',
      subtitle: 'Rules governing your use',
    },
  ];

  if (currentView === 'details') {
    return (
      <Screen padded={false}>
        {/* Top Header */}
        <View style={styles.detailsHeader}>
          <Pressable
            style={styles.backBtn}
            onPress={() => setCurrentView('menu')}
            hitSlop={12}
            accessibilityLabel="Back to Profile menu"
          >
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </Pressable>
          <Text style={styles.detailsHeaderTitle}>Profile</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.detailsScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* User Profile Row */}
          <View style={styles.userProfileRow}>
            <View style={styles.avatarGradient}>
              <Text style={styles.avatarLetter}>U</Text>
            </View>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>User</Text>
              <Text style={styles.userPhone}>{displayPhone}</Text>
              <View style={styles.kycStatusRow}>
                <Text style={styles.kycStatusLabel}>KYC Status: </Text>
                <View style={styles.statusDot} />
                <Text style={styles.kycStatusPending}>Pending</Text>
              </View>
            </View>
          </View>

          {/* KYC DETAILS Card */}
          <View style={styles.kycCard}>
            <Text style={styles.kycCardTitle}>KYC DETAILS</Text>

            <View style={styles.kycFieldsList}>
              {KYC_FIELDS.map((field, index) => {
                const isLast = index === KYC_FIELDS.length - 1;

                return (
                  <View
                    key={field.label}
                    style={[styles.kycFieldRow, !isLast && styles.kycFieldDivider]}
                  >
                    {/* Left side: Label & Value */}
                    <View style={styles.kycFieldLeft}>
                      <Text style={styles.kycFieldLabel}>{field.label}</Text>
                      <Text
                        style={[
                          styles.kycFieldValue,
                          field.status === 'verified' && styles.kycFieldValueVerified,
                        ]}
                      >
                        {field.value}
                      </Text>
                    </View>

                    {/* Right side: Badge */}
                    {field.status === 'verified' ? (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark" size={13} color="#05C168" />
                        <Text style={styles.verifiedBadgeText}>Verified</Text>
                      </View>
                    ) : (
                      <View style={styles.notProvidedBadge}>
                        <Text style={styles.notProvidedBadgeText}>— Not Provided</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  // Menu View
  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="h1">Profile</Text>
        <Text variant="bodyMuted" style={styles.subtitle}>
          Manage your account settings and personal preferences.
        </Text>

        <Pressable style={styles.userRow} onPress={() => setCurrentView('details')}>
          <View style={styles.avatarGradient}>
            <Text style={styles.avatarLetter}>U</Text>
          </View>
          <View style={styles.userInfoText}>
            <Text variant="h3">User</Text>
            <Text variant="bodyMuted">{displayPhone}</Text>
            <View style={styles.kycStatusRow}>
              <Text style={styles.kycStatusLabel}>KYC Status: </Text>
              <View style={styles.statusDot} />
              <Text style={styles.kycStatusPending}>Pending</Text>
            </View>
          </View>
        </Pressable>

        <Text variant="sectionLabel" style={styles.section}>
          QUICK ACTIONS
        </Text>

        <View style={styles.list}>
          {actions.map((action) => (
            <Pressable key={action.title} onPress={action.onPress}>
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
  // Details View Header
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: 8,
    backgroundColor: colors.background,
  },
  backBtn: {
    padding: 4,
    marginLeft: -4,
  },
  detailsHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  detailsScrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl + 20,
    gap: spacing.lg,
  },

  // User Row
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md + 2,
    marginTop: spacing.xs,
  },
  avatarGradient: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarLetter: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userInfoText: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
  },
  userPhone: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  kycStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  kycStatusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  kycStatusPending: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },

  // KYC Card
  kycCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ECECF0',
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  kycCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8E8E93',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  kycFieldsList: {
    marginTop: spacing.xs,
  },
  kycFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  kycFieldDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  kycFieldLeft: {
    flex: 1,
    gap: 4,
  },
  kycFieldLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#6B7280',
  },
  kycFieldValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  kycFieldValueVerified: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  // Badges
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  verifiedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#05C168',
  },
  notProvidedBadge: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  notProvidedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Menu View Styles
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  subtitle: { marginTop: spacing.xs },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF0',
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
