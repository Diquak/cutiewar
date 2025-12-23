import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';

export default function Team() {
    const { unlockedCharacters } = useGameStore();

    return (
        <div className="p-6 space-y-6 w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-amber-800 border-b-4 border-black inline-block pb-2">我的隊伍</h2>

            {/* ★ 修正：原本這裡寫錯成 md://grid-cols-2，已修正為 md:grid-cols-2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(CHARACTERS).map((char) => {
                    const isUnlocked = unlockedCharacters.includes(char.id);

                    return (
                        <div key={char.id} className={`p-4 border-4 border-black shadow-pixel transition-all hover:translate-y-1 hover:shadow-none ${isUnlocked ? 'bg-white' : 'bg-gray-200'}`}>
                            {isUnlocked ? (
                                <div className="flex gap-4 items-start">
                                    <img src={char.image} className="w-20 h-20 object-contain pixel-art bg-amber-50 border-2 border-black" />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-800 mb-1">{char.name}</h3>
                                        <p className="text-[10px] text-amber-700 font-bold mb-2 bg-amber-100 inline-block px-1 border border-black">{char.role}</p>
                                        <div className="text-[10px] text-gray-600 space-y-1 leading-tight">
                                            <p>HP:{char.stats.hp} ATK:{char.stats.atk}</p>
                                            <p>DEF:{char.stats.def} SPD:{char.stats.spd}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-4 items-center h-full opacity-50 grayscale">
                                    <div className="w-20 h-20 bg-gray-300 border-2 border-black flex items-center justify-center text-xl">?</div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500">???</h3>
                                        <p className="text-[10px] text-gray-500">尚未解鎖</p>
                                    </div>
                                </div>
                            )}
                            {isUnlocked && (
                                <p className="text-[10px] text-gray-600 mt-3 pt-2 border-t-2 border-dashed border-gray-300 leading-relaxed">
                                    {char.description}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
