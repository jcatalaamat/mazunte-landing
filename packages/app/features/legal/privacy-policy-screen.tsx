import { H1, Paragraph, YStack, isWeb, Text } from '@my/ui'

export const PrivacyPolicyScreen = () => {
  return (
    <YStack gap="$4" p="$4">
      {/* only show title on web since mobile has navigator title */}
      {isWeb && <H1>Privacy Policy</H1>}
      <Paragraph>
        At Mazunte Connect, we are committed to protecting your privacy and personal information. 
        This Privacy Policy explains how we collect, use, and safeguard your data when you use our 
        community platform to discover events and places in Mazunte, Mexico.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Information We Collect:</Text> We collect information you provide directly, such as 
        your name, email address, and profile information when you create an account. We also collect 
        location data to show you nearby events and places, and usage information to improve our services.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">How We Use Your Information:</Text> We use your information to provide and improve 
        our services, send you notifications about events and places you're interested in, and help 
        you connect with the Mazunte community. We never sell your personal information to third parties.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Data Security:</Text> We implement appropriate security measures to protect your 
        personal information against unauthorized access, alteration, disclosure, or destruction. 
        Your data is stored securely and encrypted in transit.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Your Rights:</Text> You have the right to access, update, or delete your personal 
        information at any time. You can also opt out of certain communications from us. Contact us 
        at privacy@mazunteconnect.com if you have any questions about your data.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Changes to This Policy:</Text> We may update this Privacy Policy from time to time. 
        We will notify you of any changes by posting the new Privacy Policy on this page and updating 
        the "Last Updated" date.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Contact Us:</Text> If you have any questions about this Privacy Policy, please 
        contact us at privacy@mazunteconnect.com or through our app support channels.
      </Paragraph>
    </YStack>
  )
}
