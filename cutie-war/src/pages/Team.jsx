import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { ArrowLeft } from 'lucide-react';

export default function Team({ onBack }) {
    const { unlockedCharacters } = useGameStore();

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center gap-4 shrink-0">
                <button onClick={onBack} className="p-2 border-2 border-black hover:bg-gray-100 active:translate-y-1">
                    <ArrowLeft size={16} />
                </button>
                <h2 className="text-lg font-bold text-amber-800">我的隊伍</h2>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 pt-0">
                {/* 固定 3 欄網格，不需響應式 */}
                <div className="grid grid-cols-3 gap-3">
                    {Object.values(CHARACTERS).map((char) => {
                        const isUnlocked = unlockedCharacters.includes(char.id);

                        return (
                            <div key={char.id} className={`p-3 border-4 border-black shadow-pixel transition-all hover:translate-y-1 hover:shadow-none ${isUnlocked ? 'bg-white' : 'bg-gray-200'}`}>
                                {isUnlocked ? (
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <img src={char.image} className="w-16 h-16 object-contain pixel-art bg-amber-50 border-2 border-black" />
                                        <div className="w-full">
                                            <h3 className="text-xs font-bold text-gray-800">{char.name}</h3>
                                            <p className="text-[9px] text-amber-700 font-bold bg-amber-100 inline-block px-1 border border-black mt-1">{char.role}</p>
                                            <div className="text-[9px] text-gray-600 mt-1 leading-tight">
                                                <p>HP:{char.stats.hp} ATK:{char.stats.atk}</p>
                                                <p>DEF:{char.stats.def} SPD:{char.stats.spd}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center gap-2 opacity-50 grayscale">
                                        <div className="w-16 h-16 bg-gray-300 border-2 border-black flex items-center justify-center text-xl">?</div>
                                        <div>
                                            <h3 className="text-xs font-bold text-gray-500">???</h3>
                                            <p className="text-[9px] text-gray-500">尚未解鎖</p>
                                        </div>
                                    </div>
                                )}
                                {isUnlocked && (
                                    <p className="text-[9px] text-gray-600 mt-2 pt-2 border-t border-dashed border-gray-300 leading-relaxed text-center line-clamp-2">
                                        {char.description}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
