import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { ArrowLeft, Send } from 'lucide-react';

export default function Chat() {
    const { unlockedCharacters, chatHistory, saveChat } = useGameStore();
    const [selectedCharId, setSelectedCharId] = useState(null);

    if (selectedCharId) {
        return <ChatRoom charId={selectedCharId} onBack={() => setSelectedCharId(null)} />;
    }

    return (
        <div className="p-6 pb-24 space-y-6">
            <h2 className="text-xl font-bold text-amber-800 border-b-4 border-black inline-block pb-2">聊天室</h2>
            <p className="text-xs text-gray-500">選擇一位夥伴開始聊天吧！</p>

            <div className="grid grid-cols-1 gap-4">
                {unlockedCharacters.map(id => {
                    const char = CHARACTERS[id];
                    const lastMsg = chatHistory[id]?.slice(-1)[0];

                    return (
                        <button
                            key={id}
                            onClick={() => setSelectedCharId(id)}
                            className="flex items-center gap-4 bg-white p-4 border-4 border-black shadow-pixel hover:translate-y-1 hover:shadow-none transition-all text-left"
                        >
                            <img src={char.image} className="w-16 h-16 object-contain pixel-art bg-amber-50 border-2 border-black" />
                            <div className="flex-1 w-full overflow-hidden">
                                <h3 className="font-bold text-gray-800 text-sm">{char.name}</h3>
                                <p className="text-[10px] text-gray-400 truncate mt-1 font-mono">
                                    {lastMsg ? `${lastMsg.role === 'user' ? '你' : char.name}: ${lastMsg.content}` : "點擊開始聊天..."}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

function ChatRoom({ charId, onBack }) {
    const { chatHistory, saveChat } = useGameStore();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    const char = CHARACTERS[charId];
    const history = chatHistory[charId] || [];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, loading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setLoading(true);

        // Save user message
        saveChat(charId, { role: 'user', content: userMsg });

        try {
            // Prepare payload
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "google/gemma-3n-e2b-it:free",
                    messages: [
                        { role: 'user', content: buildPrompt(char, userMsg, history) }
                    ]
                })
            });

            if (!response.ok) throw new Error("API Error");

            const data = await response.json();
            const reply = data.choices[0].message.content;

            saveChat(charId, { role: 'assistant', content: reply });
        } catch (err) {
            saveChat(charId, { role: 'assistant', content: "(嚼嚼)... 聽不清楚... (連線錯誤)" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#fdf6e3]">
            {/* Header */}
            <div className="bg-white p-6 border-b-4 border-black flex items-center gap-6 z-10 sticky top-0 shadow-sm shrink-0">
                <button onClick={onBack} className="p-2 border-2 border-black hover:bg-gray-100 active:translate-y-1"><ArrowLeft size={16} /></button>
                <div className="flex items-center gap-2">
                    <img src={char.image} className="w-8 h-8 pixel-art bg-amber-100 border border-black" />
                    <span className="font-bold text-gray-800 text-sm">{char.name}</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24" ref={scrollRef}>
                {history.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role !== 'user' && <img src={char.image} className="w-8 h-8 border border-black bg-amber-100 mr-2 self-end pixel-art" />}
                        <div className={`max-w-[85%] p-3 text-xs leading-relaxed border-2 border-black shadow-[2px_2px_0_0_#000] ${msg.role === 'user'
                            ? 'bg-green-400 text-black'
                            : 'bg-white text-gray-800'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <img src={char.image} className="w-8 h-8 border border-black bg-amber-100 mr-2 self-end pixel-art" />
                        <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0_0_#000] flex gap-1 h-10 items-center">
                            <div className="w-2 h-2 bg-black animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-2 h-2 bg-black animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-black animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-4 border-black">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder={`說點什麼...`}
                        className="flex-1 bg-gray-100 border-2 border-black px-4 py-3 focus:outline-none focus:bg-white transition-all text-xs font-mono"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="bg-amber-500 text-black border-2 border-black p-3 hover:bg-amber-400 disabled:opacity-50 transition-none active:translate-y-1 active:shadow-none shadow-[2px_2px_0_0_#000]"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

function buildPrompt(char, userMsg, history) {
    const SYSTEM_SAFETY_PROMPT = `
[Critical Safety Instruction]
You are a cute pet in a healing game.
STRICTLY FORBIDDEN TOPICS: Violence, Gore, Sexual content, Politics, Religion, Hate speech.
If the user mentions these, you MUST ignore your persona and refuse nicely.
Example refusal: “嗶...？那種事情太可怕了，我們聊點開心的吧！(發抖)"
`;
    // Take last 3 messages
    const context = history.slice(-3).map(m => `${m.role === 'user' ? 'Player' : 'You'}: ${m.content}`).join("\n");

    return `
${SYSTEM_SAFETY_PROMPT}

[Persona]
${char.aiPersona}

[Conversation History]
${context}

[Current Message]
User: ${userMsg}

[Instruction]
Respond in Traditional Chinese (Taiwan). Stay in character. 
Keep response short and cute.
`;
}
