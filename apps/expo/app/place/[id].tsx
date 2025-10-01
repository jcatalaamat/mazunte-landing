import { PlaceDetailScreen } from 'app/features/places/detail-screen'
import { useLocalSearchParams } from 'expo-router'

export default function PlaceDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return null

  return <PlaceDetailScreen id={id} />
}
