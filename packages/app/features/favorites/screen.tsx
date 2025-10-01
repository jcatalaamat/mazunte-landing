import { EventCard, PlaceCard, FullscreenSpinner, Text, YStack, Tabs, TabsList, TabsTrigger, TabsContent } from '@my/ui'
import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavoritesQuery } from 'app/utils/react-query/useFavoritesQuery'
import { useUser } from 'app/utils/useUser'

export function FavoritesScreen() {
  const user = useUser()
  const insets = useSafeAreaInsets()

  const { data, isLoading } = useFavoritesQuery(user?.id)

  if (isLoading) {
    return <FullscreenSpinner />
  }

  const favoriteEvents = data?.events || []
  const favoritePlaces = data?.places || []

  return (
    <YStack f={1} bg="$background">
      <Tabs defaultValue="events" f={1}>
        <TabsList w="100%">
          <TabsTrigger f={1} value="events">
            <Text>Events ({favoriteEvents.length})</Text>
          </TabsTrigger>
          <TabsTrigger f={1} value="places">
            <Text>Places ({favoritePlaces.length})</Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" f={1}>
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
        </TabsContent>

        <TabsContent value="places" f={1}>
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
        </TabsContent>
      </Tabs>
    </YStack>
  )
}
