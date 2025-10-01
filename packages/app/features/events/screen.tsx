import { CategoryFilter, EventCard, FullscreenSpinner, SearchBar, Text, YStack } from '@my/ui'
import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { CATEGORY_COLORS, CATEGORY_LABELS, EVENT_CATEGORIES, type EventCategory } from 'app/utils/constants'
import { useEventsQuery } from 'app/utils/react-query/useEventsQuery'

export function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const insets = useSafeAreaInsets()

  const { data: events = [], isLoading } = useEventsQuery({
    category: selectedCategory,
    search: searchQuery || undefined,
  })

  if (isLoading) {
    return <FullscreenSpinner />
  }

  return (
    <YStack f={1} bg="$background">
      {/* Search */}
      <SearchBar
        placeholder="Search events..."
        onSearch={setSearchQuery}
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={EVENT_CATEGORIES}
        selected={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat as EventCategory | null)}
        categoryLabels={CATEGORY_LABELS}
        categoryColors={CATEGORY_COLORS}
      />

      {/* Events List */}
      <FlatList
        data={events}
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
              No events found
            </Text>
            {selectedCategory && (
              <Text fontSize="$3" color="$color9" mt="$2">
                Try a different category
              </Text>
            )}
          </YStack>
        }
      />
    </YStack>
  )
}
