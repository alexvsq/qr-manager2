import { View, Text, Button } from 'react-native'
import { useState, useRef } from 'react'
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useCameraStore } from '@/store/cameraStore'
import { SaveScannedHistory } from '@/functions/sql/storageData'
import { useScannedHistory } from '@/hooks/useScannedHistory'

export default function Camera() {

    const Facing = useCameraStore((state) => state.facing)
    const Flash = useCameraStore((state) => state.flash)
    const [permission, requestPermission] = useCameraPermissions();
    const { AddAndSaveScannedHistory } = useScannedHistory()


    let isActiveToScannRef = useRef(true);

    const handleBarcodeScanned = async (ScannedResult: BarcodeScanningResult) => {
        if (!isActiveToScannRef.current) return;

        isActiveToScannRef.current = false;
        try {
            await AddAndSaveScannedHistory({ ScannedResult });
            setTimeout(() => {
                isActiveToScannRef.current = true;
            }, 2000);

        } catch (error) {
            isActiveToScannRef.current = true;
            console.error(error);
        }
    };

    return (
        <CameraView
            style={{ flex: 1, borderRadius: 26, overflow: 'hidden' }}
            facing={Facing}
            enableTorch={Flash}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleBarcodeScanned}
        >
            {
                !permission &&
                <Button title="Request Camera Permissions" onPress={requestPermission} />
            }
        </CameraView>
    )
}