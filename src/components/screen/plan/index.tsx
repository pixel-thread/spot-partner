import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView } from 'react-native';

import PlanCard from './PlanCard';

import { useLocalSearchParams } from 'expo-router';
import { Text } from '../../ui/text';

export const Pricing = () => {
  const { parking } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Header with improved messaging */}
          <View className="mb-6">
            <Text size="4xl" className="text-center text-2xl">
              Become a Partner
            </Text>
            <Text size="md" className="mt-2 text-center text-gray-600">
              Purchase at least one slot to join our network and start earning
            </Text>
          </View>

          {/* Hero banner */}
          <View className="mb-6 overflow-hidden rounded-xl bg-blue-600">
            <View className="p-5">
              <Text size="4xl" className="text-xl text-white">
                Turn Your Space Into Income
              </Text>
              <Text size="md" className="mt-1 text-blue-100">
                Join thousands of partners earning passive income
              </Text>
              <View className="mt-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text className="ml-2 text-white">Start with just 1 slot</Text>
              </View>
            </View>
          </View>
          {/* Plan Card with emphasis */}
          <View className="mb-6">
            <PlanCard parkingId={parking as string} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Pricing;
