import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { Swords, Star } from 'lucide-react';

export default function Home({ navigate }) {
    const { coins, unlockedCharacters, currentChapterId, isGameCleared } = useGameStore();

    const leaderId = unlockedCharacters[0];
    const leader = CHARACTERS[leaderId];

    return (
        <div className="flex flex-col items-center p-6 space-y-8 pt-12 pb-24 h-full bg-[url('/images/bg_home.png')] bg-cover bg-center">
            {/* Header */}
            <h1 className="text-xl font-black text-amber-800 tracking-wider text-center leading-relaxed">CUTIE WAR<br /><span className="text-sm">萌寵大戰甜點怪</span></h1>

            {/* Main Showcase */}
            <div className="relative w-64 h-64 bg-white rounded-none shadow-pixel border-4 border-black flex items-center justify-center">
                <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-48 h-48 object-contain pixel-art animate-bounce-hover"
                />
                <div className="absolute -bottom-5 bg-amber-100 px-4 py-2 border-4 border-black shadow-pixel">
                    <p className="text-xs font-bold text-amber-800">{leader.name}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
                <div className="bg-yellow-100 px-4 py-3 rounded-none border-4 border-black shadow-pixel flex items-center gap-2">
                    <span className="text-sm text-yellow-700">🪙 {coins}</span>
                </div>
                <div className="bg-blue-100 px-4 py-3 rounded-none border-4 border-black shadow-pixel flex items-center gap-2">
                    <Star size={16} className="text-blue-500 fill-current" />
                    <span className="text-sm text-blue-700">{unlockedCharacters.length}/{Object.keys(CHARACTERS).length}</span>
                </div>
            </div>

            {/* Big Adventure Button */}
            <button
                onClick={() => navigate('adventure')}
                className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-6 px-4 rounded-none border-4 border-black shadow-pixel active:shadow-none active:translate-y-1 active:translate-x-1 transition-all flex items-center justify-center gap-2"
            >
                <Swords size={24} />
                {isGameCleared ? "自由對戰 (Free)" : `第 ${currentChapterId} 章：冒險開始`}
            </button>

            {isGameCleared && (
                <p className="text-green-600 text-xs font-bold animate-pulse">🎉 遊戲通關！開啟自由模式</p>
            )}
        </div>
    );
}
