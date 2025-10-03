import { Text, YStack, XStack, Button } from '@my/ui'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { X } from '@tamagui/lucide-icons'
import { useEventsQuery } from 'app/utils/react-query/useEventsQuery'
import { usePlacesQuery } from 'app/utils/react-query/usePlacesQuery'
import { MAZUNTE_CENTER } from 'app/utils/constants'
import { ScreenWrapper } from 'app/components/ScreenWrapper'

// Import MapView only on native platforms
let MapView: any = null
let Marker: any = null

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps')
    MapView = Maps.default
    Marker = Maps.Marker
  } catch (error) {
    console.log('react-native-maps not available')
  }
}

type MapViewType = 'events' | 'places' | 'both'

export function MapScreen() {
  const [viewType, setViewType] = useState<MapViewType>('both')
  const [headerDismissed, setHeaderDismissed] = useState(false)
  const insets = useSafeAreaInsets()
  
  const { data: events = [], isLoading: eventsLoading } = useEventsQuery({})
  const { data: places = [], isLoading: placesLoading } = usePlacesQuery({})

  const isLoading = eventsLoading || placesLoading

  // Filter data based on view type
  const filteredEvents = viewType === 'events' || viewType === 'both' ? events : []
  const filteredPlaces = viewType === 'places' || viewType === 'both' ? places : []

  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`)
  }

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/${placeId}`)
  }

  if (isLoading) {
    return (
      <ScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text fontSize="$5" color="$color10">Loading map...</Text>
        </YStack>
      </ScreenWrapper>
    )
  }

  // Web fallback
  if (Platform.OS === 'web' || !MapView) {
    return (
      <ScreenWrapper>
        <YStack f={1} ai="center" jc="center" gap="$4" p="$4">
          <YStack gap="$2" w="100%">
            <Text fontSize="$4" fontWeight="600" color="$color11">
              📍 Mazunte, Mexico (15.666°N, 96.556°W)
            </Text>
            <Text color="$color10">
              • Events: {filteredEvents.length} available
            </Text>
            <Text color="$color10">
              • Places: {filteredPlaces.length} available
            </Text>
          </YStack>
        </YStack>
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      {/* View type toggle - always visible */}
      <YStack 
        bg="$background" 
        borderBottomWidth={1} 
        borderBottomColor="$borderColor"
      >
        <XStack 
          w="100%" 
          bg="$background" 
          px="$4"
          py="$3"
          gap="$2"
        >
        <Button
          size="$3"
          variant={viewType === 'events' ? 'outlined' : 'ghost'}
          onPress={() => setViewType('events')}
          f={1}
        >
          <Text>Events ({filteredEvents.length})</Text>
        </Button>
        <Button
          size="$3"
          variant={viewType === 'places' ? 'outlined' : 'ghost'}
          onPress={() => setViewType('places')}
          f={1}
        >
          <Text>Places ({filteredPlaces.length})</Text>
        </Button>
        <Button
          size="$3"
          variant={viewType === 'both' ? 'outlined' : 'ghost'}
          onPress={() => setViewType('both')}
          f={1}
        >
          <Text>Both</Text>
        </Button>
        </XStack>
      </YStack>

      {/* Map View */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: MAZUNTE_CENTER.latitude,
          longitude: MAZUNTE_CENTER.longitude,
          latitudeDelta: MAZUNTE_CENTER.latitudeDelta,
          longitudeDelta: MAZUNTE_CENTER.longitudeDelta,
        }}
        region={{
          latitude: MAZUNTE_CENTER.latitude,
          longitude: MAZUNTE_CENTER.longitude,
          latitudeDelta: MAZUNTE_CENTER.latitudeDelta,
          longitudeDelta: MAZUNTE_CENTER.longitudeDelta,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
      >
        {/* Mazunte Center Marker */}
        <Marker
          coordinate={{
            latitude: MAZUNTE_CENTER.latitude,
            longitude: MAZUNTE_CENTER.longitude,
          }}
          title="Mazunte, Mexico"
          description="Welcome to Mazunte! 🌊"
          pinColor="red"
        />

        {/* Event Markers */}
        {filteredEvents.map((event) => (
          <Marker
            key={`event-${event.id}`}
            coordinate={{
              latitude: event.latitude || MAZUNTE_CENTER.latitude + (Math.random() - 0.5) * 0.01,
              longitude: event.longitude || MAZUNTE_CENTER.longitude + (Math.random() - 0.5) * 0.01,
            }}
            title={event.title}
            description={event.description}
            pinColor="blue"
            onPress={() => handleEventPress(event.id)}
          />
        ))}

        {/* Place Markers */}
        {filteredPlaces.map((place) => (
          <Marker
            key={`place-${place.id}`}
            coordinate={{
              latitude: place.latitude || MAZUNTE_CENTER.latitude + (Math.random() - 0.5) * 0.01,
              longitude: place.longitude || MAZUNTE_CENTER.longitude + (Math.random() - 0.5) * 0.01,
            }}
            title={place.name}
            description={place.description}
            pinColor="green"
            onPress={() => handlePlacePress(place.id)}
          />
        ))}
      </MapView>
    </ScreenWrapper>
  )
}
