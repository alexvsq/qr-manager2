import { View, Text, Button } from 'react-native'
import { useState } from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function Camera() {


    return (
        <CameraView style={{ flex: 1, borderRadius: 26 }}>

        </CameraView>
    )
}