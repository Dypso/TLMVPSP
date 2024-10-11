import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const LeaderboardScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { leaderboard } = useSelector(state => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{index + 1}. {item.name}</Text>
      <Text>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('leaderboard')}</Text>
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LeaderboardScreen;