import {
  ButtonSpinner,
  Button as GlueStackButton,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof GlueStackButton> & {
  title: string;
  isLoading?: boolean;
  variant?: 'solid' | 'outline';
};

export function Button({
  title,
  variant = 'solid',
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <GlueStackButton
      w="$full"
      h="$14"
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderColor="$green500"
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderRadius="$sm"
      $active-bg={variant === 'outline' ? '$gray500' : '$green500'}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text
          color={variant === 'outline' ? '$green500' : '$white'}
          fontFamily="$heading"
          fontSize="$sm"
        >
          {title}
        </Text>
      )}
    </GlueStackButton>
  );
}
