import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

type ImageI = {
  uri: string;
  name: string | null | undefined;
  type: 'image' | 'video' | 'livePhoto' | 'pairedVideo' | undefined;
};

type PickerResult = {
  image: ImageI | null | ImagePicker.ImagePickerAsset;
  cancelled: boolean;
  error?: string;
};

export function useImagePicker() {
  const [image, setImage] = useState<ImageI | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const pickFromLibrary = async (): Promise<PickerResult> => {
    if (!hasPermission) {
      return { image: null, cancelled: true, error: 'Permission to access gallery was denied' };
    }

    setError(null);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      const msg = 'Permission to access gallery was denied';
      setError(msg);
      return { image: null, cancelled: true, error: msg };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImage = result.assets[0];
      setImage({
        uri: newImage.uri,
        name: newImage.fileName || newImage.uri.split('/').pop() || 'photo.jpg',
        type: 'image',
      });
      return { image: newImage, cancelled: false };
    }

    return { image: { uri: '', name: '', type: 'image' }, cancelled: true };
  };

  const takePhoto = async (): Promise<PickerResult> => {
    setError(null);

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      const msg = 'Permission to access camera was denied';
      setError(msg);
      return { image: null, cancelled: true, error: msg };
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImage = result.assets[0];
      setImage({
        uri: newImage.uri,
        name: newImage.fileName || newImage.uri.split('/').pop() || 'photo.jpg',
        type: 'image',
      });
      return { image: newImage, cancelled: false };
    }

    return { image: null, cancelled: true };
  };

  const clearImage = () => {
    setImage(null);
    setError(null);
  };

  return {
    image,
    error,
    pickFromLibrary,
    takePhoto,
    clearImage,
    hasPermission,
  };
}
