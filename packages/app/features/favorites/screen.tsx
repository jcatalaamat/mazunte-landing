import { EventCard, PlaceCard, FullscreenSpinner, Text, YStack, Button, XStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavoritesQuery } from 'app/utils/react-query/useFavoritesQuery'
import { useUser } from 'app/utils/useUser'
import { useState, useMemo } from 'react'
import { X } from '@tamagui/lucide-icons'
import { ScreenWrapper } from 'app/components/ScreenWrapper'

export function FavoritesScreen() {
  const { profile } = useUser()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<'events' | 'places'>('events')
  const [headerDismissed, setHeaderDismissed] = useState(false)

  const { data: favorites = [], isLoading, refetch } = useFavoritesQuery(profile?.id)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  // Separate events and places from favorites
  const { favoriteEvents, favoritePlaces } = useMemo(() => {
    const events = favorites.filter(fav => fav.item_type === 'event' && fav.item).map(fav => fav.item)
    const places = favorites.filter(fav => fav.item_type === 'place' && fav.item).map(fav => fav.item)
    return { favoriteEvents: events, favoritePlaces: places }
  }, [favorites])

  if (isLoading) {
    return <FullscreenSpinner />
  }

  // Show empty state if no favorites at all
  if (favorites.length === 0) {
  return (
    <ScreenWrapper>
        <YStack f={1} ai="center" jc="center" p="$4">
          <Text fontSize="$6" color="$color10" ta="center" mb="$2">
            ❤️ No Favorites Yet
          </Text>
          <Text fontSize="$4" color="$color9" ta="center" mb="$4">
            Start exploring events and places to build your favorites list!
          </Text>
          <Button onPress={() => router.push('/')} size="$4">
            <Text>Explore Events & Places</Text>
          </Button>
        </YStack>
    </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <XStack w="100%" bg="$background" borderBottomWidth={1} borderBottomColor="$borderColor">
        <Button
          f={1}
          variant={activeTab === 'events' ? 'outlined' : undefined}
          onPress={() => setActiveTab('events')}
          borderRadius={0}
        >
          <Text>Events ({favoriteEvents.length})</Text>
        </Button>
        <Button
          f={1}
          variant={activeTab === 'places' ? 'outlined' : undefined}
          onPress={() => setActiveTab('places')}
          borderRadius={0}
        >
          <Text>Places ({favoritePlaces.length})</Text>
        </Button>
      </XStack>

      {activeTab === 'events' && (
        <FlatList
          data={favoriteEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => router.push(`/event/${item.id}`)}
              mx="$4"
              mb="$3"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 80,
          }}
          ListEmptyComponent={
            <YStack ai="center" jc="center" py="$10">
              <Text fontSize="$5" color="$color10">
                No favorite events yet
              </Text>
              <Text fontSize="$3" color="$color9" mt="$2">
                Tap the heart icon on events to save them here
              </Text>
            </YStack>
          }
        />
      )}

      {activeTab === 'places' && (
        <FlatList
          data={favoritePlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlaceCard
              place={item}
              onPress={() => router.push(`/place/${item.id}`)}
              mx="$4"
              mb="$3"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 80,
          }}
          ListEmptyComponent={
            <YStack ai="center" jc="center" py="$10">
              <Text fontSize="$5" color="$color10">
                No favorite places yet
              </Text>
              <Text fontSize="$3" color="$color9" mt="$2">
                Tap the heart icon on places to save them here
              </Text>
            </YStack>
          }
        />
      )}
    </ScreenWrapper>
  )
}
