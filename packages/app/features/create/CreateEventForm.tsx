import type { Database } from '@my/supabase/types'
import { FullscreenSpinner, SubmitButton, Theme, YStack, useToastController } from '@my/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SchemaForm, formFields } from 'app/utils/SchemaForm'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import { z } from 'zod'

type InsertEvent = Database['public']['Tables']['events']['Insert']

const CreateEventFormSchema = z.object({
  title: formFields.text.min(5).describe('Title // Event title'),
  description: formFields.textarea.describe('Description // Event description').nullable(),
  category: formFields.select.describe('Category // Event category'),
  date: formFields.date.describe('Date // Event date'),
  time: formFields.text.describe('Time // e.g. 18:00 or 18:00-20:00').nullable().optional(),
  location_name: formFields.text.describe('Location // Where is the event?'),
  lat: formFields.number.describe('Latitude // GPS coordinate').default(15.6658),
  lng: formFields.number.describe('Longitude // GPS coordinate').default(-96.7347),
  price: formFields.text.describe('Price // e.g. Free, $500 MXN, $20 USD').nullable().optional(),
  eco_conscious: formFields.boolean_switch.describe('Eco Conscious // Is this eco-friendly?').default(false),
  organizer_name: formFields.text.describe('Organizer Name').nullable().optional(),
  organizer_contact: formFields.text.describe('Contact // Email, phone, or WhatsApp').nullable().optional(),
  image_url: formFields.text.describe('Image URL // Optional').nullable().optional(),
})

export const CreateEventForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const toast = useToastController()
  const { profile, user } = useUser()
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    async onError(error) {
      toast.show('Error creating event')
      console.log('error', error)
    },

    async mutationFn(data: z.infer<typeof CreateEventFormSchema>) {
      const insertData: InsertEvent = {
        title: data.title.trim(),
        description: data.description,
        category: data.category,
        date: data.date.dateValue.toISOString().split('T')[0],
        time: data.time?.trim() || null,
        location_name: data.location_name.trim(),
        lat: data.lat,
        lng: data.lng,
        price: data.price?.trim() || null,
        eco_conscious: data.eco_conscious || false,
        organizer_name: data.organizer_name?.trim() || null,
        organizer_contact: data.organizer_contact?.trim() || null,
        image_url: data.image_url?.trim() || null,
        profile_id: user?.id,
      }
      await supabase.from('events').insert(insertData)
    },

    async onSuccess() {
      onSuccess()
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  if (!profile || !user?.id) {
    return <FullscreenSpinner />
  }

  return (
    <>
      <SchemaForm
        onSubmit={(values) => mutation.mutate(values)}
        schema={CreateEventFormSchema}
        defaultValues={{
          title: '',
          description: '',
          category: 'yoga',
          date: {
            dateValue: new Date(),
          },
          time: '',
          location_name: 'Mazunte',
          lat: 15.6658,
          lng: -96.7347,
          price: '',
          eco_conscious: false,
          organizer_name: '',
          organizer_contact: '',
          image_url: '',
        }}
        props={{
          category: {
            placeholder: 'Select category',
            options: [
              { name: 'Yoga', value: 'yoga' },
              { name: 'Ceremony', value: 'ceremony' },
              { name: 'Workshop', value: 'workshop' },
              { name: 'Party', value: 'party' },
              { name: 'Market', value: 'market' },
              { name: 'Other', value: 'other' },
            ],
          },
        }}
        renderAfter={({ submit }) => (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>Create Event</SubmitButton>
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
