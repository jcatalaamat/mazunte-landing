import { Text, YStack } from '@my/ui'

export function MapScreen() {
  // TODO: Implement map view with react-native-maps
  // - Show events and places as markers on map
  // - Color-code markers by category/type
  // - Show marker callouts with basic info
  // - Navigate to detail screens on marker press
  // - Add toggle to switch between events/places/both
  // - Center on Mazunte, Mexico (15.66, -96.73)

  return (
    <YStack f={1} ai="center" jc="center" bg="$background">
      <Text fontSize="$6" color="$color10">
        Map View - Coming Soon
      </Text>
      <Text fontSize="$3" color="$color9" mt="$2" ta="center" px="$4">
        This will show all events and places on an interactive map
      </Text>
    </YStack>
  )
}
