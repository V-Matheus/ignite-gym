import { Image, VStack } from '@gluestack-ui/themed';

import BackGroundImg from '@assets/background.png';

export function Signin() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        source={BackGroundImg}
        defaultSource={BackGroundImg}
        alt="Pessoas treinando"
        w="$full"
        h={624}
        position='absolute'
      />
    </VStack>
  );
}
