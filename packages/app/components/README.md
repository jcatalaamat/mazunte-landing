# Screen Components

## ScreenWrapper

A reusable screen wrapper that handles safe area insets consistently across all screens in the app.

### Usage

```tsx
import { ScreenWrapper } from 'app/components/ScreenWrapper'

export function MyScreen() {
  return (
    <ScreenWrapper>
      <YourContent />
    </ScreenWrapper>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `safeAreaTop` | `boolean` | `true` | Whether to apply safe area padding to the top |
| `safeAreaBottom` | `boolean` | `true` | Whether to apply safe area padding to the bottom |
| `additionalTopPadding` | `number` | `0` | Additional top padding beyond safe area |
| `additionalBottomPadding` | `number` | `0` | Additional bottom padding beyond safe area |

### Examples

#### Basic Usage
```tsx
<ScreenWrapper>
  <YourContent />
</ScreenWrapper>
```

#### Custom Padding
```tsx
<ScreenWrapper additionalTopPadding={20}>
  <YourContent />
</ScreenWrapper>
```

#### Disable Safe Area
```tsx
<ScreenWrapper safeAreaTop={false}>
  <YourContent />
</ScreenWrapper>
```

### Best Practices

1. **Always use ScreenWrapper** for new screens
2. **Don't manually handle safe area insets** - ScreenWrapper handles this
3. **Use additionalTopPadding/additionalBottomPadding** for extra spacing
4. **Remove manual insets.bottom calculations** from FlatList contentContainerStyle

### Migration Guide

#### Before (❌ Don't do this)
```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function MyScreen() {
  const insets = useSafeAreaInsets()
  
  return (
    <YStack f={1} bg="$background" pt={insets.top}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80,
        }}
      />
    </YStack>
  )
}
```

#### After (✅ Do this)
```tsx
import { ScreenWrapper } from 'app/components/ScreenWrapper'

export function MyScreen() {
  return (
    <ScreenWrapper>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      />
    </ScreenWrapper>
  )
}
```
