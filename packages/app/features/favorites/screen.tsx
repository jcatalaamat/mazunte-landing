import { EventCard, PlaceCard, FullscreenSpinner, Text, YStack, Button, XStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavoritesQuery } from 'app/utils/react-query/useFavoritesQuery'
import { useUser } from 'app/utils/useUser'
import { useState } from 'react'

export function FavoritesScreen() {
  const user = useUser()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<'events' | 'places'>('events')

  const { data, isLoading } = useFavoritesQuery(user?.id)

  if (isLoading) {
    return <FullscreenSpinner />
  }

  const favoriteEvents = data?.events || []
  const favoritePlaces = data?.places || []

  return (
    <YStack f={1} bg="$background">
      <XStack w="100%" bg="$background" borderBottomWidth={1} borderBottomColor="$borderColor">
        <Button
          f={1}
          variant={activeTab === 'events' ? 'outlined' : 'ghost'}
          onPress={() => setActiveTab('events')}
          borderRadius={0}
        >
          <Text>Events ({favoriteEvents.length})</Text>
        </Button>
        <Button
          f={1}
          variant={activeTab === 'places' ? 'outlined' : 'ghost'}
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
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: insets.bottom + 80,
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
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: insets.bottom + 80,
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
    </YStack>
  )
}
