import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Screen, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

const REFER_BANNER = require('../../assets/refer-screen-banner.png');
const REFERRAL_CODE = 'G3LQ8421';

interface TierRow {
  range: string;
  credits: string;
}

const ELIGIBILITY_TIERS: TierRow[] = [
  { range: '₹10K - ₹50K', credits: '50' },
  { range: '₹50K - ₹1L', credits: '100' },
  { range: '₹1L - ₹5L', credits: '200' },
  { range: '₹5L - ₹10L', credits: '300' },
  { range: '₹10L+', credits: '500' },
];

const LOAN_TIERS: TierRow[] = [
  { range: '₹10K - ₹50K', credits: '150' },
  { range: '₹50K - ₹1L', credits: '300' },
  { range: '₹1L - ₹5L', credits: '600' },
  { range: '₹5L - ₹10L', credits: '1,000' },
  { range: '₹10L+', credits: '1,500' },
];

export default function ReferScreen() {
  const router = useRouter();
  const [activeTierTab, setActiveTierTab] = useState<'eligibility' | 'loan'>('eligibility');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (textToCopy: string) => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareUrl = `https://1fi.in/refer?code=${REFERRAL_CODE}`;
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Join 1Fi',
        text: `Use my referral code ${REFERRAL_CODE} on 1Fi to get rewards!`,
        url: shareUrl,
      }).catch(() => handleCopy(shareUrl));
    } else {
      handleCopy(shareUrl);
    }
  };

  const currentTiers = activeTierTab === 'eligibility' ? ELIGIBILITY_TIERS : LOAN_TIERS;

  return (
    <Screen padded={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </Pressable>
        <Text variant="h2" style={styles.headerTitle}>
          Refer & Earn
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Purple Banner */}
        <View style={styles.bannerWrap}>
          <Image
            source={REFER_BANNER}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Stats Card (3 columns) */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, { backgroundColor: '#F3EEFE' }]}>
              <Ionicons name="people-outline" size={18} color="#6D3EF2" />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>FRIENDS REFERRED</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, { backgroundColor: '#E6FAF3' }]}>
              <Ionicons name="link-outline" size={18} color="#05C168" />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>CREDITS REDEEMED</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, { backgroundColor: '#FFF4EB' }]}>
              <Ionicons name="wallet-outline" size={18} color="#F97316" />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>CREDITS REMAINING</Text>
          </View>
        </View>

        {/* Referral Code Card */}
        <View style={styles.codeCard}>
          <View style={styles.codeCardGlow} />

          <Text style={styles.codeCardLabel}>YOUR REFERRAL CODE</Text>

          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{REFERRAL_CODE}</Text>
            <Pressable
              style={[styles.copyIconBtn, copied && styles.copyIconBtnSuccess]}
              onPress={() => handleCopy(REFERRAL_CODE)}
              hitSlop={8}
            >
              <Ionicons
                name={copied ? 'checkmark' : 'copy-outline'}
                size={20}
                color={copied ? '#05C168' : '#6D3EF2'}
              />
            </Pressable>
          </View>

          {copied && (
            <Text style={styles.copiedToast}>Code copied to clipboard!</Text>
          )}

          <View style={styles.dashedDivider} />

          {/* Action buttons */}
          <View style={styles.codeActionsRow}>
            <Pressable
              style={styles.copyLinkBtn}
              onPress={() => handleCopy(`https://1fi.in/refer?code=${REFERRAL_CODE}`)}
            >
              <Ionicons name="link-outline" size={18} color="#6D3EF2" />
              <Text style={styles.copyLinkText}>Copy link</Text>
            </Pressable>

            <Pressable style={styles.shareLinkBtn} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
              <Text style={styles.shareLinkText}>Share link</Text>
            </Pressable>
          </View>
        </View>

        {/* Earn twice per friend Section */}
        <Text style={styles.sectionHeading}>Earn twice per friend</Text>

        <View style={styles.timelineContainer}>
          {/* Step 1 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineIconBadge}>
                <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.timelineDashedLine} />
            </View>

            <View style={styles.timelineCard}>
              <Text style={styles.rewardSub}>REWARD 1 · ELIGIBILITY CHECK</Text>
              <Text style={styles.rewardTitle}>Friend checks eligibility</Text>
              <Text style={styles.rewardDesc}>
                You both earn credits the moment your friend checks their eligibility — the
                higher the eligibility, the higher the reward.
              </Text>
              <View style={styles.purplePill}>
                <Ionicons name="link-outline" size={14} color="#6D3EF2" />
                <Text style={styles.purplePillText}>50 – 500 credits</Text>
              </View>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineIconBadge}>
                <Ionicons name="card-outline" size={20} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.timelineCard}>
              <Text style={styles.rewardSub}>REWARD 2 · FIRST LOAN</Text>
              <Text style={styles.rewardTitle}>Friend takes their first loan</Text>
              <Text style={styles.rewardDesc}>
                A bonus lands for both of you when your friend disburses their first loan —
                the bigger the loan, the bigger the bonus.
              </Text>
              <View style={styles.greenPill}>
                <Ionicons name="trending-up-outline" size={14} color="#05C168" />
                <Text style={styles.greenPillText}>up to 1,500 credits</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reward tiers Section */}
        <Text style={styles.sectionHeading}>Reward tiers</Text>

        <View style={styles.tiersCard}>
          {/* Tabs */}
          <View style={styles.tierTabsContainer}>
            <Pressable
              style={[
                styles.tierTab,
                activeTierTab === 'eligibility' && styles.tierTabActive,
              ]}
              onPress={() => setActiveTierTab('eligibility')}
            >
              <Text
                style={[
                  styles.tierTabText,
                  activeTierTab === 'eligibility' && styles.tierTabTextActive,
                ]}
              >
                Eligibility check
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tierTab,
                activeTierTab === 'loan' && styles.tierTabActive,
              ]}
              onPress={() => setActiveTierTab('loan')}
            >
              <Text
                style={[
                  styles.tierTabText,
                  activeTierTab === 'loan' && styles.tierTabTextActive,
                ]}
              >
                First loan
              </Text>
            </Pressable>
          </View>

          {/* Tiers List */}
          <View style={styles.tiersList}>
            {currentTiers.map((tier, idx) => (
              <View
                key={tier.range}
                style={[
                  styles.tierRow,
                  idx < currentTiers.length - 1 && styles.tierRowDivider,
                ]}
              >
                <Text style={styles.tierRange}>{tier.range}</Text>
                <View style={styles.tierCreditsWrap}>
                  <Text style={styles.tierCreditsNum}>{tier.credits} </Text>
                  <Text style={styles.tierCreditsLabel}>credits</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Important Details Accordion */}
        <View style={styles.detailsCard}>
          <Pressable
            style={styles.detailsHeader}
            onPress={() => setIsDetailsOpen(!isDetailsOpen)}
          >
            <View style={styles.detailsIconWrap}>
              <Ionicons name="information-circle-outline" size={20} color="#6D3EF2" />
            </View>
            <Text style={styles.detailsTitle}>Important Details</Text>
            <Ionicons
              name={isDetailsOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#9CA3AF"
            />
          </Pressable>

          {isDetailsOpen && (
            <View style={styles.detailsContent}>
              <Text style={styles.detailsItem}>
                • Referral credits have a 1-year validity from the date of issue.
              </Text>
              <Text style={styles.detailsItem}>
                • 1 credit = ₹1 and can be redeemed towards marketplace purchases or loan EMIs.
              </Text>
              <Text style={styles.detailsItem}>
                • The referred friend must complete mutual fund portfolio verification.
              </Text>
              <Text style={styles.detailsItem}>
                • Bonus credits are disbursed within 24 hours of loan disbursal.
              </Text>
              <Text style={styles.detailsItem}>
                • Total referral earnings are capped at ₹50,000 per user.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  backBtn: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl + 20,
    gap: spacing.md,
  },

  // Banner
  bannerWrap: {
    width: '100%',
    aspectRatio: 428 / 175,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 44,
    backgroundColor: '#F0F0F2',
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.4,
    textAlign: 'center',
  },

  // Referral Code Card
  codeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  codeCardGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#6D3EF2',
    opacity: 0.06,
  },
  codeCardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.8,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  codeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#6D3EF2',
    letterSpacing: 1.5,
  },
  copyIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E6DDFE',
    backgroundColor: '#F8F6FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIconBtnSuccess: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
  },
  copiedToast: {
    fontSize: 11,
    color: '#05C168',
    fontWeight: '600',
    marginTop: 4,
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    marginVertical: spacing.md,
  },
  codeActionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  copyLinkBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#D5C4FE',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  copyLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6D3EF2',
  },
  shareLinkBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#6D3EF2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  shareLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Earn twice per friend
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginTop: spacing.sm,
  },
  timelineContainer: {
    gap: spacing.md,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 42,
  },
  timelineIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6D3EF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D3EF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineDashedLine: {
    flex: 1,
    width: 1,
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D5C4FE',
    marginTop: 6,
    marginBottom: -6,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF0',
    padding: spacing.md + 2,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  rewardSub: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
  },
  rewardTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#111827',
  },
  rewardDesc: {
    fontSize: 12.5,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 2,
  },
  purplePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3EEFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    gap: 6,
    marginTop: 6,
  },
  purplePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D3EF2',
  },
  greenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    gap: 6,
    marginTop: 6,
  },
  greenPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#05C168',
  },

  // Reward tiers
  tiersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ECECF0',
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  tierTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    padding: 3,
    marginBottom: spacing.md,
  },
  tierTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
  },
  tierTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tierTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  tierTabTextActive: {
    fontWeight: '700',
    color: '#6D3EF2',
  },
  tiersList: {
    gap: 0,
  },
  tierRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tierRowDivider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#F0F0F4',
  },
  tierRange: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  tierCreditsWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  tierCreditsNum: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  tierCreditsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },

  // Important Details
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF0',
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3EEFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  detailsTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  detailsContent: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 8,
  },
  detailsItem: {
    fontSize: 12.5,
    color: '#6B7280',
    lineHeight: 18,
  },
});
