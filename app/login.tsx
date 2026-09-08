import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const LOGIN_HERO = require('../assets/login-hero.png');

const BREAKPOINT = 768;

export default function LoginScreen() {
  const router = useRouter();
  const { setPhoneNumber } = useAuth();
  const { width } = useWindowDimensions();
  const isWide = width >= BREAKPOINT;

  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const canProceed = phone.length === 10 && agreed;

  const handleProceed = () => {
    if (canProceed) {
      setPhoneNumber(phone);
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.container, isWide && styles.containerRow]}>
      {/* ─── Hero Panel — just the image, text is baked in ─── */}
      <View style={[styles.heroPanel, isWide && styles.heroPanelWide]}>
        <Image
          source={LOGIN_HERO}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* ─── Form Panel ─── */}
      <ScrollView
        style={[styles.formPanel]}
        contentContainerStyle={[
          styles.formContent,
          isWide && styles.formContentWide,
        ]}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.formInner, isWide && styles.formInnerWide]}>
          <Text style={styles.formTitle}>Mobile Number</Text>
          <Text style={styles.formSubtitle}>
            Enter the number linked to your investments.
          </Text>

          {/* Phone Input */}
          <View style={styles.inputRow}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={[
                styles.phoneInput,
                Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {},
              ]}
              placeholder="Enter mobile number"
              placeholderTextColor="#B0B0BE"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* T&C Checkbox */}
          <TouchableOpacity
            style={styles.checkRow}
            activeOpacity={0.7}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>{'\u2713'}</Text>}
            </View>
            <Text style={styles.checkLabel}>
              {'I agree with '}
              <Text style={styles.link}>T&C</Text>
              {' and '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Proceed Button */}
          <TouchableOpacity
            style={[styles.proceedBtn, !canProceed && styles.proceedBtnDisabled]}
            activeOpacity={0.8}
            onPress={handleProceed}
            disabled={!canProceed}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ── Container ── */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  containerRow: {
    flexDirection: 'row',
  },

  /* ── Hero ── */
  heroPanel: {
    width: '100%',
    minHeight: 400,
    overflow: 'hidden',
  },
  heroPanelWide: {
    width: '50%',
    minHeight: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  /* ── Form ── */
  formPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  formContentWide: {
    paddingHorizontal: 80,
  },
  formInner: {
    width: '100%',
  },
  formInnerWide: {
    maxWidth: 420,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#161622',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#5C5C6B',
    marginBottom: 32,
    lineHeight: 20,
  },

  /* ── Input ── */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0D8F8',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    marginBottom: 22,
    backgroundColor: '#FAFAFE',
  },
  prefix: {
    fontSize: 15,
    fontWeight: '600',
    color: '#161622',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#161622',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  /* ── Checkbox ── */
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D0D0DA',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#6D3EF2',
    borderColor: '#6D3EF2',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  checkLabel: {
    fontSize: 13,
    color: '#5C5C6B',
  },
  link: {
    color: '#6D3EF2',
    textDecorationLine: 'underline',
  },

  /* ── Proceed ── */
  proceedBtn: {
    backgroundColor: '#6D3EF2',
    borderRadius: 30,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D3EF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  proceedBtnDisabled: {
    backgroundColor: '#C4B0F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  proceedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
