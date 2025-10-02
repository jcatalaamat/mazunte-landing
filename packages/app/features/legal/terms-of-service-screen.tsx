import { H1, Paragraph, YStack, isWeb, Text } from '@my/ui'
import { ScrollView } from 'react-native'

export const TermsOfServiceScreen = () => {
  return (
    <ScrollView>
      <YStack gap="$4" p="$4">
      {/* only show title on web since mobile has navigator title */}
      {isWeb && <H1>Terms of Service</H1>}
      <Paragraph>
        Welcome to Mazunte Connect! These Terms of Service ("Terms") govern your use of our community 
        platform that helps you discover events and places in Mazunte, Mexico. By using our app, 
        you agree to be bound by these Terms.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Acceptable Use:</Text> You agree to use Mazunte Connect responsibly and respectfully. 
        You may not post false, misleading, or harmful content. You are responsible for the accuracy 
        of any events or places you create or share. Harassment, spam, or illegal activities are prohibited.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">User Content:</Text> When you create events, add places, or post content, you grant 
        us a license to display and distribute that content within our platform. You retain ownership 
        of your content and can delete it at any time. We reserve the right to remove content that 
        violates these Terms.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Community Guidelines:</Text> Be respectful to other users and the local community. 
        Help maintain Mazunte's welcoming atmosphere by being inclusive, helpful, and environmentally 
        conscious. Report inappropriate content or behavior through our app's reporting features.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Privacy and Data:</Text> Your privacy is important to us. Please review our Privacy 
        Policy to understand how we collect, use, and protect your information. We use your location 
        data only to show you relevant nearby events and places.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Limitation of Liability:</Text> Mazunte Connect is provided "as is" without warranties. 
        We are not responsible for the accuracy of user-generated content or any issues arising from 
        events or places listed on our platform. Use the app at your own discretion.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Termination:</Text> We may suspend or terminate your account if you violate these 
        Terms. You may also delete your account at any time. Upon termination, your content may be 
        removed from our platform.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Contact Information:</Text> If you have questions about these Terms, please contact 
        us at legal@mazunteconnect.com. These Terms are governed by Mexican law and any disputes 
        will be resolved in Mexican courts.
      </Paragraph>
      </YStack>
    </ScrollView>
  )
}
