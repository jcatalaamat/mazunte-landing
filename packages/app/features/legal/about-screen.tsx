import { H1, Paragraph, Text, YStack, isWeb } from '@my/ui'
import { Link } from 'expo-router'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'

export const AboutScreen = () => {
  const { t } = useTranslation()
  
  return (
    <ScrollView>
      <YStack gap="$4" p="$4">
      {/* only show title on web since mobile has navigator title */}
      {isWeb && <H1>{t('about.title')}</H1>}
      
      <Paragraph>
        <Text fontWeight="bold">{t('about.welcome')}</Text> {t('about.mission_text')}
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">{t('about.mission')}</Text> {t('about.mission_text')}
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">{t('about.what_we_offer')}</Text> {t('about.what_we_offer_text')}
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">{t('about.community_focus')}</Text> {t('about.community_focus_text')}
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">{t('about.get_involved')}</Text> Have an event to share? Know a great place 
        others should discover? Want to connect with like-minded people? Join our community and 
        help make Mazunte an even more connected and vibrant place to live and visit.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Contact Us:</Text> Questions, suggestions, or want to get involved? 
        Reach out to us at hello@mazunteconnect.com or connect with us through the app. We'd love 
        to hear from you!
      </Paragraph>
      </YStack>
    </ScrollView>
  )
}
