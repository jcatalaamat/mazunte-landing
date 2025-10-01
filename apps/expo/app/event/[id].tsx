import { EventDetailScreen } from 'app/features/events/detail-screen'
import { useLocalSearchParams } from 'expo-router'

export default function EventDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return null

  return <EventDetailScreen id={id} />
}
