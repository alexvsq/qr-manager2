import { InfoTitleAndText } from '@/components/InfoEdit/components'
import { useTranslation } from 'react-i18next'
import { ScannedHistoryData } from '@/types/types'

export default function Barcode({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()

    return (
        <>
            <InfoTitleAndText
                title={t('barcode.data')}
                text={item.value}
            />
        </>
    )
}