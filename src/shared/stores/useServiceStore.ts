import { create } from 'zustand';

type SubscribableServiceType = 'academic' | 'doodream';

interface ServiceSelectionState {
    selectedServices: Set<SubscribableServiceType>;

    toggleServiceSelection: (service: SubscribableServiceType) => void;
    resetServiceSelection: () => void;
    isServiceSelected: (service: SubscribableServiceType) => boolean;
    canProceedToNextStep: () => boolean;
}

const INITIAL_SELECTED_SERVICES = new Set<SubscribableServiceType>([
    'academic',
    'doodream',
]);

export const useServiceStore = create<ServiceSelectionState>((set, get) => ({
    selectedServices: new Set(INITIAL_SELECTED_SERVICES),

    toggleServiceSelection: (service) =>
        set((state) => {
            const updatedServices = new Set(state.selectedServices);
            if (updatedServices.has(service)) {
                updatedServices.delete(service);
            } else {
                updatedServices.add(service);
            }
            return { selectedServices: updatedServices };
            //토글구현
        }),

    resetServiceSelection: () =>
        set({ selectedServices: new Set(INITIAL_SELECTED_SERVICES) }),

    isServiceSelected: (service) => get().selectedServices.has(service),

    canProceedToNextStep: () => get().selectedServices.size > 0,
}));
