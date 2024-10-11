import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome', { name: user ? user.name : 'Guest' })}</Text>
      <Button
        title={t('startGame')}
        onPress={() => navigation.navigate('Game')}
      />
      <Button
        title={t('viewProfile')}
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title={t('viewLeaderboard')}
        onPress={() => navigation.navigate('Leaderboard')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;