import { Leaf } from '@tamagui/lucide-icons'
import { Text, XStack, type XStackProps } from 'tamagui'

export type EcoBadgeProps = {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
} & XStackProps

export const EcoBadge = ({ size = 'medium', showText = true, ...props }: EcoBadgeProps) => {
  const iconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14
  const fontSize = size === 'small' ? '$1' : size === 'large' ? '$3' : '$2'
  const padding = size === 'small' ? '$1' : size === 'large' ? '$2.5' : '$2'

  return (
    <XStack
      ai="center"
      gap="$1"
      bg="$green3"
      px={padding}
      py="$1"
      borderRadius="$2"
      {...props}
    >
      <Leaf size={iconSize} color="$green10" />
      {showText && (
        <Text fontSize={fontSize} color="$green11" fontWeight="600">
          Eco
        </Text>
      )}
    </XStack>
  )
}
