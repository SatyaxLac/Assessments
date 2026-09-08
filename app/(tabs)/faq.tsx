import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Screen, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const INTRO_FAQS: FaqItem[] = [
  {
    id: 'intro-1',
    question: 'What is 1Fi?',
    answer:
      '1Fi is the world’s first mutual fund-backed no-cost EMI platform, letting you shop anything at 0% interest for upto 24 months.',
  },
  {
    id: 'intro-2',
    question: 'Is 1Fi safe and legit?',
    answer:
      'Yes, 1Fi is 100% safe and compliant. Your mutual fund investments remain securely held with your SEBI-registered AMC. 1Fi only marks a lien through authorized depositories (CAMS/KFintech).',
  },
  {
    id: 'intro-3',
    question: 'Is this a credit card?',
    answer:
      'No, 1Fi is not a credit card. It is a credit facility backed by your mutual fund portfolio, offering 0% interest EMI options with no annual charges or hidden fees.',
  },
  {
    id: 'intro-4',
    question: 'Who provides the loan?',
    answer:
      '1Fi partners exclusively with RBI-registered Banks and NBFCs to provide approved credit limits and loan facilities directly to consumers.',
  },
  {
    id: 'intro-5',
    question: 'What do I need to be eligible?',
    answer:
      'You must be an Indian citizen aged 18+ with active mutual fund investments tracked by CAMS or KFintech, and a valid PAN card.',
  },
  {
    id: 'intro-6',
    question: 'Do I need income proof?',
    answer:
      'No income proof, salary slips, or ITR required. Your credit limit is based solely on your existing mutual fund portfolio value.',
  },
  {
    id: 'intro-7',
    question: 'Does checking my limit affect credit score?',
    answer:
      'No. Checking your eligibility on 1Fi is a soft check and has zero impact on your CIBIL or credit bureau score.',
  },
  {
    id: 'intro-8',
    question: 'How is my purchase limit calculated?',
    answer:
      'Your purchase limit is calculated as a percentage of your eligible mutual fund NAV (typically 50% to 80% for equity and debt funds), maintaining a prudent safety margin.',
  },
  {
    id: 'intro-9',
    question: 'Which mutual funds are eligible?',
    answer:
      'Over 5,000+ SEBI-registered mutual funds across equity, debt, and hybrid categories tracked by CAMS and KFintech are eligible.',
  },
  {
    id: 'intro-10',
    question: 'Will my SIPs be affected?',
    answer:
      'Not at all! Your existing SIPs continue running normally, and your funds continue compounding in the market without interruption.',
  },
  {
    id: 'intro-11',
    question: 'Do I need to sell my mutual funds?',
    answer:
      'Never! You do not sell or liquidate any units. They are only pledged as security, meaning you retain full ownership and future market growth.',
  },
  {
    id: 'intro-12',
    question: 'Do pledged funds still earn returns?',
    answer:
      'Yes, 100%! All market appreciation, dividends, and growth belong entirely to you throughout the loan tenure.',
  },
  {
    id: 'intro-13',
    question: 'What if markets fall?',
    answer:
      'Your loan limit is set with an adequate Loan-to-Value (LTV) buffer. Normal market volatility does not impact your active purchases or repayment terms.',
  },
  {
    id: 'intro-14',
    question: 'Can 1Fi sell my mutual fund units?',
    answer:
      'Units are only invoked in extreme situations of non-payment after extensive grace periods and warnings. As long as EMIs are serviced, your units remain untouched.',
  },
  {
    id: 'intro-15',
    question: 'What documents are needed to take a loan?',
    answer:
      'Zero paperwork. Verification is completed 100% digitally in under 2 minutes via your PAN and Aadhaar OTP.',
  },
];

const MERCHANT_FAQS: FaqItem[] = [
  {
    id: 'merch-1',
    question: 'Where can I shop using 1Fi?',
    answer:
      'You can shop across top brands in electronics, travel, home, and fashion on the 1Fi Marketplace, including Apple, Wakefit, Goibibo, EaseMyTrip, and more.',
  },
  {
    id: 'merch-2',
    question: 'How do I pay using 1Fi at checkout?',
    answer:
      'Select 1Fi as your payment method at checkout, choose your preferred EMI plan (3, 6, 9, 12, or 24 months), and authenticate with an OTP.',
  },
  {
    id: 'merch-3',
    question: 'What is the maximum tenure available?',
    answer:
      'You can choose flexible no-cost EMI tenures ranging from 3 months up to 24 months depending on the product and amount.',
  },
];

const REPAYMENT_FAQS: FaqItem[] = [
  {
    id: 'repay-1',
    question: 'How do I repay my monthly EMIs?',
    answer:
      'Auto-debit (e-NACH / UPI Autopay) is set up during approval so your monthly payments are deducted automatically on your scheduled due date.',
  },
  {
    id: 'repay-2',
    question: 'Can I foreclose or pay early without penalty?',
    answer:
      'Yes, you can prepay or foreclose your loan at any time with zero penalty or foreclosure fees.',
  },
  {
    id: 'repay-3',
    question: 'When are my pledged mutual fund units released?',
    answer:
      'Immediately upon settling your full outstanding dues, the lien is automatically de-registered and your units are unlocked.',
  },
];

