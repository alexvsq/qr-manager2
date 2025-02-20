import { ScannedHistoryData } from '@/types/types'
import { useTranslation } from 'react-i18next'
import { InfoTitleAndText } from '@/components/InfoEdit/components'

export default function TextType({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()

    return (
        <>
            <InfoTitleAndText
                title={t('text.title')}
                text={item.value}
            />
        </>
    )
}