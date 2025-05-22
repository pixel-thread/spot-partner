import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@components/ui/actionsheet';
import { useMutation } from '@tanstack/react-query';
import { Button, ButtonText } from '~/src/components/ui/button';
import { Text } from '~/src/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { logger } from '~/src/utils/logger';
import * as ImagePicker from 'expo-image-picker';
import { Image } from '../../ui/image';
import { HStack } from '../../ui/hstack';
import { VStack } from '../../ui/vstack';

type Props = {
  open: boolean;
  onClose: () => void;
  parkingId: string;
};

export const ParkingImageUploadSheet = ({ open, onClose, parkingId }: Props) => {
  const [images, setImages] = useState<any[]>([]);

  const { mutate: uploadImages, isPending } = useMutation({
    onSuccess: () => {
      onClose();
      setImages([]);
    },
    onError: (err) => {
      logger.error(err);
    },
  });

  const pickImage = async () => {
    let permissionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionStatus.granted === false) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Actionsheet isOpen={open} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="min-h-[70%] bg-white px-4 pb-4">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Text className="mb-2 text-xl font-bold text-gray-900">Upload Parking Images</Text>
        <Text className="mb-4 text-gray-500">
          Add photos to give users a better view of your space.
        </Text>

        <Button onPress={pickImage} size="md" variant="outline" className="mb-4">
          <ButtonText>Select Images</ButtonText>
        </Button>

        <ScrollView className="mb-4 grid grid-cols-3">
          <View className="mb-4 flex-row flex-wrap justify-start">
            {images.map((image, index) => (
              <View key={index} className="relative m-1">
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <TouchableOpacity
                  className="absolute right-[-5px] top-[-5px] rounded-full bg-white p-1 shadow"
                  onPress={() => removeImage(index)}>
                  <Ionicons name="close-circle" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <Button
          onPress={() => uploadImages()}
          isDisabled={images.length === 0 || isPending}
          size="lg">
          <ButtonText>Upload</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
};
