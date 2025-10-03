import { YStack, YStackProps } from '@my/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ReactNode } from 'react'

interface ScreenWrapperProps extends YStackProps {
  children: ReactNode
  /**
   * Whether to apply safe area padding to the top
   * @default true
   */
  safeAreaTop?: boolean
  /**
   * Whether to apply safe area padding to the bottom
   * @default true
   */
  safeAreaBottom?: boolean
  /**
   * Additional top padding beyond safe area
   * @default 0
   */
  additionalTopPadding?: number
  /**
   * Additional bottom padding beyond safe area
   * @default 0
   */
  additionalBottomPadding?: number
}

/**
 * A reusable screen wrapper that handles safe area insets consistently
 * across all screens in the app.
 * 
 * Usage:
 * ```tsx
 * <ScreenWrapper>
 *   <YourContent />
 * </ScreenWrapper>
 * ```
 * 
 * With custom padding:
 * ```tsx
 * <ScreenWrapper additionalTopPadding={20}>
 *   <YourContent />
 * </ScreenWrapper>
 * ```
 */
export function ScreenWrapper({
  children,
  safeAreaTop = true,
  safeAreaBottom = true,
  additionalTopPadding = 0,
  additionalBottomPadding = 0,
  ...props
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets()

  const topPadding = safeAreaTop ? insets.top + additionalTopPadding : additionalTopPadding
  const bottomPadding = safeAreaBottom ? insets.bottom + additionalBottomPadding : additionalBottomPadding

  return (
    <YStack
      f={1}
      bg="$background"
      pt={topPadding}
      pb={bottomPadding}
      {...props}
    >
      {children}
    </YStack>
  )
}
