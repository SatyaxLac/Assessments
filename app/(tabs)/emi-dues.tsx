import { StyleSheet, View } from 'react-native';
import { Screen, StateView } from '@/components/ui';

/**
 * EMI Dues tab. Matches the app's empty state: "NOTHING DUE YET / Looks like
 * you haven't shopped yet with 1Fi" and a Check eligibility CTA.
 */
export default function EmiDuesScreen() {
  return (
    <Screen>
      <View style={styles.center}>
        <StateView
          icon="receipt-outline"
          title="Looks like you haven’t shopped yet with 1Fi"
          message="NOTHING DUE YET"
          actionLabel="Check eligibility"
          onAction={() => {}}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
});
