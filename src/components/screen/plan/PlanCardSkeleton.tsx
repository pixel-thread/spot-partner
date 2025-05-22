import { View } from 'react-native';

import { cn } from '~/src/libs';

const SkeletonElement = ({ className }: { className?: string }) => (
  <View className={cn('h-4 rounded bg-gray-200 dark:bg-gray-700', className)} />
);

export const PlanCardSkeleton = () => {
  return (
    <View
      className={cn(
        'mx-auto w-full overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800'
      )}>
      <View className={cn('animate-pulse p-6')}>
        {/* Header */}
        <SkeletonElement className="mb-2 h-6 w-1/3" />
        <SkeletonElement className="h-4 w-3/4" />

        {/* Slots */}
        <View className={cn('mt-6')}>
          <SkeletonElement className="mb-2 h-4 w-1/5" />
          <View
            className={cn(
              'mt-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-700'
            )}>
            <View className={cn('h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-600')} />
            <SkeletonElement className="h-6 w-1/6" />
            <View className={cn('h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-600')} />
          </View>
        </View>

        {/* Pricing */}
        <View className={cn('mt-6 border-t border-gray-100 pt-4 dark:border-gray-700')}>
          <View className={cn('flex-row items-center')}>
            <SkeletonElement className="mr-2 h-4 w-1/4" />
            <SkeletonElement className="h-5 w-1/6 rounded px-2 py-1" />
          </View>
          <SkeletonElement className="mt-2 h-8 w-1/2" />
          <SkeletonElement className="mt-2 h-4 w-2/5" />
        </View>

        {/* Partner Benefits */}
        <View className={cn('mb-4 mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-700')}>
          <SkeletonElement className="mb-4 h-5 w-1/3" />
          <View className="gap-y-4">
            {[...Array(4)].map((_, index) => (
              <View key={index} className="flex-row">
                <View className="mr-3 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600" />
                <View className="flex-1">
                  <SkeletonElement className="mb-1 h-4 w-1/2" />
                  <SkeletonElement className="h-4 w-full" />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Button */}
        <SkeletonElement className="h-10 w-full rounded" />

        {/* Footer Text */}
        <SkeletonElement className="mx-auto mt-3 h-3 w-3/4" />
      </View>
    </View>
  );
};
