import { View, Text, Button } from 'react-native'
import React from 'react'
import Background from '@/components/ui/Background-Page'
import { GetScannedAllRows, deleteall } from '@/functions/sql/storageData'

export default function settings() {

    const init = async () => {
        const data = await GetScannedAllRows()
        console.log(data);

    }
    const deleteRows = async () => {
        await deleteall()
    }

    return (
        <Background>
            <Text>settings</Text>
            <Button title="test" onPress={init} />

            <Button title="DELETE" onPress={deleteRows} />
        </Background>
    )
}