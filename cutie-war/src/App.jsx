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

    // 判斷是否為冒險模式
    const isAdventure = page === 'adventure';

    return (
        // 外層容器：鎖定視窗高度為 100dvh (解決手機網址列問題)
        <div className={clsx(
            "h-[100dvh] w-screen overflow-hidden text-gray-800 transition-colors duration-500 relative flex flex-col",
            isAdventure ? "bg-black" : "bg-[#fdf6e3]"
        )}>

            {/* 內容區：設定為 flex-1 讓它佔滿剩餘空間，並允許 overflow-y-auto (內部滾動) */}
            <main className={clsx(
                "flex-1 w-full overflow-x-hidden overflow-y-auto relative transition-all duration-500",
                // 如果有導覽列，底部要留白 (pb-24)，不然最後的內容會被擋住
                !isAdventure ? "pb-24" : "pb-0"
            )}>
                <div className="max-w-md mx-auto min-h-full">
                    {page === 'home' && <Home navigate={setPage} />}
                    {page === 'team' && <Team />}
                    {page === 'gacha' && <Gacha />}
                    {page === 'about' && <About />}
                    {page === 'chat' && <Chat />}
                    {page === 'adventure' && <Adventure onBack={() => setPage('home')} />}
                </div>
            </main>

            {/* 導覽列：固定在最下方 (Fixed) */}
            {!isAdventure && (
                <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none flex justify-center pb-6">
                    {/* 這裡加 pointer-events-auto 讓按鈕可以點，但旁邊透明處可以穿透 */}
                    <div className="pointer-events-auto">
                        <Navbar currentParams={page} navigate={setPage} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
