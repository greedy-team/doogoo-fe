import { create } from 'zustand';
/*
* 구독모달을 store로 분리한 이유:프론트 디자인이 자꾸 바뀌어서 분리했어요
*/
interface GlobalUIState {
    isSubscriptionModalOpen: boolean;
    openSubscriptionModal: () => void;
    closeSubscriptionModal: () => void;
}

export const useUIStore = create<GlobalUIState>((set) => ({
    isSubscriptionModalOpen: false,

    openSubscriptionModal: () => set({ isSubscriptionModalOpen: true }),

    closeSubscriptionModal: () => set({ isSubscriptionModalOpen: false }),
}));

