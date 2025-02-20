import { View, Text } from 'react-native'
import React from 'react'
import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'
import { } from '@/functions/OrderData'
import { InfoTitleAndText } from '@/components/InfoEdit/components'

export default function Web({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()

    return (
        <InfoTitleAndText
            title={t('web.title')}
            text={item.value}
        />
    )
}