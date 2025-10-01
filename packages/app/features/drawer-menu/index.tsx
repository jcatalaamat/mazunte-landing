import { Avatar, Paragraph, Settings, XStack, YStack, getTokens, useWindowDimensions, Text, H6, Button } from '@my/ui'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Box, Cog, Milestone, ShoppingCart, User, Users, X } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUser } from 'app/utils/useUser'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'
import { useState } from 'react'

export function DrawerMenu(props) {
  const { profile, avatarUrl } = useUser()
  const name = profile?.name
  const insets = useSafeAreaInsets()
  const height = useWindowDimensions().height
  const [headerDismissed, setHeaderDismissed] = useState(false)

  return (
    <YStack f={1} bg="$background">
      {/* Dismissible Header with safe area */}
      {!headerDismissed && (
        <YStack 
          pt={insets.top} 
          px="$4" 
          pb="$4" 
          bg="$background" 
          borderBottomWidth={1} 
          borderBottomColor="$borderColor"
        >
          <XStack jc="space-between" ai="flex-start">
            <YStack f={1}>
              <H6 fontSize="$6" color="$color12" mb="$2" fontWeight="600">
                👤 My Profile
              </H6>
              <Text color="$color11" fontSize="$4">
                Manage your account and preferences
              </Text>
            </YStack>
            <Button
              size="$2"
              circular
              onPress={() => setHeaderDismissed(true)}
              ml="$2"
            >
              <X size={16} />
            </Button>
          </XStack>
        </YStack>
      )}

      {/* Safe area padding when header is dismissed */}
      {headerDismissed && <YStack pt={insets.top} />}

      <DrawerContentScrollView {...props} f={1}>
        <YStack
          maw={600}
          mx="auto"
          w="100%"
          f={1}
          py="$4"
          pb={insets.bottom + 20}
        >
          <Settings>
            <Settings.Items>
              <Settings.Group>
                <Settings.Item icon={User} {...useLink({ href: '/profile/edit' })} accentTheme="pink">
                  Edit profile
                </Settings.Item>
                <Settings.Item icon={Box} accentTheme="green">
                  My Items
                </Settings.Item>
                <Settings.Item icon={Users} accentTheme="orange">
                  Refer Your Friends
                </Settings.Item>
                <Settings.Item icon={Milestone} accentTheme="gray">
                  Address Info
                </Settings.Item>
                <Settings.Item icon={ShoppingCart} accentTheme="blue">
                  Purchase History
                </Settings.Item>
                <Settings.Item {...useLink({ href: '/settings' })} icon={Cog}>
                  Settings
                </Settings.Item>
              </Settings.Group>
            </Settings.Items>
          </Settings>

          <XStack gap="$4" mb="$7" mt="auto" ai="center" px="$4">
            <Avatar circular size="$3">
              <SolitoImage
                src={avatarUrl}
                alt="your avatar"
                width={getTokens().size['3'].val}
                height={getTokens().size['3'].val}
              />
            </Avatar>
            <Paragraph ta="center" ml="$-1.5">
              {name ?? 'No Name'}
            </Paragraph>
          </XStack>
        </YStack>
      </DrawerContentScrollView>
    </YStack>
  )
}
