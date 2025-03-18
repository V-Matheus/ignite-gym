import { Heading, Image, Text, VStack, Icon } from '@gluestack-ui/themed';
import { HStack } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

type ExerciseCardProps = ComponentProps<typeof TouchableOpacity>;

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb='$4'>
        <Image
          source={{
            uri: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-puxada-aberta-com-barra-no-pulley-1.gif',
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
            Puxada Frontal
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={ChevronRight} color='$gray300' />
      </HStack>
    </TouchableOpacity>
  );
}
