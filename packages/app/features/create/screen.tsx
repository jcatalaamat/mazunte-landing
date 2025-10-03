import { useToastController } from '@my/ui'
import { useGlobalStore } from 'app/utils/global-store'
import { usePathname } from 'app/utils/usePathname'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'solito/router'
import type { TabsContentProps } from 'tamagui'
import { Separator, Tabs, Text, useEvent } from 'tamagui'
import { useTranslation } from 'react-i18next'

import { CreateEventForm } from './CreateEventForm'
import { CreatePlaceForm } from './CreatePlaceForm'

export const CreateScreen = () => {
  const { setToggleCreateModal } = useGlobalStore()
  const pathName = usePathname()
  const toast = useToastController()
  const router = useRouter()
  const { t } = useTranslation()

  const [activeTabIndex, _setActiveTabIndex] = useState(0)
  const activeTabRef = useRef(activeTabIndex)
  activeTabRef.current = activeTabIndex

  const changeActiveTab = useEvent((activeTabIndex) => {
    _setActiveTabIndex(activeTabIndex)
  })

  const [currentTab, setCurrentTab] = useState<string>('event')

  useEffect(() => {
    changeActiveTab(activeTabIndex)
  }, [])

  const onSuccess = () => {
    toast.show('Successfully created!')

    if (pathName === '/create') {
      router.back()
    } else {
      setToggleCreateModal()
    }
  }

  const renderTab = () => {
    switch (currentTab) {
      case 'event':
        return <CreateEventForm onSuccess={onSuccess} />
      case 'place':
        return <CreatePlaceForm onSuccess={onSuccess} />
      default:
        return <CreateEventForm onSuccess={onSuccess} />
    }
  }

  return (
    <Tabs
      flexDirection="column"
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$color1"
      defaultValue="event"
      flex={1}
      value={currentTab}
      onValueChange={setCurrentTab}
      alignItems="center"
      alignSelf="center"
      width="100%"
      $gtSm={{
        maxWidth: 660,
      }}
    >
      <Tabs.List
        w="100%"
        userSelect="none"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={0}
        borderBottomWidth={1}
        borderColor="$borderColor"
      >
        {[
          { key: 'event', label: t('create.add_event') },
          { key: 'place', label: t('create.add_place') }
        ].map((tab) => {
          const active = tab.key === currentTab

          return (
            <Tabs.Tab
              unstyled
              key={tab.key}
              value={tab.key}
              flex={1}
              pressStyle={{ opacity: 0.5 }}
              justifyContent="center"
              alignItems="center"
              p="$4"
              borderBottomWidth={1}
              borderColor={active ? '$accentColor' : '$borderColor'}
            >
              <Text
                theme={active ? undefined : 'alt1'}
                cursor="pointer"
                fontWeight={active ? '600' : undefined}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </Tabs.Tab>
          )
        })}
      </Tabs.List>
      <Separator />

      <TabsContent value={currentTab} forceMount>
        {renderTab()}
      </TabsContent>
    </Tabs>
  )
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      flex={1}
      borderColor="$background"
      height={600}
      width="100%"
      minWidth="$100%"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  )
}
