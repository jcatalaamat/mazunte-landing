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
import { useTranslation } from 'react-i18next'

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
  const [tappedMarkers, setTappedMarkers] = useState<Set<string>>(new Set())
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  
  const { data: events = [], isLoading: eventsLoading } = useEventsQuery({})
  const { data: places = [], isLoading: placesLoading } = usePlacesQuery({})

  const isLoading = eventsLoading || placesLoading

  // Filter data based on view type and ensure coordinates exist
  const filteredEvents = (viewType === 'events' || viewType === 'both') 
    ? events.filter(event => event.lat && event.lng) 
    : []
  const filteredPlaces = (viewType === 'places' || viewType === 'both') 
    ? places.filter(place => place.lat && place.lng) 
    : []

  // Debug logging
  console.log('MapScreen Debug:', {
    eventsCount: events.length,
    placesCount: places.length,
    eventsWithCoords: events.filter(event => event.lat && event.lng).length,
    placesWithCoords: places.filter(place => place.lat && place.lng).length,
    viewType,
    filteredEventsCount: filteredEvents.length,
    filteredPlacesCount: filteredPlaces.length
  })

  const handleEventPress = (eventId: string) => {
    const markerKey = `event-${eventId}`
    
    if (tappedMarkers.has(markerKey)) {
      // Second tap - navigate to detail page
      router.push(`/event/${eventId}`)
      setTappedMarkers(prev => {
        const newSet = new Set(prev)
        newSet.delete(markerKey)
        return newSet
      })
    } else {
      // First tap - just show info popup (handled by Marker title/description)
      setTappedMarkers(prev => new Set(prev).add(markerKey))
    }
  }

  const handlePlacePress = (placeId: string) => {
    const markerKey = `place-${placeId}`
    
    if (tappedMarkers.has(markerKey)) {
      // Second tap - navigate to detail page
      router.push(`/place/${placeId}`)
      setTappedMarkers(prev => {
        const newSet = new Set(prev)
        newSet.delete(markerKey)
        return newSet
      })
    } else {
      // First tap - just show info popup (handled by Marker title/description)
      setTappedMarkers(prev => new Set(prev).add(markerKey))
    }
  }

  if (isLoading) {
    return (
      <ScreenWrapper>
        <YStack f={1} ai="center" jc="center">
          <Text fontSize="$5" color="$color10">{t('map.loading_map')}</Text>
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
              {t('map.mazunte_location')}
            </Text>
            <Text color="$color10">
              • {t('map.events_available', { count: filteredEvents.length })}
            </Text>
            <Text color="$color10">
              • {t('map.places_available', { count: filteredPlaces.length })}
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
          <Text>{t('map.events')} ({events.filter(event => event.lat && event.lng).length})</Text>
        </Button>
        <Button
          size="$3"
          variant={viewType === 'places' ? 'outlined' : 'ghost'}
          onPress={() => setViewType('places')}
          f={1}
        >
          <Text>{t('map.places')} ({places.filter(place => place.lat && place.lng).length})</Text>
        </Button>
        <Button
          size="$3"
          variant={viewType === 'both' ? 'outlined' : 'ghost'}
          onPress={() => setViewType('both')}
          f={1}
        >
          <Text>{t('map.both')}</Text>
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
        {/* Event Markers */}
        {filteredEvents.map((event) => {
            const markerKey = `event-${event.id}`
            const isTapped = tappedMarkers.has(markerKey)
            
            return (
              <Marker
                key={markerKey}
                coordinate={{
                  latitude: event.lat!,
                  longitude: event.lng!,
                }}
                title={event.title}
                description={isTapped 
                  ? `${event.description}\n\nTap again to view details` 
                  : `${event.description}\n\nTap to see more info`
                }
                pinColor="blue"
                onPress={() => handleEventPress(event.id)}
              />
            )
          })}

        {/* Place Markers */}
        {filteredPlaces.map((place) => {
            const markerKey = `place-${place.id}`
            const isTapped = tappedMarkers.has(markerKey)
            
            return (
              <Marker
                key={markerKey}
                coordinate={{
                  latitude: place.lat!,
                  longitude: place.lng!,
                }}
                title={place.name}
                description={isTapped 
                  ? `${place.description}\n\nTap again to view details` 
                  : `${place.description}\n\nTap to see more info`
                }
                pinColor="green"
                onPress={() => handlePlacePress(place.id)}
              />
            )
          })}
      </MapView>
    </ScreenWrapper>
  )
}
