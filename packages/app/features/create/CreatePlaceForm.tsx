import type { Database } from '@my/supabase/types'
import { FullscreenSpinner, SubmitButton, Theme, YStack, useToastController } from '@my/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SchemaForm, formFields } from 'app/utils/SchemaForm'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import { z } from 'zod'

type InsertPlace = Database['public']['Tables']['places']['Insert']

const CreatePlaceFormSchema = z.object({
  name: formFields.text.min(3).describe('Name // Place name'),
  type: formFields.select.describe('Type // Place type'),
  category: formFields.text.describe('Category // e.g. Vinyasa, Cacao, Sound Healing'),
  description: formFields.textarea.describe('Description // Tell us about this place'),
  location_name: formFields.text.describe('Location // e.g. Playa Mermejita, Centro'),
  lat: formFields.number.describe('Latitude // GPS coordinate').default(15.6658),
  lng: formFields.number.describe('Longitude // GPS coordinate').default(-96.7347),
  price_range: formFields.select.describe('Price Range // How expensive?').nullable().optional(),
  contact_phone: formFields.text.describe('Phone // Contact number').nullable().optional(),
  contact_whatsapp: formFields.text.describe('WhatsApp // WhatsApp number').nullable().optional(),
  contact_email: formFields.text.describe('Email // Contact email').nullable().optional(),
  contact_instagram: formFields.text.describe('Instagram // Instagram handle').nullable().optional(),
  website_url: formFields.text.describe('Website // Website URL').nullable().optional(),
  eco_conscious: formFields.boolean_switch.describe('Eco Conscious // Is this eco-friendly?').default(false),
})

export const CreatePlaceForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const toast = useToastController()
  const { profile, user } = useUser()
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    async onError(error) {
      toast.show('Error creating place')
      console.log('error', error)
    },

    async mutationFn(data: z.infer<typeof CreatePlaceFormSchema>) {
      const insertData: InsertPlace = {
        name: data.name.trim(),
        type: data.type,
        category: data.category.trim(),
        description: data.description,
        location_name: data.location_name.trim(),
        lat: data.lat,
        lng: data.lng,
        price_range: data.price_range || null,
        contact_phone: data.contact_phone?.trim() || null,
        contact_whatsapp: data.contact_whatsapp?.trim() || null,
        contact_email: data.contact_email?.trim() || null,
        contact_instagram: data.contact_instagram?.trim() || null,
        website_url: data.website_url?.trim() || null,
        eco_conscious: data.eco_conscious || false,
        created_by: user?.id,
      }
      await supabase.from('places').insert(insertData)
    },

    async onSuccess() {
      onSuccess()
      await queryClient.invalidateQueries({ queryKey: ['places'] })
    },
  })

  if (!profile || !user?.id) {
    return <FullscreenSpinner />
  }

  return (
    <>
      <SchemaForm
        onSubmit={(values) => mutation.mutate(values)}
        schema={CreatePlaceFormSchema}
        defaultValues={{
          name: '',
          type: 'wellness',
          category: '',
          description: '',
          location_name: 'Mazunte',
          lat: 15.6658,
          lng: -96.7347,
          price_range: '$$',
          contact_phone: '',
          contact_whatsapp: '',
          contact_email: '',
          contact_instagram: '',
          website_url: '',
          eco_conscious: false,
        }}
        props={{
          type: {
            placeholder: 'Select type',
            options: [
              { name: 'Retreat', value: 'retreat' },
              { name: 'Wellness', value: 'wellness' },
              { name: 'Restaurant', value: 'restaurant' },
              { name: 'Activity', value: 'activity' },
              { name: 'Community', value: 'community' },
            ],
          },
          price_range: {
            placeholder: 'Select price range',
            options: [
              { name: '$', value: '$' },
              { name: '$$', value: '$$' },
              { name: '$$$', value: '$$$' },
              { name: '$$$$', value: '$$$$' },
            ],
          },
        }}
        renderAfter={({ submit }) => (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>Create Place</SubmitButton>
          </Theme>
        )}
      >
        {(fields) => (
          <YStack gap="$2" py="$4" pb="$0" pt="$0" minWidth="100%" $gtSm={{ minWidth: 480 }}>
            {Object.values(fields)}
          </YStack>
        )}
      </SchemaForm>
    </>
  )
}
