import { PlaceCard, SearchBar, CategoryFilter, FullscreenSpinner, Text, YStack, Button, XStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState, useMemo } from 'react'
import { X } from '@tamagui/lucide-icons'
import { PLACE_TYPE_COLORS, PLACE_TYPE_LABELS, PLACE_TYPES, type PlaceType } from 'app/utils/constants'
import { usePlacesQuery } from 'app/utils/react-query/usePlacesQuery'
import { ScreenWrapper } from 'app/components/ScreenWrapper'
import { useTranslation } from 'react-i18next'

export function PlacesScreen() {
  const [selectedType, setSelectedType] = useState<PlaceType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [headerDismissed, setHeaderDismissed] = useState(false)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  // Fetch all places once
  const { data: allPlaces = [], isLoading, refetch } = usePlacesQuery({})
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

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
        place.location_name?.toLowerCase().includes(query)
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
    <ScreenWrapper>
      {/* Search */}
      <SearchBar
        placeholder={t('places.search_placeholder')}
        onSearch={handleSearch}
        defaultValue={searchQuery}
      />

      {/* Type Filter - Horizontal Scrollable */}
      <YStack bg="$background" borderBottomWidth={1} borderBottomColor="$borderColor">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <XStack gap="$2">
            <Button
              size="$3"
              variant={selectedType === null ? 'outlined' : undefined}
              onPress={() => handleTypeSelect(null)}
            >
              <Text>{t('places.all')} ({allPlaces.length})</Text>
            </Button>
            {PLACE_TYPES.map((type) => (
              <Button
                key={type}
                size="$3"
                variant={selectedType === type ? 'outlined' : undefined}
                onPress={() => handleTypeSelect(type)}
              >
                <Text>{t(`places.types.${type}`)}</Text>
              </Button>
            ))}
          </XStack>
        </ScrollView>
      </YStack>

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
              {t('places.no_places_found')}
            </Text>
            {(selectedType || searchQuery) && (
              <Text fontSize="$3" color="$color9" mt="$2">
                {t('places.try_adjusting_filters')}
              </Text>
            )}
          </YStack>
        }
      />
    </ScreenWrapper>
  )
}
