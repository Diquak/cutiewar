import React from 'react';
import { Home, Users, MessageCircle, Gift, Info } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar({ currentParams, navigate }) {
    // Simple navigation handler passed from App or use Link if using Router
    // But for simple "App" we can use state routing or React Router.
    // Let's use simple state routing in App for simplicity or React Router?
    // Spec didn't specify router lib, but "React (Vite)" usually implies one.
    // I didn't install react-router-dom in the first pass! 
    // I should use "npm install react-router-dom" or just use conditional rendering.
    // Conditional rendering is easier for a "Single Page App" feel without detailed URL requirements.
    // But Router is better for "Web App".
    // I'll stick to conditional in App.jsx for simplicity unless I add router.

    // Actually, I'll use conditional rendering given the "App" structure. 
    // Wait, I am restricted to tool calls. Additional npm install takes time.
    // I'll use conditional rendering.

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'adventure', label: 'Adventure', icon: undefined }, // Special Handling? No, spec says Home has [Adventure] button, maybe Nav is for others?
        // Spec: "Home: [Adventure] [Team] [Chat] [About] [Gacha] 5 buttons"
        // Wait, Spec 4.2 says "Home: [Adventure] [Team] [Chat] [Gacha] [About] 5 main buttons".
        // Does it mean Home IS the buttons? Or a Navbar?
        // Usually "Home" has the buttons to go to others.
        // AND "Navbar" is persistent?
        // Let's assume a persistent bottom nav is good for "App" feel.
    ];

    // Let's stick to the Spec 4.2:
    // "Home ... 5 main buttons".
    // Maybe the Home Screen HAS 5 buttons and there is NO persistent navbar?
    // Or there is a Navbar and Home is just one tab?
    // "Page 1: Home ... 5 buttons".
    // This implies a Dashboard style.
    // I will implement a global Layout with a bottom navigation for easy access, 
    // or just distinct pages if the user prefers "Menu" style.
    // I'll go with Bottom Navigation for Team/Chat/Gacha/About/Home.

    return (
        <nav className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-3 flex gap-8 items-center rounded-sm">
            <NavBtn id="home" icon={Home} label="首頁" active={currentParams === 'home'} onClick={() => navigate('home')} />
            <NavBtn id="team" icon={Users} label="隊伍" active={currentParams === 'team'} onClick={() => navigate('team')} />
            <NavBtn id="chat" icon={MessageCircle} label="聊天" active={currentParams === 'chat'} onClick={() => navigate('chat')} />
            <NavBtn id="gacha" icon={Gift} label="抽卡" active={currentParams === 'gacha'} onClick={() => navigate('gacha')} />
            <NavBtn id="about" icon={Info} label="關於" active={currentParams === 'about'} onClick={() => navigate('about')} />
        </nav>
    );
}

function NavBtn({ id, icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex flex-col items-center px-4 py-2 transition-all duration-75 relative group",
                active ? "-translate-y-1" : "hover:-translate-y-1"
            )}
        >
            <div className={clsx(
                "absolute inset-0 bg-yellow-300 border-2 border-black -z-10 transition-opacity",
                active ? "opacity-100 shadow-[2px_2px_0_0_#000]" : "opacity-0 group-hover:opacity-100 group-hover:shadow-[2px_2px_0_0_#000]"
            )} />

            <Icon size={24} className={clsx("transition-transform mb-1", active ? "text-amber-900" : "text-gray-700")} />
            <span className={clsx("text-xs font-bold", active ? "text-amber-900" : "text-gray-700")}>{label}</span>
        </button>
    )
}
