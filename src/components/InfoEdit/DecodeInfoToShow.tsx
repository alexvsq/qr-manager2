import { ScannedHistoryData } from '@/types/types'
import Web from '@/components/InfoEdit/TypeDecoder/Web'
import Wifi from '@/components/InfoEdit/TypeDecoder/Wifi'
import Contact from '@/components/InfoEdit/TypeDecoder/Contact'
import Barcode from '@/components/InfoEdit/TypeDecoder/Barcode'
import Sms from '@/components/InfoEdit/TypeDecoder/Sms'
import Number from '@/components/InfoEdit/TypeDecoder/Number'
import Email from '@/components/InfoEdit/TypeDecoder/Email'
import TextType from '@/components/InfoEdit/TypeDecoder/TextType'
import Url from '@/components/InfoEdit/TypeDecoder/Url'
import { InputNotes } from '@/components/modals/NotesInput'
import DivisorLine from '@/components/ui/DivisorLine'

interface Props {
    item: ScannedHistoryData | null;
    typeHistory: 'scanned' | 'created'
}

export default function Principal({ item, typeHistory }: Props) {
    if (!item) return null
    return (
        <>
            {
                item.type === 'bar' && <Barcode item={item} />
            }
            {
                item.type === 'wifi' && <Wifi item={item} />
            }
            {
                item.type === 'web' && <Web item={item} />
            }
            {
                item.type === 'contact' && <Contact item={item} />
            }
            {
                item.type === 'sms' && <Sms item={item} />
            }
            {
                item.type === 'number' && <Number item={item} />
            }
            {
                item.type === 'email' && <Email item={item} />
            }
            {
                item.type === 'text' && <TextType item={item} />
            }
            {
                item.type === 'url' && <Url item={item} />
            }

            <DivisorLine />

            <InputNotes
                id={item.id}
                TextSaved={item.notes}
                typeHistory={typeHistory}
            />

        </>
    )
}


