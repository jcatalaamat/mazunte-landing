import { PlaceCard, SearchBar, CategoryFilter, FullscreenSpinner, Text, YStack, Button, XStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState, useMemo } from 'react'
import { X } from '@tamagui/lucide-icons'
import { PLACE_TYPE_COLORS, PLACE_TYPE_LABELS, PLACE_TYPES, type PlaceType } from 'app/utils/constants'
import { usePlacesQuery } from 'app/utils/react-query/usePlacesQuery'

export function PlacesScreen() {
  const [selectedType, setSelectedType] = useState<PlaceType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [headerDismissed, setHeaderDismissed] = useState(false)
  const insets = useSafeAreaInsets()

  // Fetch all places once
  const { data: allPlaces = [], isLoading } = usePlacesQuery({})

  // Filter locally for better performance
  const filteredPlaces = useMemo(() => {
    let filtered = allPlaces

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(place => place.type === selectedType)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(query) ||
        place.description?.toLowerCase().includes(query) ||
        place.address?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allPlaces, selectedType, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type as PlaceType | null)
  }

  if (isLoading) {
    return <FullscreenSpinner />
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
                📍 Places in Mazunte
              </Text>
              <Text color="$color11" fontSize="$4">
                Discover amazing places in our community
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

      {/* Search */}
      <SearchBar
        placeholder="Search places..."
        onSearch={handleSearch}
        defaultValue={searchQuery}
      />

      {/* Simple Type Filter */}
      <XStack gap="$2" px="$4" py="$2" bg="$background" borderBottomWidth={1} borderBottomColor="$borderColor">
        <Button
          size="$3"
          variant={selectedType === null ? 'outlined' : 'ghost'}
          onPress={() => handleTypeSelect(null)}
        >
          <Text>All ({allPlaces.length})</Text>
        </Button>
        {PLACE_TYPES.map((type) => (
          <Button
            key={type}
            size="$3"
            variant={selectedType === type ? 'outlined' : 'ghost'}
            onPress={() => handleTypeSelect(type)}
          >
            <Text>{PLACE_TYPE_LABELS[type]}</Text>
          </Button>
        ))}
      </XStack>

      {/* Places List */}
      <FlatList
        data={filteredPlaces}
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
              No places found
            </Text>
            {(selectedType || searchQuery) && (
              <Text fontSize="$3" color="$color9" mt="$2">
                Try adjusting your filters
              </Text>
            )}
          </YStack>
        }
      />
    </YStack>
  )
}
