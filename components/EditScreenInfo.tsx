import React from 'react';
import {  StyleSheet, Linking } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const emailAddress = 'theatercnuengage@gmail.com';

  const handleEmailLinkPress = () => {
    const mailtoUrl = `mailto:${emailAddress}`;
    Linking.openURL(mailtoUrl);
  };

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          This application is still in development.
          If you locked out of your account, please send an email to the hyperlink below.
        </Text>
      </View>

      <View style={styles.helpContainer}>
          <Text style={styles.helpLink} lightColor={Colors.light.tint} onPress={handleEmailLinkPress}> Please report any bugs that interfere with your experience here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
