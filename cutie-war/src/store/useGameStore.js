import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CHARACTERS } from '../data/characters';

export const useGameStore = create(
    persist(
        (set, get) => ({
            // === State ===
            unlockedCharacters: ['buibui'], // Override: Only buibui initially
            coins: 0,
            currentChapterId: 1,
            isGameCleared: false,
            chatHistory: {}, // { charId: [] }

            // === Actions ===
            unlockCharacter: (id) => set((state) => {
                if (!state.unlockedCharacters.includes(id)) {
                    return { unlockedCharacters: [...state.unlockedCharacters, id] };
                }
                // If duplicate (gacha logic), maybe add stats? 
                // Spec says: "Power Up (Plus stats)". 
                // Simplified: Add coins or just ignore for now as simplified gacha.
                // Let's add 100 coins for dupes
                return { coins: state.coins + 100 };
            }),

            addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

            advanceChapter: () => set((state) => {
                const next = state.currentChapterId + 1;
                // Override: Post-Game
                if (next > 3) {
                    return { isGameCleared: true }; // Stay on 3 or go to "Free Mode"? 
                    // "Implement logic so that after Chapter 3, isGameCleared becomes true"
                }
                return { currentChapterId: next };
            }),

            saveChat: (charId, msgObj) => set((state) => ({
                chatHistory: {
                    ...state.chatHistory,
                    [charId]: [...(state.chatHistory[charId] || []), msgObj]
                }
            })),

            // Admin/Debug
            resetProgress: () => set({
                unlockedCharacters: ['buibui'],
                coins: 0,
                currentChapterId: 1,
                isGameCleared: false,
                chatHistory: {}
            }),

            importSave: (json) => set(json), // Replace state
        }),
        {
            name: 'cutie-war-storage', // local storage key
        }
    )
);
