import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export function SignUp() {
  const { control } = useForm();

  const navigator = useNavigation();

  function handleGoBck() {
    navigator.goBack();
  }

  function handleSignUp() {
    console.log(name);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackGroundImg}
          defaultSource={BackGroundImg}
          alt="Pessoas treinando"
          w="$full"
          h={624}
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />
            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar a Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button onPress={handleSignUp} title="Criar e acessar" />
          </Center>

          <Button
            onPress={handleGoBck}
            title="Voltar para o login"
            variant="outline"
            mt="$12"
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
