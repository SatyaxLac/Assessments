import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, StateView, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

const STEPS = [
  { id: 1, label: 'Fetch Portfolio' },
  { id: 2, label: 'Verify Identity' },
  { id: 3, label: 'Pledge Funds' },
  { id: 4, label: 'Sign Agreement' },
];

export default function EligibilityScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [pan, setPan] = useState('');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFetchPortfolio = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 1200);
  };

  if (completed) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Limit Unlocked</Text>
          <Pressable onPress={() => router.back()} hitSlop={12} accessibilityLabel="Close">
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.successContainer}>
          <StateView
            icon="shield-checkmark-outline"
            title="Portfolio Connected!"
            message="Your mutual fund holdings from MFCentral have been verified. You have an unlocked credit limit of ₹1,50,000 for no-cost EMI shopping."
            actionLabel="Start Shopping"
            actionVariant="primary"
            onAction={() => router.replace('/shop')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardWrap}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Step {currentStep} of {STEPS.length}</Text>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </Pressable>
        </View>

        {/* Multi-step Progress Bar */}
        <View style={styles.stepperWrap}>
          <View style={styles.stepperBars}>
            {STEPS.map((s) => {
              const active = s.id <= currentStep;
              return (
                <View
                  key={s.id}
                  style={[
                    styles.stepperBar,
                    active ? styles.stepperBarActive : styles.stepperBarInactive,
                  ]}
                />
              );
            })}
          </View>

          <View style={styles.stepperLabels}>
            {STEPS.map((s) => {
              const active = s.id === currentStep;
              return (
                <Text
                  key={s.id}
                  style={[
                    styles.stepperLabel,
                    active ? styles.stepperLabelActive : styles.stepperLabelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {s.label}
                </Text>
              );
            })}
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text variant="h1" style={styles.title}>
            Connect your portfolio
          </Text>
          <Text variant="bodyMuted" style={styles.subtitle}>
            Enter your PAN to fetch your mutual fund holdings from MFCentral
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter your PAN</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your 10 digit PAN"
                placeholderTextColor={colors.textMuted}
                value={pan}
                onChangeText={(text) => setPan(text.toUpperCase().slice(0, 10))}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={10}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Sticky CTA */}
        <View style={styles.footer}>
          <Button
            label="Fetch Portfolio"
            icon="arrow-forward"
            loading={loading}
            disabled={pan.trim().length === 0}
            onPress={handleFetchPortfolio}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardWrap: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stepperWrap: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  stepperBars: {
    flexDirection: 'row',
    gap: 8,
  },
  stepperBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  stepperBarActive: {
    backgroundColor: colors.primary,
  },
  stepperBarInactive: {
    backgroundColor: '#E6E6EC',
  },
  stepperLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stepperLabel: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  stepperLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  stepperLabelInactive: {
    color: colors.textMuted,
    fontWeight: '500',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl * 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: spacing.xs + 2,
  },
  inputGroup: {
    marginTop: spacing.xxl + 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm + 2,
  },
  inputContainer: {
    backgroundColor: '#FAFAFC',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#ECECF1',
    paddingHorizontal: spacing.lg,
    height: 52,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    padding: 0,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
});
