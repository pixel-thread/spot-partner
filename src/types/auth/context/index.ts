export type RoleT = 'PARTNER' | 'USER' | 'SUPER_ADMIN';
export type VehicleTypeT = 'TWO_WHEELER' | 'FOUR_WHEELER';
export type UserStatusT = 'ACTIVE' | 'INACTIVE';

type AuthT = {
  id: string;
  status: string;
  userId: string;
  email: string;
  phone: string;
};

export type UserT = {
  id: string;
  name: string;
  auth: AuthT;
  role: RoleT;
  lastLogin: string;
  isVerified: boolean;
  profilePic: string | null;
  vehicleType: VehicleTypeT;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: UserStatusT;
};

export interface AuthContextI {
  user: UserT | null;
  isAuthLoading: boolean;
  onLogout: () => void;
  refresh: () => void;
}
