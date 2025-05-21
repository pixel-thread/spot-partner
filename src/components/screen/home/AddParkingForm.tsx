import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@components/ui/actionsheet';
import { Button, ButtonText } from '@components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { z } from 'zod';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@components/ui/form-control';
import { Input, InputField } from '@components/ui/input';
import { VStack } from '@components/ui/vstack';
import { HStack } from '@components/ui/hstack';
import { ScrollView } from 'react-native';
import { Text } from '../../ui/text';
import { useMutation } from '@tanstack/react-query';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { Ternary } from '../../common/Ternary';
import { Spinner } from '../../ui/spinner';

type AddParkingFormProps = {
  open: boolean;
  onClose: () => void;
};

type ParkingFormData = z.infer<typeof parkingSchema>;

export const AddParkingForm = ({ open, onClose }: AddParkingFormProps) => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ParkingFormData>({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      price: '',
      pinCode: '',
      description: '',
      features: '',
      userId: user?.id, // You'll need to get this from your auth context
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ParkingFormData) =>
      http.post<ParkingFormData>(PARKING_ENDPOINT.POST_ADD_PARKING, data),
  });
  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: ParkingFormData) => mutate(data);

  return (
    <Actionsheet shouldRasterizeIOS isOpen={open} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="h-[90%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack space="lg" className="w-full p-4">
          <Text className="text-xl font-bold">Add New Parking Lot</Text>

          <ScrollView className="max-h-[500px] w-full">
            <VStack space="md" className="w-full">
              {/* Name field */}
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.name}>
                    <FormControlLabel>
                      <FormControlLabelText>Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter parking name"
                      />
                    </Input>
                    {errors.name && (
                      <FormControlError>
                        <FormControlErrorText>{errors.name.message}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />

              {/* Address field */}
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.address}>
                    <FormControlLabel>
                      <FormControlLabelText>Address</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter address"
                      />
                    </Input>
                    {errors.address && (
                      <FormControlError>
                        <FormControlErrorText>{errors.address.message}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />

              {/* City and Pin Code in HStack */}
              <HStack space="md" className="w-full">
                <VStack className="flex-1">
                  <Controller
                    control={control}
                    name="city"
                    render={({ field: { onChange, value } }) => (
                      <FormControl isInvalid={!!errors.city}>
                        <FormControlLabel>
                          <FormControlLabelText>City</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter city"
                          />
                        </Input>
                        {errors.city && (
                          <FormControlError>
                            <FormControlErrorText>{errors.city.message}</FormControlErrorText>
                          </FormControlError>
                        )}
                      </FormControl>
                    )}
                  />
                </VStack>
                <VStack className="flex-1">
                  <Controller
                    control={control}
                    name="pinCode"
                    render={({ field: { onChange, value } }) => (
                      <FormControl isInvalid={!!errors.pinCode}>
                        <FormControlLabel>
                          <FormControlLabelText>Pin Code</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter pin code"
                            keyboardType="numeric"
                          />
                        </Input>
                        {errors.pinCode && (
                          <FormControlError>
                            <FormControlErrorText>{errors.pinCode.message}</FormControlErrorText>
                          </FormControlError>
                        )}
                      </FormControl>
                    )}
                  />
                </VStack>
              </HStack>

              {/* Price and Open Hours in HStack */}
              <HStack space="md" className="w-full">
                <VStack className="flex-1">
                  <Controller
                    control={control}
                    name="price"
                    render={({ field: { onChange, value } }) => (
                      <FormControl isInvalid={!!errors.price}>
                        <FormControlLabel>
                          <FormControlLabelText>Price</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter price"
                            keyboardType="numeric"
                          />
                        </Input>
                        {errors.price && (
                          <FormControlError>
                            <FormControlErrorText>{errors.price.message}</FormControlErrorText>
                          </FormControlError>
                        )}
                      </FormControl>
                    )}
                  />
                </VStack>
                <VStack className="flex-1">
                  <Controller
                    control={control}
                    name="openHours"
                    render={({ field: { onChange, value } }) => (
                      <FormControl>
                        <FormControlLabel>
                          <FormControlLabelText>Open Hours</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                          <InputField
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter open hours"
                          />
                        </Input>
                      </FormControl>
                    )}
                  />
                </VStack>
              </HStack>

              {/* Description field */}
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.description}>
                    <FormControlLabel>
                      <FormControlLabelText>Description</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter description"
                        multiline
                        numberOfLines={3}
                        className="min-h-[80px] text-base"
                      />
                    </Input>
                    {errors.description && (
                      <FormControlError>
                        <FormControlErrorText>{errors.description.message}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />

              {/* Features field */}
              <Controller
                control={control}
                name="features"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.features}>
                    <FormControlLabel>
                      <FormControlLabelText ellipsizeMode="tail">Features</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter features (comma separated)"
                        multiline
                        numberOfLines={2}
                        className="min-h-[60px] text-base"
                      />
                    </Input>
                    {errors.features && (
                      <FormControlError>
                        <FormControlErrorText>{errors.features.message}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />

              {/* Action buttons */}
              <HStack space="md" className="mt-4 justify-center">
                <Button variant="outline" isDisabled={isPending} size="lg" onPress={handleClose}>
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button isDisabled={isPending} size="lg" onPress={handleSubmit(onSubmit)}>
                  <Ternary
                    condition={isPending}
                    ifTrue={<Spinner size="small" />}
                    ifFalse={<ButtonText>Create Parking</ButtonText>}
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
