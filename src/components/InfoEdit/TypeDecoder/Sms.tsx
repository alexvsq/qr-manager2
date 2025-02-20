import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'
import { getSMSData } from '@/functions/OrderData'
import DivisorLine from '@/components/ui/DivisorLine'
import { InfoTitleAndText } from '@/components/InfoEdit/components'

export default function Sms({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()
    const DataOfValue = getSMSData(item.value)

    const { phoneNumber, message } = DataOfValue

    return (
        <>
            <InfoTitleAndText
                title={t('sms.phoneNumber')}
                text={phoneNumber}
            />

            <DivisorLine />

            <InfoTitleAndText
                title={t('sms.message')}
                text={message}
            />
        </>
    )
}