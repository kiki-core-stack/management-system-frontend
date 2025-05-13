interface ProfileState {
    id?: string;
}

export const useProfileState = () => useState<ProfileState>('profile', () => ({}));
