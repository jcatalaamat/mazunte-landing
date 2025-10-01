import { EventCard, PlaceCard, FullscreenSpinner, Text, YStack, Button, XStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavoritesQuery } from 'app/utils/react-query/useFavoritesQuery'
import { useUser } from 'app/utils/useUser'
import { useState, useMemo } from 'react'
import { X } from '@tamagui/lucide-icons'

export function FavoritesScreen() {
  const user = useUser()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<'events' | 'places'>('events')
  const [headerDismissed, setHeaderDismissed] = useState(false)

  const { data: favorites = [], isLoading } = useFavoritesQuery(user?.id)

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
              <Text fontSize="$6" color="$color12" mb="$2" fontWeight="600">
                ❤️ My Favorites
              </Text>
              <Text color="$color11" fontSize="$4">
                Your saved events and places
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
      </YStack>
    )
  }

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
              <Text fontSize="$6" color="$color12" mb="$2" fontWeight="600">
                ❤️ My Favorites
              </Text>
              <Text color="$color11" fontSize="$4">
                Your saved events and places
              </Text>
            </YStack>
            <Button
              size="$2"
              circular
              variant="ghost"
              onPress={() => setHeaderDismissed(true)}
              ml="$2"
            >
              <X size={16} />
            </Button>
          </XStack>
        </YStack>
      )}
      
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
