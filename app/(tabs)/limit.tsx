import { StyleSheet, View } from 'react-native';
import { Screen, StateView } from '@/components/ui';

/**
 * Limit tab. Matches the app's "CHECK ELIGIBILITY / Shop on 0% interest backed
 * by your Mutual Funds" empty state with a Fetch my portfolio CTA.
 */
export default function LimitScreen() {
  return (
    <Screen>
      <View style={styles.center}>
        <StateView
          icon="lock-closed-outline"
          title="Shop on 0% interest backed by your Mutual Funds"
          message="CHECK ELIGIBILITY"
          actionLabel="Fetch my portfolio"
          onAction={() => {}}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
});
