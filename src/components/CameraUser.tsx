import { Button } from 'react-native'
import { useRef, useState } from 'react'
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useCameraStore } from '@/store/cameraStore'
import { useScannedHistory } from '@/hooks/useScannedHistory'
import { GetDataForSave } from '@/functions/OrderData'
import { ScannedHistoryData } from '@/types/types'
import { SaveScannedHistory } from '@/functions/sql/setData'
import ScannedInfoToShow from '@/components/modals/ScannedInfoModal'
import { useSettings } from '@/hooks/useSettings'
import { VibrationComfirm } from '@/functions/functions'

export default function Camera() {

    const Facing = useCameraStore((state) => state.facing)
    const Flash = useCameraStore((state) => state.flash)
    const { AddinScannedHistoryList } = useScannedHistory()
    const { configState } = useSettings()


    const [permission, requestPermission] = useCameraPermissions();
    const [dataScanned, setDataScanned] = useState<ScannedHistoryData | null>(null)
    const [modalVisible, setModalVisible] = useState(false)

    let isActiveToScannRef = useRef(true);

    const handleBarcodeScanned = async (ScannedResult: BarcodeScanningResult) => {
        if (!isActiveToScannRef.current || modalVisible) return;
        isActiveToScannRef.current = false;

        try {
            const DataToSave = GetDataForSave(ScannedResult);
            const newID = await SaveScannedHistory(DataToSave);

            if (newID) {
                if (configState.vibration) await VibrationComfirm();
                const newItem = { ...DataToSave, id: newID }
                setDataScanned(newItem)
                AddinScannedHistoryList(newItem)
                setModalVisible(true)
            }

            setTimeout(() => {
                isActiveToScannRef.current = true;
            }, configState.SecondDelay * 1000);

        } catch (error) {
            isActiveToScannRef.current = true;
            console.error(error);
        }
    };

    return (
        <>
            <CameraView
                style={{ flex: 1, borderRadius: 26, overflow: 'hidden' }}
                facing={Facing}
                enableTorch={Flash}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", 'aztec', 'codabar', 'code128', 'code39', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e'],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            >
                {
                    !permission &&
                    <Button title="Request Camera Permissions" onPress={requestPermission} />
                }
            </CameraView>

            <ScannedInfoToShow
                info={dataScanned}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    )
}