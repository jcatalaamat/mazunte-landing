import React from 'react'
import { Text, YStack } from '@my/ui'
import { useTranslation } from 'react-i18next'

export function TestTranslation() {
  const { t } = useTranslation()

  return (
    <YStack gap="$2" p="$4">
      <Text fontSize="$6" fontWeight="bold">
        {t('home.welcome')}
      </Text>
      <Text fontSize="$4">
        {t('common.loading')}
      </Text>
      <Text fontSize="$3">
        Current language: {t('common.language')}
      </Text>
    </YStack>
  )
}
