import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSytem from 'expo-file-system';
import { useState } from 'react';
import { ToastMenssage } from '@components/ToastMenssage';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
  email?: string;
  password?: string | null;
  old_password?: string | null;
  confirm_password?: string | null;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf(
      [yup.ref('password'), undefined],
      'A confirmação de senha não confere',
    ),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/V-Matheus.png',
  );

  const toast = useToast();

  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      const photoUri = photoSelected.assets[0].uri;
      if (photoUri) {
        const photoInfo = (await FileSytem.getInfoAsync(photoUri)) as {
          size: number;
        };

        if (photoInfo && photoInfo.size / 1024 / 1024 > 5)
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMenssage
                id={id}
                action="error"
                title="Imagem muito grande!"
                description="Essa imagem é muito grande. Escolha uma de até 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          });

          const fileExtension = photoUri.split('.').pop();

        const profile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoUri,
          type: `image/${photoSelected.assets[0].type}/${fileExtension}`,
        }

        console.log(profile);
        
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possivel atualizar a foto de perfil';

      toast.show({
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
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data);

      await updateUserProfile(userUpdated);

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMenssage
            id={id}
            action="success"
            title="Perfil atualizado!"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possivel atualizar os dados';

      toast.show({
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
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  isReadOnly
                />
              )}
            />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar Senha
          </Heading>

          <Center w="$full" gap="$4">
            <Controller
              name="old_password"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              onPress={handleSubmit(handleProfileUpdate)}
              title="Atualizar"
              isLoading={isUpdating}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
