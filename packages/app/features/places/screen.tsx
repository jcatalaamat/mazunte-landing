import { PlaceCard, SearchBar, CategoryFilter, FullscreenSpinner, Text, YStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { PLACE_TYPE_COLORS, PLACE_TYPE_LABELS, PLACE_TYPES, type PlaceType } from 'app/utils/constants'
import { usePlacesQuery } from 'app/utils/react-query/usePlacesQuery'

export function PlacesScreen() {
  const [selectedType, setSelectedType] = useState<PlaceType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const insets = useSafeAreaInsets()

  const { data: places = [], isLoading } = usePlacesQuery({
    type: selectedType,
    search: searchQuery || undefined,
  })

  if (isLoading) {
    return <FullscreenSpinner />
  }

  return (
    <YStack f={1} bg="$background">
      {/* Search */}
      <SearchBar
        placeholder="Search places..."
        onSearch={setSearchQuery}
      />

      {/* Type Filter */}
      <CategoryFilter
        categories={PLACE_TYPES}
        selected={selectedType}
        onSelect={(type) => setSelectedType(type as PlaceType | null)}
        categoryLabels={PLACE_TYPE_LABELS}
        categoryColors={PLACE_TYPE_COLORS}
      />

      {/* Places List */}
      <FlatList
        data={places}
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
            {selectedType && (
              <Text fontSize="$3" color="$color9" mt="$2">
                Try a different type
              </Text>
            )}
          </YStack>
        }
      />
    </YStack>
  )
}
