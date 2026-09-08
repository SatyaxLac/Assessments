import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'What is 1Fi?',
    answer:
      '1Fi is the world’s first mutual fund-backed no-cost EMI platform, letting you shop anything at 0% interest for upto 24 months.',
  },
  {
    id: '2',
    question: 'Is 1Fi safe and legit?',
    answer:
      'Yes, 1Fi is 100% safe and compliant. Your mutual fund investments remain securely held with your SEBI-registered AMC. 1Fi only marks a lien through authorized depositories (CAMS/KFintech).',
  },
  {
    id: '3',
    question: 'Who is the RBI approved lending partner?',
    answer:
      '1Fi partners exclusively with RBI-registered Banks and NBFCs to provide credit limits and loan facilities directly to your account.',
  },
  {
    id: '4',
    question: 'What documents are needed to take a loan?',
    answer:
      'No physical paperwork is needed. You only need your PAN and Aadhaar for instant digital verification via OTP.',
  },
  {
    id: '5',
    question: 'Are there any hidden fees?',
    answer:
      'Zero hidden fees. There are no processing fees, no documentation charges, and no foreclosure penalties.',
  },
  {
    id: '6',
    question: 'What if markets fall?',
    answer:
      'Your loan limit is set with an adequate safety margin (Loan-to-Value buffer). Moderate market dips do not affect your active EMIs.',
  },
  {
    id: '7',
    question: 'Are there any charges if I pay early to release my pledged mutual fund units?',
    answer:
      'No prepayment or foreclosure charges whatsoever. Once your dues are cleared, your pledged mutual fund units are released immediately.',
  },
];

export function FaqSection() {
  const router = useRouter();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ '1': true });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {FAQS.map((faq, index) => {
          const isOpen = !!openIds[faq.id];
          const isLast = index === FAQS.length - 1;

          return (
            <Pressable
              key={faq.id}
              style={[styles.faqItem, !isLast && styles.faqItemDivider]}
              onPress={() => toggleFaq(faq.id)}
            >
              <View style={styles.questionRow}>
                <Text style={styles.questionText}>{faq.question}</Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#9CA3AF"
                />
              </View>
              {isOpen && <Text style={styles.answerText}>{faq.answer}</Text>}
            </Pressable>
          );
        })}
      </View>

      {/* View all FAQs Button */}
      <Pressable
        style={styles.viewAllBtn}
        onPress={() => router.push('/faq')}
        accessibilityRole="button"
        accessibilityLabel="View all FAQs"
      >
        <Text style={styles.viewAllText}>View all FAQs</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECECF0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  faqItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 21,
  },
  answerText: {
    fontSize: 13.5,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 10,
  },
  viewAllBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#ECE6FD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
