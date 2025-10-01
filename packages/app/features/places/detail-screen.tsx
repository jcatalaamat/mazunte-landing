import { FullscreenSpinner, Text, YStack, XStack, Image, Button, ScrollView, Card, H4, Paragraph, EcoBadge, FavoriteButton, Theme } from '@my/ui'
import { usePlaceDetailQuery } from 'app/utils/react-query/usePlacesQuery'
import { MapPin, DollarSign, Phone, Mail, Globe, Instagram } from '@tamagui/lucide-icons'
import { PLACE_TYPE_COLORS, PLACE_TYPE_LABELS } from 'app/utils/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUser } from 'app/utils/useUser'
import { Linking } from 'react-native'

interface PlaceDetailScreenProps {
  id: string
}

export function PlaceDetailScreen({ id }: PlaceDetailScreenProps) {
  const user = useUser()
  const insets = useSafeAreaInsets()
  const { data: place, isLoading } = usePlaceDetailQuery(id)

  if (isLoading) {
    return <FullscreenSpinner />
  }

  if (!place) {
    return (
      <YStack f={1} ai="center" jc="center" bg="$background">
        <Text fontSize="$5" color="$color10">
          Place not found
        </Text>
      </YStack>
    )
  }

  const typeColor = PLACE_TYPE_COLORS[place.type]
  const typeLabel = PLACE_TYPE_LABELS[place.type]

  const handlePhonePress = () => {
    if (place.phone) Linking.openURL(`tel:${place.phone}`)
  }

  const handleWhatsAppPress = () => {
    if (place.whatsapp) Linking.openURL(`https://wa.me/${place.whatsapp}`)
  }

  const handleEmailPress = () => {
    if (place.email) Linking.openURL(`mailto:${place.email}`)
  }

  const handleWebsitePress = () => {
    if (place.website) Linking.openURL(place.website)
  }

  const handleInstagramPress = () => {
    if (place.instagram) Linking.openURL(`https://instagram.com/${place.instagram.replace('@', '')}`)
  }

  return (
    <ScrollView bg="$background">
      <YStack pb={insets.bottom + 20}>
        {/* Image */}
        {place.images && place.images.length > 0 && (
          <Image
            source={{ uri: place.images[0] }}
            height={280}
            width="100%"
          />
        )}

        <YStack p="$4" gap="$4">
          {/* Header */}
          <XStack jc="space-between" ai="flex-start">
            <YStack f={1} gap="$2">
              <H4>{place.name}</H4>
              <XStack gap="$2" ai="center" flexWrap="wrap">
                <Theme name={typeColor}>
                  <Button size="$2" disabled>
                    {typeLabel}
                  </Button>
                </Theme>
                {place.eco_conscious && <EcoBadge size="small" />}
                {place.verified && (
                  <Button size="$2" disabled theme="blue">
                    Verified
                  </Button>
                )}
                {place.featured && (
                  <Button size="$2" disabled theme="yellow">
                    Featured
                  </Button>
                )}
              </XStack>
            </YStack>
            {user && (
              <FavoriteButton
                itemId={place.id}
                itemType="place"
                userId={user.id}
              />
            )}
          </XStack>

          {/* Quick Info */}
          <Card p="$3" gap="$3">
            {place.address && (
              <XStack gap="$3" ai="center">
                <MapPin size={20} color="$color10" />
                <Text fontSize="$4" f={1}>
                  {place.address}
                </Text>
              </XStack>
            )}
            {place.price_range && (
              <XStack gap="$3" ai="center">
                <DollarSign size={20} color="$color10" />
                <Text fontSize="$4">{place.price_range}</Text>
              </XStack>
            )}
          </Card>

          {/* Description */}
          {place.description && (
            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600">
                About
              </Text>
              <Paragraph fontSize="$4" color="$color11">
                {place.description}
              </Paragraph>
            </YStack>
          )}

          {/* Tags */}
          {place.tags && place.tags.length > 0 && (
            <XStack gap="$2" flexWrap="wrap">
              {place.tags.map((tag) => (
                <Button key={tag} size="$2" disabled theme="gray">
                  {tag}
                </Button>
              ))}
            </XStack>
          )}

          {/* Contact Info */}
          <Card p="$3" gap="$3">
            <Text fontSize="$5" fontWeight="600">
              Contact
            </Text>
            {place.phone && (
              <Button
                onPress={handlePhonePress}
                icon={Phone}
                theme="blue"
                chromeless
                jc="flex-start"
              >
                {place.phone}
              </Button>
            )}
            {place.whatsapp && (
              <Button
                onPress={handleWhatsAppPress}
                icon={Phone}
                theme="green"
                chromeless
                jc="flex-start"
              >
                WhatsApp: {place.whatsapp}
              </Button>
            )}
            {place.email && (
              <Button
                onPress={handleEmailPress}
                icon={Mail}
                theme="blue"
                chromeless
                jc="flex-start"
              >
                {place.email}
              </Button>
            )}
            {place.instagram && (
              <Button
                onPress={handleInstagramPress}
                icon={Instagram}
                theme="purple"
                chromeless
                jc="flex-start"
              >
                {place.instagram}
              </Button>
            )}
            {place.website && (
              <Button
                onPress={handleWebsitePress}
                icon={Globe}
                theme="blue"
                chromeless
                jc="flex-start"
              >
                Visit Website
              </Button>
            )}
          </Card>

          {/* TODO: Add image gallery if multiple images */}
          {/* TODO: Add map preview with marker */}
          {/* TODO: Add share button */}
          {/* TODO: Add "Get Directions" button if lat/lng available */}
        </YStack>
      </YStack>
    </ScrollView>
  )
}
