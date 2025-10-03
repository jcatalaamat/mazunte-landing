import { CreateScreen } from 'app/features/create/screen'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function Screen() {
  const { t } = useTranslation()
  
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: t('create.title') }} />
      <CreateScreen />
    </>
  )
}
