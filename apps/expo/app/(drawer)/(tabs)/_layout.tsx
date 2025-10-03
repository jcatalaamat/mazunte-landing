import { useTheme, Button } from '@my/ui'
import { DrawerActions } from '@react-navigation/native'
import { Calendar, Heart, Map, MapPin, Menu, Plus, User } from '@tamagui/lucide-icons'
import { router, Stack, Tabs, useNavigation, usePathname } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

export default function Layout() {
  const { accentColor } = useTheme()
  const navigation = useNavigation()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  if (__DEV__) {
    console.log('pathname', pathname)
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mazunte Connect',
          headerShown: pathname === '/' || pathname === '/create',
          headerTintColor: accentColor.val,
          headerLeft: () => (
            <Button
              borderStyle="unset"
              borderWidth={0}
              backgroundColor="transparent"
              marginLeft="$-1"
              paddingHorizontal="$4"
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer())
              }}
            >
              <Menu size={24} />
            </Button>
          ),
          headerRight: () => (
            <Button
              borderStyle="unset"
              borderWidth={0}
              marginRight="$-1"
              backgroundColor="transparent"
              onPress={() => {
                router.navigate('create')
              }}
            >
              <Plus size={24} />
            </Button>
          ),
        }}
      />
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          headerTintColor: accentColor.val,
          tabBarStyle: {
            paddingTop: 10,
            paddingBottom: insets.bottom + 10,
            height: insets.bottom + 70,
            alignContent: 'center',
            justifyContent: 'center',
          },
          tabBarItemStyle: {
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          key="index"
          options={{
            headerShown: false,
            title: t('navigation.events'),
            tabBarIcon: ({ size, color, focused }) => (
              <Calendar color={focused ? '$color12' : '$color10'} size={22} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tabs.Screen
          name="places"
          key="places"
          options={{
            headerShown: false,
            title: t('navigation.places'),
            tabBarIcon: ({ size, color, focused }) => (
              <MapPin color={focused ? '$color12' : '$color10'} size={22} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          key="map"
          options={{
            headerShown: false,
            title: t('navigation.map'),
            tabBarIcon: ({ size, color, focused }) => (
              <Map color={focused ? '$color12' : '$color10'} size={22} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          key="favorites"
          options={{
            headerShown: false,
            title: t('navigation.favorites'),
            tabBarIcon: ({ size, color, focused }) => (
              <Heart color={focused ? '$color12' : '$color10'} size={22} strokeWidth={focused ? 2.5 : 2} fill={focused ? '$color12' : 'transparent'} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          key="profile"
          options={{
            headerShown: false,
            title: t('navigation.profile'),
            tabBarIcon: ({ size, color, focused }) => (
              <User color={focused ? '$color12' : '$color10'} size={22} strokeWidth={focused ? 2.5 : 2} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
