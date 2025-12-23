import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Gacha from './pages/Gacha';
import About from './pages/About';
import Chat from './pages/Chat';
import Adventure from './pages/Adventure';
import clsx from 'clsx';

function App() {
    const [page, setPage] = useState('home');

    // 判斷是否為冒險模式 (用於切換背景底色，讓切換更自然)
    const isAdventure = page === 'adventure';

    return (
        // 外層容器：永遠佔滿螢幕 (w-screen, h-screen)
        <div className={clsx(
            "h-screen w-screen overflow-hidden text-gray-800 transition-colors duration-500",
            isAdventure ? "bg-black" : "bg-[#fdf6e3]"
        )}>
            {/* 內容區：
                ★ 移除了 max-w-md (手機寬度限制)
                ★ 設定為 w-full h-full (全螢幕)
                ★ 頁面內容會自動居中 (因為各頁面如 Home.jsx 都有 flex items-center)
            */}
            <main className="w-full h-full relative mx-auto transition-all duration-500 ease-in-out">
                {page === 'home' && <Home navigate={setPage} />}
                {page === 'team' && <Team />}
                {page === 'gacha' && <Gacha />}
                {page === 'about' && <About />}
                {page === 'chat' && <Chat />}
                {page === 'adventure' && <Adventure onBack={() => setPage('home')} />}
            </main>

            {/* 導覽列：使用 fixed bottom-0 強制固定在螢幕下方 */}
            {!isAdventure && (
                <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 pointer-events-none z-50">
                    <div className="pointer-events-auto shadow-2xl">
                        <Navbar currentParams={page} navigate={setPage} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