type CategoryKey = 'intro' | 'merchants' | 'repayment';

export default function FaqScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('intro');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getFaqList = () => {
    switch (activeCategory) {
      case 'intro':
        return INTRO_FAQS;
      case 'merchants':
        return MERCHANT_FAQS;
      case 'repayment':
        return REPAYMENT_FAQS;
    }
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'intro':
        return '1. Intro & Eligibility';
      case 'merchants':
        return '2. Using 1Fi & Merchants';
      case 'repayment':
        return '3. Repayment & Charges';
    }
  };

  const currentFaqs = getFaqList();

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
          Support & FAQs
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Contact Cards */}
        <View style={styles.supportCardsRow}>
          {/* Card 1: Email Support */}
          <Pressable
            style={styles.emailCard}
            onPress={() => Linking.openURL('mailto:support@1fi.in')}
          >
            <View style={styles.supportIconWrapPurple}>
              <Ionicons name="mail-outline" size={18} color="#6D3EF2" />
            </View>
            <View style={styles.supportTextWrap}>
              <View style={styles.supportLabelRow}>
                <Text style={styles.supportLabelPurple}>EMAIL SUPPORT</Text>
                <Ionicons name="call-outline" size={12} color="#6D3EF2" style={styles.diagonalArrow} />
              </View>
              <Text style={styles.supportValue}>support@1fi.in</Text>
            </View>
          </Pressable>

          {/* Card 2: Response Time */}
          <View style={styles.timeCard}>
            <View style={styles.supportIconWrapGray}>
              <Ionicons name="time-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.supportTextWrap}>
              <Text style={styles.supportLabelGray}>RESPONSE TIME</Text>
              <Text style={styles.supportValue}>Within 24 hours</Text>
            </View>
          </View>
        </View>

        {/* Categories Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          <Pressable
            style={[
              styles.categoryPill,
              activeCategory === 'intro' && styles.categoryPillActive,
            ]}
            onPress={() => setActiveCategory('intro')}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === 'intro' && styles.categoryTextActive,
              ]}
            >
              Intro & Eligibility
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.categoryPill,
              activeCategory === 'merchants' && styles.categoryPillActive,
            ]}
            onPress={() => setActiveCategory('merchants')}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === 'merchants' && styles.categoryTextActive,
              ]}
            >
              Using 1Fi & Merchants
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.categoryPill,
              activeCategory === 'repayment' && styles.categoryPillActive,
            ]}
            onPress={() => setActiveCategory('repayment')}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === 'repayment' && styles.categoryTextActive,
              ]}
            >
              Repayment
            </Text>
          </Pressable>
        </ScrollView>

        {/* Section Heading with Purple Vertical Bar */}
        <View style={styles.sectionHeader}>
          <View style={styles.verticalBar} />
          <Text style={styles.sectionTitle}>{getCategoryTitle()}</Text>
        </View>

        {/* FAQ Items List */}
        <View style={styles.faqList}>
          {currentFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];

            return (
              <Pressable
                key={faq.id}
                style={[styles.faqCard, isOpen && styles.faqCardOpen]}
                onPress={() => toggleFaq(faq.id)}
              >
                <View style={styles.faqHeaderRow}>
                  <Text style={styles.questionText}>{faq.question}</Text>
                  <View style={[styles.plusIconWrap, isOpen && styles.plusIconWrapOpen]}>
                    <Ionicons
                      name={isOpen ? 'remove' : 'add'}
                      size={18}
                      color={isOpen ? '#6D3EF2' : '#9CA3AF'}
                    />
                  </View>
                </View>
                {isOpen && <Text style={styles.answerText}>{faq.answer}</Text>}
              </Pressable>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerCopyright}>
            © 2026 1Fi. All rights reserved.
          </Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Privacy</Text>
            <Text style={styles.footerLink}>Terms</Text>
          </View>
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
    gap: spacing.lg,
  },

  // Support Cards
  supportCardsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  emailCard: {
    flex: 1,
    backgroundColor: '#F6F2FE',
    borderWidth: 1,
    borderColor: '#ECE6FD',
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF0',
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  supportIconWrapPurple: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportIconWrapGray: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportTextWrap: {
    flex: 1,
    gap: 2,
  },
  supportLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supportLabelPurple: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6D3EF2',
    letterSpacing: 0.5,
  },
  diagonalArrow: {
    transform: [{ rotate: '45deg' }],
  },
  supportLabelGray: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#8E8E93',
    letterSpacing: 0.5,
  },
  supportValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },

  // Category Pills
  categoriesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  categoryPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryPillActive: {
    backgroundColor: '#6D3EF2',
    borderColor: '#6D3EF2',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  verticalBar: {
    width: 3.5,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#6D3EF2',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  // FAQ List
  faqList: {
    gap: 10,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF0',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  faqCardOpen: {
    borderColor: '#D5C4FE',
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
  },
  plusIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconWrapOpen: {
    backgroundColor: '#F3EEFE',
  },
  answerText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F3F4F6',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F4',
  },
  footerCopyright: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  footerLink: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
});
