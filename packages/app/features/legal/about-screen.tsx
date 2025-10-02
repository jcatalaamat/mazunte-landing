import { H1, Paragraph, Text, YStack, isWeb } from '@my/ui'
import { Link } from 'expo-router'
import { ScrollView } from 'react-native'

export const AboutScreen = () => {
  return (
    <ScrollView>
      <YStack gap="$4" p="$4">
      {/* only show title on web since mobile has navigator title */}
      {isWeb && <H1>About Mazunte Connect</H1>}
      
      <Paragraph>
        <Text fontWeight="bold">Welcome to Mazunte Connect!</Text> We're a community-driven platform 
        designed to help residents and visitors discover the amazing events, places, and experiences 
        that make Mazunte, Mexico such a special destination.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Our Mission:</Text> To connect people with the vibrant community of 
        Mazunte by showcasing local events, highlighting unique places, and fostering meaningful 
        connections between residents and visitors who share a love for this beautiful coastal town.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">What We Offer:</Text> Discover upcoming events, explore local businesses 
        and attractions, find community activities, and stay connected with everything happening in 
        Mazunte. Whether you're a long-time resident or a first-time visitor, our platform helps you 
        make the most of your time in this incredible place.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Community Focus:</Text> We believe in supporting the local economy, 
        promoting sustainable tourism, and celebrating the unique culture and natural beauty that 
        makes Mazunte special. Our platform is built by the community, for the community.
      </Paragraph>

      <Paragraph>
        <Text fontWeight="bold">Get Involved:</Text> Have an event to share? Know a great place 
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
