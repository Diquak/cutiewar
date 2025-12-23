import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { Swords, Star } from 'lucide-react';
import Particles from '../components/Particles';

export default function Home({ navigate }) {
    const { coins, unlockedCharacters, currentChapterId, isGameCleared } = useGameStore();

    const leaderId = unlockedCharacters[0];
    const leader = CHARACTERS[leaderId];

    return (
        <div className="w-full h-full bg-[url('/images/bg_home.png')] bg-cover bg-center relative overflow-hidden flex items-center justify-center">
            {/* Background Particles */}
            <Particles />

            <div className="grid grid-cols-2 w-full max-w-6xl gap-12 items-center px-12 relative z-10 -mt-20">

                {/* Left Column: Character Showcase */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-96 h-96 bg-white rounded-none shadow-pixel border-8 border-black flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-72 h-72 object-contain pixel-art animate-bounce-hover"
                        />
                        <div className="absolute -bottom-8 bg-amber-100 px-8 py-3 border-4 border-black shadow-pixel">
                            <p className="text-xl font-bold text-amber-800 tracking-widest">{leader.name}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Title & Actions */}
                <div className="flex flex-col items-start space-y-12 pl-12">
                    {/* Title */}
                    <div>
                        <h1 className="text-7xl font-black text-amber-800 tracking-wider leading-tight drop-shadow-md">CUTIE WAR</h1>
                        <p className="text-3xl text-amber-900 font-bold mt-4 tracking-widest">萌寵大戰甜點怪</p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8">
                        <div className="bg-yellow-100 px-8 py-5 rounded-none border-4 border-black shadow-pixel flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                            <span className="text-3xl">🪙</span>
                            <span className="text-3xl font-bold text-yellow-800">{coins}</span>
                        </div>
                        <div className="bg-blue-100 px-8 py-5 rounded-none border-4 border-black shadow-pixel flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                            <Star size={32} className="text-blue-500 fill-current" />
                            <span className="text-3xl font-bold text-blue-800">{unlockedCharacters.length}/{Object.keys(CHARACTERS).length}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => navigate('adventure')}
                        className="w-full max-w-md bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-10 px-8 rounded-none btn-pixel flex items-center justify-center gap-6 group"
                    >
                        <Swords size={40} className="group-hover:rotate-12 transition-transform" />
                        {isGameCleared ? "自由對戰 (Free)" : `第 ${currentChapterId} 章：冒險開始`}
                    </button>

                    {isGameCleared && (
                        <p className="text-green-600 text-xl font-bold animate-pulse bg-white/90 px-6 py-3 border-4 border-black rounded-full shadow-pixel">
                            🎉 恭喜通關！開啟自由對戰模式
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
