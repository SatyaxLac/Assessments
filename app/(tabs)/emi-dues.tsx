import { StyleSheet, View } from 'react-native';
import { Screen, StateView } from '@/components/ui';

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
