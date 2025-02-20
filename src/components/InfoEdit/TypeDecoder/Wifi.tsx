import { getWifiData } from '@/functions/OrderData'
import DivisorLine from '@/components/ui/DivisorLine'
import { InfoTitleAndText } from '@/components/InfoEdit/components'
import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'

export default function Wifi({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()
    const DataOfValue = getWifiData(item.value)

    return (
        <>
            <InfoTitleAndText
                title={t('wifi.name')}
                text={DataOfValue.name}
            />

            <DivisorLine />

            <InfoTitleAndText
                title={t('wifi.password')}
                text={DataOfValue.password}
            />
            <DivisorLine />

            <InfoTitleAndText
                title={t('wifi.security')}
                text={DataOfValue.security}
            />

            <DivisorLine />

            <InfoTitleAndText
                title={t('wifi.hidden')}
                text={DataOfValue.hidden}
            />
        </>
    )
}