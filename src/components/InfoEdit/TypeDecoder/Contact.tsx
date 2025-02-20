import { ScannedHistoryData } from '@/types/types'
import { getContactData } from '@/functions/OrderData'
import { InfoTitleAndText } from '@/components/InfoEdit/components'
import { useTranslation } from 'react-i18next'

export default function Contact({ item }: { item: ScannedHistoryData }) {

    const { t } = useTranslation()
    const DataOfValue = getContactData(item.value)

    const { firstName, lastName, fullName, organization, title, workPhone, homePhone, email, address, birthday, url } = DataOfValue

    return (
        <>
            <InfoTitleAndText title={t('contact.fullName')} text={fullName} />

            <InfoTitleAndText title={t('contact.organization')} text={organization} />

            <InfoTitleAndText title={t('contact.title')} text={title} />

            <InfoTitleAndText title={t('contact.workPhone')} text={workPhone} />

            <InfoTitleAndText title={t('contact.homePhone')} text={homePhone} />

            <InfoTitleAndText title={t('contact.email')} text={email} />

            <InfoTitleAndText title={t('contact.address')} text={address} />

            <InfoTitleAndText title={t('contact.birthday')} text={birthday} />

            <InfoTitleAndText title={t('contact.url')} text={url} />
        </>
    )
}