import {
  ButtonSpinner,
  Button as GlueStackButton,
  Text,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof GlueStackButton> & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <GlueStackButton
      w="$full"
      h="$14"
      bg="$green700"
      borderColor="$green500"
      borderWidth="$0"
      borderRadius="$sm"
      $active-bg="$green500"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color='$white' />
      ) : (
        <Text color="$white" fontFamily="$heading" fontSize="$sm">
          {title}
        </Text>
      )}
    </GlueStackButton>
  );
}
