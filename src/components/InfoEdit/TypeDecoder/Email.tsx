import { View, Text } from 'react-native'
import React from 'react'
import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'
import { getEmailData } from '@/functions/OrderData'
import { InfoTitleAndText } from '@/components/InfoEdit/components'
import DivisorLine from '@/components/ui/DivisorLine'

export default function Email({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()
    const { body, subject, to } = getEmailData(item.value)

    return (
        <View>
            <InfoTitleAndText
                title={t('email.to')}
                text={to}
            />
            <DivisorLine />

            <InfoTitleAndText
                title={t('email.subject')}
                text={subject}
            />
            <DivisorLine />

            <InfoTitleAndText
                title={t('email.body')}
                text={body}
            />
        </View>
    )
}