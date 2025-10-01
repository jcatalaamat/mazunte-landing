import { Button, ScrollView, Text, Theme, XStack } from 'tamagui'

export type CategoryFilterProps = {
  categories: readonly string[]
  selected: string | null
  onSelect: (category: string | null) => void
  categoryLabels?: Record<string, string>
  categoryColors?: Record<string, string>
}

export const CategoryFilter = ({
  categories,
  selected,
  onSelect,
  categoryLabels = {},
  categoryColors = {},
}: CategoryFilterProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      <XStack gap="$2" py="$2">
        {/* All button */}
        <Button
          size="$3"
          onPress={() => onSelect(null)}
          backgroundColor={selected === null ? '$color8' : '$color3'}
          borderColor={selected === null ? '$color8' : '$color6'}
          borderWidth={1}
          pressStyle={{ backgroundColor: '$color6' }}
        >
          <Text
            color={selected === null ? '$color1' : '$color11'}
            fontWeight={selected === null ? '600' : '400'}
          >
            All
          </Text>
        </Button>

        {/* Category buttons */}
        {categories.map((category) => {
          const isSelected = selected === category
          const label = categoryLabels[category] || category
          const themeName = categoryColors[category]

          const button = (
            <Button
              key={category}
              size="$3"
              onPress={() => onSelect(isSelected ? null : category)}
              backgroundColor={isSelected ? '$color8' : '$color3'}
              borderColor={isSelected ? '$color8' : '$color6'}
              borderWidth={1}
              pressStyle={{ backgroundColor: '$color6' }}
            >
              <Text
                color={isSelected ? '$color1' : '$color11'}
                fontWeight={isSelected ? '600' : '400'}
                textTransform="capitalize"
              >
                {label}
              </Text>
            </Button>
          )

          // Wrap in Theme if color is provided
          if (themeName && isSelected) {
            return (
              <Theme key={category} name={themeName}>
                {button}
              </Theme>
            )
          }

          return button
        })}
      </XStack>
    </ScrollView>
  )
}
