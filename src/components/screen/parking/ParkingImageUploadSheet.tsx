import { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@components/ui/actionsheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMutation } from '@tanstack/react-query';
import { Button, ButtonText } from '~/src/components/ui/button';
import { Text } from '~/src/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { http } from '~/src/libs/http'; // Adjust based on your setup
import { logger } from '~/src/utils/logger';

type Props = {
  open: boolean;
  onClose: () => void;
  parkingId: string;
};

export const ParkingImageUploadSheet = ({ open, onClose, parkingId }: Props) => {
  const [images, setImages] = useState<any[]>([]);

  const { mutate: uploadImages, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      images.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          name: img.fileName ?? `photo-${index}.jpg`,
          type: img.type ?? 'image/jpeg',
        });
      });
      formData.append('parkingId', parkingId);

      return http.post('/parking/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      onClose();
      setImages([]);
    },
    onError: (err) => {
      logger.error(err);
    },
  });

  const pickImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, (res) => {
      if (!res.didCancel && res.assets) {
        setImages(res.assets);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Actionsheet isOpen={open} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="h-[75%] bg-white px-4 pb-4">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Text className="mb-2 text-xl font-bold text-gray-900">Upload Parking Images</Text>
        <Text className="mb-4 text-gray-500">
          Add photos to give users a better view of your space.
        </Text>

        <Button onPress={pickImages} size="md" variant="outline" className="mb-4">
          <ButtonText>Select Images</ButtonText>
        </Button>

        <ScrollView horizontal className="mb-4">
          {images.map((image, index) => (
            <View key={index} className="relative mr-3">
              <Image
                source={{ uri: image.uri }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <TouchableOpacity
                className="absolute right-[-5px] top-[-5px] rounded-full bg-white p-1 shadow"
                onPress={() => removeImage(index)}>
                <Ionicons name="close-circle" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
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
