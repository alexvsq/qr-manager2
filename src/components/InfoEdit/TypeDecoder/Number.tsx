import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'
import { getNumberData } from '@/functions/OrderData'
import { InfoTitleAndText } from '@/components/InfoEdit/components'

export default function Number({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()
    const DataOfValue = getNumberData(item.value)


    return (
        <>
            <InfoTitleAndText
                title={t('number.title')}
                text={DataOfValue}
            />
        </>
    )
}