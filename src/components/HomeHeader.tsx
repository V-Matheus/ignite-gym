import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

export function HomeHeader() {
  return (
    <HStack>
      <VStack>
        <Text color="$gray100" fontSize="$sm">
          olá
        </Text>
        <Heading color="$gray100" fontSize="$md">
          Home
        </Heading>
      </VStack>
    </HStack>
  );
}
