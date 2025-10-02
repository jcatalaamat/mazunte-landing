import { FormWrapper, H2, H4, KVTable, Separator, SizableText, YStack, isWeb, styled, Button, Text } from '@my/ui'
import { useUser } from 'app/utils/useUser'
import { Link } from 'solito/link'
import * as Sentry from '@sentry/react-native'

export const GeneralSettingsScreen = () => {
  const { user, profile } = useUser()

  // Test Sentry crash function
  const testSentryCrash = () => {
    Sentry.captureException(new Error('Test crash from General Settings!'))
    Sentry.captureMessage('Test message from General Settings', 'info')
    console.log('Sentry test crash triggered from General Settings!')
  }

  return (
    <FormWrapper>
      {isWeb && (
        <YStack px="$4" py="$4" pb="$2">
          <H2>General</H2>
        </YStack>
      )}
      <FormWrapper.Body mt="$2" gap="$10">
        <Section>
          <KVTable>
            <YStack gap="$4">
              <H4>Profile Data</H4>
              <Separator />
            </YStack>
            <KVTable.Row>
              <KVTable.Key>
                <SizableText fow="900">Name</SizableText>
              </KVTable.Key>
              <KVTable.Value gap="$4">
                <SizableText>{profile?.name}</SizableText>
                <Link href="/profile/edit">
                  <SizableText textDecorationLine="underline">Change</SizableText>
                </Link>
              </KVTable.Value>
            </KVTable.Row>
          </KVTable>
        </Section>

        <Section>
          <KVTable>
            <YStack gap="$4">
              <H4>Account Data</H4>
              <Separator />
            </YStack>
            <KVTable.Row>
              <KVTable.Key>
                <SizableText fow="900">Email</SizableText>
              </KVTable.Key>
              <KVTable.Value gap="$4">
                <SizableText>{user?.email}</SizableText>
                <Link href="/settings/change-email">
                  <SizableText textDecorationLine="underline">Change</SizableText>
                </Link>
              </KVTable.Value>
            </KVTable.Row>

            <KVTable.Row>
              <KVTable.Key>
                <SizableText fow="900">User ID</SizableText>
              </KVTable.Key>
              <KVTable.Value>
                <SizableText>{user?.id}</SizableText>
              </KVTable.Value>
            </KVTable.Row>
          </KVTable>
        </Section>

        <Section>
          <YStack gap="$4">
            <H4>Development Tools</H4>
            <Separator />
            <Button
              size="$4"
              variant="outlined"
              backgroundColor="$red9"
              onPress={testSentryCrash}
            >
              <Text color="white">Test Sentry Crash</Text>
            </Button>
          </YStack>
        </Section>
      </FormWrapper.Body>
    </FormWrapper>
  )
}

const Section = styled(YStack, {
  boc: '$borderColor',
  bw: 1,
  p: '$4',
  br: '$4',
})
