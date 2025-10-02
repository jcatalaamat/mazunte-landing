import { useIsFavorited, useToggleFavorite } from 'app/utils/react-query/useFavoritesQuery'
import { useUser } from 'app/utils/useUser'
import { FavoriteButton } from './FavoriteButton'
import type { ButtonProps } from 'tamagui'

export type FavoriteButtonWrapperProps = {
  itemId: string
  itemType: 'event' | 'place'
  size?: number
} & Omit<ButtonProps, 'onPress'>

export const FavoriteButtonWrapper = ({ itemId, itemType, size = 24, ...props }: FavoriteButtonWrapperProps) => {
  const { profile } = useUser()
  const userId = profile?.id

  const { data: isFavorited = false } = useIsFavorited(userId, itemId, itemType)
  const toggleFavorite = useToggleFavorite()

  if (!userId) {
    // Don't show favorite button if user is not logged in
    return null
  }

  const handleToggle = () => {
    toggleFavorite.mutate({
      userId,
      itemId,
      itemType,
      isFavorited,
    })
  }

  return <FavoriteButton isFavorited={isFavorited} onToggle={handleToggle} size={size} {...props} />
}
