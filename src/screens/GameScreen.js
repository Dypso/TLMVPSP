import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchQuestions, submitAnswer } from '../actions/gameActions';
import { useWebSocket } from '../hooks/useWebSocket';

const GameScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { questions, currentQuestion, score } = useSelector(state => state.game);
  const { isConnected, lastMessage, sendMessage } = useWebSocket();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (lastMessage) {
      // Handle real-time updates from WebSocket
      console.log('Received WebSocket message:', lastMessage);
    }
  }, [lastMessage]);

  const handleAnswer = (selectedAnswer) => {
    dispatch(submitAnswer(currentQuestion.id, selectedAnswer));
    if (isConnected) {
      sendMessage({ type: 'SUBMIT_ANSWER', payload: { questionId: currentQuestion.id, answer: selectedAnswer } });
    }
  };

  if (!currentQuestion) {
    return <View><Text>{t('loading')}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.text}</Text>
      {currentQuestion.options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswer(option)}
          style={styles.button}
        />
      ))}
      <Text style={styles.score}>{t('score', { score })}</Text>
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
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  score: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default GameScreen;