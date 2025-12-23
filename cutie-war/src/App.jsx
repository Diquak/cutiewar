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
        <div className={clsx(
            // ★ 修改 1: 使用 h-[100dvh] 解決手機網址列擋住的問題
            // ★ 修改 2: 保持 overflow-hidden 鎖住外層，讓裡面自己滾動
            "h-[100dvh] w-screen overflow-hidden text-gray-800 transition-colors duration-500 relative",
            isAdventure ? "bg-black" : "bg-[#fdf6e3]"
        )}>
            {/* 內容區： */}
            <main className={clsx(
                // ★ 關鍵修正：加入 overflow-y-auto 讓這一區可以垂直捲動！
                // ★ pb-24 是為了避免內容被下方的導覽列擋住
                "w-full h-full relative mx-auto transition-all duration-500 ease-in-out overflow-x-hidden overflow-y-auto",
                !isAdventure && "pb-24" // 只有非冒險模式才需要底部留白
            )}>
                {page === 'home' && <Home navigate={setPage} />}
                {page === 'team' && <Team />}
                {page === 'gacha' && <Gacha />}
                {page === 'about' && <About />}
                {page === 'chat' && <Chat />}
                {page === 'adventure' && <Adventure onBack={() => setPage('home')} />}
            </main>

            {/* 導覽列：懸浮固定在最下方 */}
            {!isAdventure && (
                <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 pointer-events-none z-50">
                    {/* pointer-events-auto 確保按鈕可以被點擊 */}
                    <div className="pointer-events-auto shadow-2xl">
                        <Navbar currentParams={page} navigate={setPage} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
