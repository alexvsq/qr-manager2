import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert, Platform } from "react-native";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";

export const saveBase64Image = async (base64Data: string) => {
  try {
    // Solicitar permisos
    let { status, accessPrivileges } =
      await MediaLibrary.requestPermissionsAsync();

    // Si el acceso es limitado, pedir acceso completo
    if (accessPrivileges === "limited") {
      await MediaLibrary.presentPermissionsPickerAsync();
      ({ status, accessPrivileges } =
        await MediaLibrary.requestPermissionsAsync());
    }

    // Si el permiso sigue sin ser "granted", mostrar error
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Se necesita acceso completo a la galería para guardar imágenes."
      );
      return;
    }

    // Guardar la imagen en almacenamiento temporal
    const fileUri = FileSystem.cacheDirectory + "qr_image.png";
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Guardar en la galería
    const asset = await MediaLibrary.createAssetAsync(fileUri);

    try {
      // Intentar crear un álbum (si ya existe, lanza un error)
      await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
    } catch (albumError) {
      console.log(
        "El álbum ya existe o hubo un problema al crearlo:",
        albumError
      );
    }

    Alert.alert("Imagen guardada", "La imagen se ha guardado en tu galería.");
  } catch (error) {
    console.error("Error al guardar la imagen:", error);

    Alert.alert("Error", "No se pudo guardar la imagen.");
  }
};

export const shareBase64Image = async (base64Data: string) => {
  try {
    // Guardar la imagen temporalmente en el dispositivo
    const fileUri = FileSystem.cacheDirectory + "qr_image.png";
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Verificar si se puede compartir
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert(
        "Error",
        "No se puede compartir esta imagen en este dispositivo."
      );
      return;
    }

    // Compartir la imagen
    await Sharing.shareAsync(fileUri);
  } catch (error) {
    console.error("Error al compartir la imagen:", error);
    Alert.alert("Error", "No se pudo compartir la imagen.");
  }
};

export const pickImage = async () => {
  try {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería");
      return;
    }

    // Abrir selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Guardar la imagen seleccionada como base64
      return result.assets[0].uri;
    }
  } catch (error) {
    console.error("Error al seleccionar imagen:", error);
    alert("Ocurrió un error al seleccionar la imagen");
  }
};
