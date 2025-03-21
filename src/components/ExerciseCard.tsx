import { Heading, Image, Text, VStack, Icon } from '@gluestack-ui/themed';
import { HStack } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';

type ExerciseCardProps = ComponentProps<typeof TouchableOpacity> & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$4"
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            {data.name}
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  );
}
