import { View, Text } from 'react-native'
import { ScannedHistoryData } from '@/types/types'
import { InfoTitleAndText } from '@/components/InfoEdit/components'
import { useTranslation } from 'react-i18next'

export default function Url({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()

    return (
        <InfoTitleAndText
            title={t('url.title')}
            text={item.value}
        />
    )
}