import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { ToastMenssage } from '@components/ToastMenssage';
import { HistoryByDayDTO } from '@dtos/HistoryGroupByDay';
import { useToast } from '@gluestack-ui/themed';
import { Heading, Text, VStack } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { useCallback, useEffect, useState } from 'react';
import { SectionList } from 'react-native';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api('/history');
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o historico';

      return toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMenssage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="$gray200"
            fontSize="$md"
            mt="$10"
            mb="$3"
            fontFamily="$heading"
          >
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="$gray200" textAlign="center">
            Não há exercícios registrados, ainda. Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
