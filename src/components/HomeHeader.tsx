import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import { LogOut } from 'lucide-react-native';
import { Icon } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import defaultUserPhoto from '@assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaultUserPhoto}
        alt="Imagem do usuário"
        size="sm"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          olá
        </Text>
        <Heading color="$gray100" fontSize="$md">
          {user?.name}
        </Heading>
      </VStack>

      <Icon as={LogOut} color="$gray100" size="md" />
    </HStack>
  );
}
