import { EventCard, FullscreenSpinner, SearchBar, Text, YStack, Button, XStack, H6, Paragraph } from '@my/ui'
import { router } from 'expo-router'
import { FlatList, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState, useMemo } from 'react'
import { X } from '@tamagui/lucide-icons'
import { CATEGORY_LABELS, EVENT_CATEGORIES, type EventCategory } from 'app/utils/constants'
import { useEventsQuery } from 'app/utils/react-query/useEventsQuery'
import { formatDate, formatTime, getRelativeDay } from 'app/utils/date-helpers'

export function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [headerDismissed, setHeaderDismissed] = useState(false)
  const insets = useSafeAreaInsets()

  // Fetch all events once (including past events for now)
  const { data: allEvents = [], isLoading, error, refetch } = useEventsQuery({ includePast: true })
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  // Debug logging
  console.log('Events data:', { allEvents, isLoading, error })

  // Filter locally for better performance
  const filteredEvents = useMemo(() => {
    let filtered = allEvents

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location_name?.toLowerCase().includes(query)
      )
    }

    // Sort by date (upcoming first)
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [allEvents, selectedCategory, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category as EventCategory | null)
  }

  if (isLoading) {
    return <FullscreenSpinner />
  }

  return (
    <YStack f={1} bg="$background">
      {/* Search */}
      <SearchBar
        placeholder="Search events..."
        onSearch={handleSearch}
        defaultValue={searchQuery}
      />

      {/* Category Filter */}
      <XStack gap="$2" px="$4" py="$2" bg="$background" borderBottomWidth={1} borderBottomColor="$borderColor">
        <Button
          size="$3"
          variant={selectedCategory === null ? 'outlined' : undefined}
          onPress={() => handleCategorySelect(null)}
        >
          <Text>All ({allEvents.length})</Text>
        </Button>
        {EVENT_CATEGORIES.map((category) => (
          <Button
            key={category}
            size="$3"
            variant={selectedCategory === category ? 'outlined' : undefined}
            onPress={() => handleCategorySelect(category)}
          >
            <Text>{CATEGORY_LABELS[category]}</Text>
          </Button>
        ))}
      </XStack>


      {/* Events List */}
      <FlatList
        data={filteredEvents}
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
          paddingBottom: insets.bottom + 80,
        }}
        ListEmptyComponent={
          <YStack ai="center" jc="center" py="$10">
            <Text fontSize="$5" color="$color10">
              No events found
            </Text>
            {(selectedCategory || searchQuery) && (
              <Text fontSize="$3" color="$color9" mt="$2">
                Try adjusting your filters
              </Text>
            )}
            {!selectedCategory && !searchQuery && (
              <YStack ai="center" gap="$3" mt="$4">
                <Text fontSize="$4" color="$color11" ta="center">
                  No events scheduled yet
                </Text>
                <Button onPress={() => router.push('/create')} size="$4">
                  <Text>Create First Event</Text>
                </Button>
              </YStack>
            )}
          </YStack>
        }
      />
    </YStack>
  )
}
