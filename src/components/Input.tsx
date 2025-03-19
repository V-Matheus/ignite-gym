import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GlueStackInput,
  InputField,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GlueStackInput
        isInvalid={invalid}
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{
          borderWidth: '$1',
          borderColor: invalid ? '$red500' : '$green500',
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: '$red500',
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          bg="$gray700"
          px="$4"
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GlueStackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
