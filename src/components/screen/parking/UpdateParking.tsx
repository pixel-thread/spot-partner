import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@components/ui/actionsheet';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@components/ui/form-control';
import { Input, InputField } from '@components/ui/input';
import { Button, ButtonText } from '@components/ui/button';
import { VStack } from '@components/ui/vstack';
import { HStack } from '@components/ui/hstack';
import { ScrollView } from 'react-native';
import { Text } from '@components/ui/text';
import { Spinner } from '@components/ui/spinner';
import { Ternary } from '@components/common/Ternary';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';

type ParkingFormData = z.infer<typeof parkingSchema>;

type UpdateParkingFormProps = {
  open: boolean;
  onClose: () => void;
  initialData: ParkingFormData;
};

export const UpdateParkingForm = ({ open, onClose, initialData }: UpdateParkingFormProps) => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ParkingFormData>({
    resolver: zodResolver(parkingSchema),
    defaultValues: initialData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ParkingFormData) =>
      http.put(PARKING_ENDPOINT.PUT_PARKING_PARKING_ID.replace(':id', initialData.id || ''), data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['parkings'] });
        queryClient.invalidateQueries({ queryKey: ['parking', initialData.id] });
        onClose();
      }
    },
  });
  const handleClose = () => {
    onClose();
    reset(initialData);
  };

  const onSubmit = (data: ParkingFormData) => mutate(data);
  logger.info(errors);
  return (
    <Actionsheet shouldRasterizeIOS isOpen={open} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="h-[90%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack space="lg" className="w-full p-4">
          <Text className="text-xl font-bold">Update Parking Lot</Text>

          <ScrollView className="max-h-[500px] w-full">
            <VStack space="md" className="w-full">
              {/* Shared Inputs (same as AddParkingForm) */}
              {[
                { name: 'name', label: 'Name', placeholder: 'Enter parking name' },
                { name: 'address', label: 'Address', placeholder: 'Enter address' },
                { name: 'city', label: 'City', placeholder: 'Enter city' },
                {
                  name: 'price',
                  label: 'Price',
                  placeholder: 'Enter price',
                  keyboardType: 'numeric',
                },
                { name: 'openHours', label: 'Open Hours', placeholder: 'Enter open hours' },
                {
                  name: 'description',
                  label: 'Description',
                  placeholder: 'Enter description',
                  multiline: true,
                },
                {
                  name: 'features',
                  label: 'Features',
                  placeholder: 'Enter features',
                  multiline: true,
                },
              ].map(({ name, label, placeholder, keyboardType, multiline }) => (
                <Controller
                  key={name}
                  control={control}
                  name={name as keyof ParkingFormData}
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={!!errors[name as keyof ParkingFormData]}>
                      <FormControlLabel>
                        <FormControlLabelText>{label}</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          value={value as any}
                          onChangeText={onChange}
                          placeholder={placeholder}
                          multiline={multiline}
                          numberOfLines={multiline ? 3 : 1}
                          className={multiline ? 'min-h-[60px] text-base' : ''}
                        />
                      </Input>
                      {errors[name as keyof ParkingFormData] && (
                        <FormControlError>
                          <FormControlErrorText>
                            {errors[name as keyof ParkingFormData]?.message}
                          </FormControlErrorText>
                        </FormControlError>
                      )}
                    </FormControl>
                  )}
                />
              ))}

              {/* Buttons */}
              <HStack space="md" className="mt-4 justify-center">
                <Button variant="outline" isDisabled={isPending} size="lg" onPress={handleClose}>
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button isDisabled={isPending} size="lg" onPress={handleSubmit(onSubmit)}>
                  <Ternary
                    condition={isPending}
                    ifTrue={<Spinner size="small" />}
                    ifFalse={<ButtonText>Update Parking</ButtonText>}
                  />
                </Button>
              </HStack>
            </VStack>
          </ScrollView>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};
