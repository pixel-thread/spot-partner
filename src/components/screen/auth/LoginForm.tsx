import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, ButtonText } from '@components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from '@components/ui/form-control';
import { Input, InputField } from '@components/ui/input';
import { VStack } from '@components/ui/vstack';
import { AlertCircleIcon } from '@components/ui/icon';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '~/src/utils/validation/auth';
import { useMutation } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import { UserT } from '~/src/types/auth/context';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { Ternary } from '../../common/Ternary';
import { saveToken } from '~/src/utils/storage/token';
export type LoginFormData = {
  phone: string;
  otp?: string;
};

export const LoginForm = () => {
  const { isAuthLoading, refresh } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: onInit, isPending: isInitializing } = useMutation({
    mutationFn: (data: LoginFormData) => http.post<UserT>(AUTH_ENDPOINT.POST_LOGIN_INIT, data),
    onSuccess: (data) => {
      if (data.success) {
        setIsLogin(true);
      }
      return data;
    },
  });

  const { mutate: onLogin, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginFormData) => http.post<UserT>(AUTH_ENDPOINT.POST_LOGIN, data),
    onSuccess: async (data) => {
      if (data.success) {
        if (data.token) {
          await saveToken(data.token);
          refresh();
        }
        setIsLogin(false);
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (isLogin) {
      onLogin(data);
    }
    onInit(data);
  };
  const isLoading = isInitializing || isLoginPending || isAuthLoading;
  return (
    <VStack space="lg" className="w-full">
      {/* Email Field */}
      <FormControl
        isDisabled={isInitializing || isLoginPending || isAuthLoading}
        isInvalid={!!errors.phone}>
        <FormControlLabel>
          <FormControlLabelText>Phone</FormControlLabelText>
        </FormControlLabel>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Input>
              <InputField
                {...field}
                value={value}
                onChangeText={onChange}
                placeholder="Enter your Phone number"
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            </Input>
          )}
        />
        {errors.phone && (
          <FormControlError>
            <FormControlErrorText>{errors.phone.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Password Field */}
      <Ternary
        condition={isLogin}
        ifFalse={null}
        ifTrue={
          <FormControl
            isDisabled={isInitializing || isLoginPending || isAuthLoading}
            isInvalid={!!errors.otp}>
            <FormControlLabel>
              <FormControlLabelText>OTP</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="otp"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Input>
                  <InputField
                    {...field}
                    maxLength={6}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter your otp"
                  />
                </Input>
              )}
            />
            {errors.otp ? (
              <FormControlError>
                <FormControlErrorText>{errors.otp.message}</FormControlErrorText>
              </FormControlError>
            ) : (
              <FormControlHelper>
                <FormControlHelperText>Must be at least 6 characters.</FormControlHelperText>
              </FormControlHelper>
            )}
          </FormControl>
        }
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isInitializing || isLoginPending || isAuthLoading}
        variant="outline">
        <ButtonText>{isLoading ? 'Loading...' : isLogin ? 'Login' : 'Continue'}</ButtonText>
      </Button>
    </VStack>
  );
};
