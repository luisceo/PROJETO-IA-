"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Search,
    MapPin,
    Star,
    ShieldCheck,
    ChevronDown,
    Filter,
    Zap,
    ArrowRight,
    CheckCircle2,
    Clock,
    TrendingUp,
    X,
    Lock
} from "lucide-react";
import { processConciergeRequest } from "@/app/actions/gemini";

// Mock Data
const SUGGESTIONS = ["Marcenaria", "Elétrica", "Construção", "Pintura", "Gesso", "Automação"];

// Mock Data - Updated for visual cards
const PROFILES = [
    {
        id: 1,
        name: "Casa & Arte Design",
        specialty: "Design de Interiores",
        rating: 5.0,
        location: "São Paulo",
        projects: 28,
        verified: true,
        premium: true,
        cover: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        name: "Studio Marcenaria Premium",
        specialty: "Móveis Planejados",
        rating: 4.9,
        location: "São Paulo",
        projects: 87,
        verified: true,
        premium: true,
        cover: "https://images.unsplash.com/photo-1581141849206-ce6ec9d273ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        name: "Arquitetura Viva",
        specialty: "Reforma",
        rating: 4.8,
        location: "Rio de Janeiro",
        projects: 42,
        verified: true,
        premium: true,
        cover: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        name: "Atelier de Interiores",
        specialty: "Design de Interiores",
        rating: 4.7,
        location: "São Paulo",
        projects: 156,
        verified: true,
        premium: false,
        cover: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 5,
        name: "Renov Premium Services",
        specialty: "Reparos Premium",
        rating: 4.8,
        location: "Belo Horizonte",
        projects: 320,
        verified: true,
        premium: false,
        cover: "https://images.unsplash.com/photo-1541889814407-160de63b9ef6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 6,
        name: "MasterPlan Móveis",
        specialty: "Móveis Planejados",
        rating: 4.5,
        location: "Curitiba",
        projects: 210,
        verified: true,
        premium: false,
        cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
];

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");

    // AI Modal State
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ role: 'ai' | 'user', text: string }[]>([
        { role: 'ai', text: 'Olá! Sou a inteligência artificial do Lumina. Me conte os detalhes do projeto que você tem em mente e eu encontrarei os especialistas perfeitos para você.' }
    ]);
    const [filteredProfiles, setFilteredProfiles] = useState(PROFILES);
    const [detectedSpecialty, setDetectedSpecialty] = useState<string | null>(null);

    // Legacy search states
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);

    const handleSuggestionClick = (sug: string) => {
        setSearchQuery(sug);
        setIsSearchFocused(false);
        setChatInput(sug);
        setIsAiModalOpen(true);
    };

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
        setChatInput("");
        setIsAiTyping(true);

        // Dispara a requisição real para o Gemini
        const result = await processConciergeRequest(userMsg);

        setIsAiTyping(false);

        if (result.success && result.data) {
            const aiMsg = result.data.message;
            const targetSpecialty = result.data.specialty;

            setChatHistory(prev => [...prev, { role: 'ai', text: aiMsg }]);

            // Filtro os perfis no background para mostrar quando o modal fechar
            const matches = PROFILES.filter(p =>
                p.specialty.toLowerCase().includes(targetSpecialty.toLowerCase())
                || targetSpecialty.toLowerCase().includes("geral")
                || targetSpecialty.toLowerCase().includes(p.specialty.toLowerCase().split(' ')[0])
            );

            setTimeout(() => {
                setIsAiModalOpen(false);
                setDetectedSpecialty(targetSpecialty);
                setFilteredProfiles(matches.length > 0 ? matches : PROFILES);
                setAiResponse(`Filtro automático para especialidade "${targetSpecialty}" baseado no seu pedido.`);
            }, 3500); // Dá um tempo para o usuário ler a mensagem no chat antes de fechar a tela.

        } else {
            console.error(result.error);
            setChatHistory(prev => [...prev, { role: 'ai', text: "Desculpe, tive um problema de comunicação. Pode tentar refazer o pedido com outras palavras?" }]);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-24 relative selection:bg-gold/30">

            {/* 1) MINIMALIST HEADER */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 transition-all">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">

                    <div className="hidden md:flex items-center gap-6 flex-shrink-0 ml-auto">
                        <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">Meus Pedidos</button>
                        <div className="w-9 h-9 rounded-full bg-surface border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-colors">
                            <img src="https://i.pravatar.cc/150?u=client1" alt="Você" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 pt-8">

                {/* HERO AI SEARCH SECTION */}
                <section className="mb-12 max-w-3xl mx-auto text-center">
                    <h1 className="font-heading text-4xl md:text-5xl text-white mb-6">
                        Descreva seu <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand">projeto.</span>
                    </h1>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        A Inteligência Artificial do Lumina encontrará o especialista perfeito para o seu nível de exigência.
                    </p>

                    {/* Prominent Blue AI Search Bar with Continuous Glow */}
                    <div className="relative w-full">
                        <motion.div
                            animate={isSearchFocused ? {} : {
                                boxShadow: [
                                    "0 0 0px rgba(10,47,182,0)",
                                    "0 0 30px rgba(10,47,182,0.4)",
                                    "0 0 0px rgba(10,47,182,0)"
                                ]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="rounded-2xl"
                        >
                            <div
                                onClick={() => setIsAiModalOpen(true)}
                                className={`relative flex items-center bg-brand-dark/20 border-2 transition-all rounded-2xl overflow-hidden shadow-2xl cursor-text ${isSearchFocused ? 'border-brand shadow-[0_0_40px_rgba(10,47,182,0.5)] bg-brand-dark/40' : 'border-brand/40 hover:border-brand'}`}
                            >
                                <div className="pl-6 pr-4 py-5 text-brand-light">
                                    <Zap className="w-6 h-6 fill-brand-light" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    placeholder="Deixe nossa IA encontrar o profissional ideal..."
                                    className="flex-1 bg-transparent border-none text-white focus:outline-none py-5 text-lg w-full placeholder:text-white/40 font-light pointer-events-none"
                                    readOnly
                                />
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsAiModalOpen(true); }}
                                    className="pr-6 pl-4 text-white hover:text-brand-light transition-colors flex items-center gap-2 font-bold"
                                >
                                    <span className="hidden sm:inline-block">Conversar</span>
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-3 bg-surface border border-brand/20 rounded-2xl p-5 shadow-2xl z-50 text-left"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-light/70 mb-4 px-2">Sugestões de Alto Padrão</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SUGGESTIONS.map(sug => (
                                            <button
                                                key={sug}
                                                onClick={() => handleSuggestionClick(sug)}
                                                className="px-4 py-2.5 bg-brand/5 hover:bg-brand/20 border border-brand/10 hover:border-brand/40 rounded-xl text-sm text-white/80 transition-colors"
                                            >
                                                {sug}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Horizontal Clean Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
                    <div className="flex flex-wrap items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                            <MapPin className="w-3 h-3 text-brand-light" /> Até 10km <ChevronDown className="w-3 h-3 opacity-50" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                            <Star className="w-3 h-3 text-gold" /> 4.5+ <ChevronDown className="w-3 h-3 opacity-50" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                            <Filter className="w-3 h-3" /> Mais Filtros
                        </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-white/40">
                        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-brand-light" /> Verificados</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-green-400" /> Seguro</span>
                    </div>
                </div>

                {/* Page Title & Sort */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="font-heading text-4xl text-white">Profissionais em <span className="font-bold">destaque</span></h1>
                    <button className="text-sm font-medium text-brand-light hover:text-gold transition-colors inline-flex items-center gap-1">
                        Ver todos <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                <AnimatePresence>
                    {aiResponse && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-12 max-w-3xl mx-auto"
                        >
                            <div className="bg-brand-dark border-2 border-brand/40 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(10,47,182,0.2)]">
                                <div className="absolute top-0 left-0 w-2 h-full bg-brand-light"></div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-1 border border-brand-light/20">
                                        <Zap className="w-6 h-6 text-brand-light fill-brand-light" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-xl">
                                            Filtro Aplicado via IA <CheckCircle2 className="w-5 h-5 text-brand-light" />
                                        </h3>
                                        <p className="text-white/80 leading-relaxed text-base">{aiResponse}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Page Title & Sort for Results */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading text-3xl text-white">
                        {detectedSpecialty && !detectedSpecialty.toLowerCase().includes("geral") ? `Especialistas em ${detectedSpecialty}` : "Especialistas disponíveis"} <span className="text-white/30 text-base font-sans ml-2">{filteredProfiles.length} encontrados</span>
                    </h2>
                    <button className="text-sm font-medium text-brand-light hover:text-white transition-colors inline-flex items-center gap-1">
                        Ver todos <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                {/* 3) FROSTED GLASS CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfiles.map(pro => (
                        <motion.div
                            key={pro.id}
                            whileHover={{ y: -4 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-white/40 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all flex flex-col"
                        >

                            {/* Cover Image & Badges */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={pro.cover}
                                    alt={pro.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Badges Layout matching screenshot */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    {pro.premium && (
                                        <div className="bg-black/70 backdrop-blur-md text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                                            Premium
                                        </div>
                                    )}
                                </div>

                                {pro.verified && (
                                    <div className="absolute top-3 right-3 bg-white/95 text-black text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                        <ShieldCheck className="w-3 h-3 text-black" /> Verificado
                                    </div>
                                )}
                            </div>

                            {/* Card Content (Frosted Glass) */}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h3 className="font-bold text-white text-lg leading-tight">{pro.name}</h3>
                                    <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md border border-white/10 flex-shrink-0">
                                        <Star className="w-3 h-3 text-gold fill-gold" />
                                        <span className="text-xs font-bold text-white">{pro.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-white/60 mb-4">{pro.specialty}</p>

                                <div className="flex items-center gap-4 mt-auto pt-3 border-t border-white/10">
                                    <div className="flex items-center gap-1 text-[11px] text-white/50 font-medium tracking-wide w-full truncate">
                                        <MapPin className="w-3 h-3" /> {pro.location}
                                        <span className="w-0.5 h-0.5 rounded-full bg-white/20 mx-1" />
                                        {pro.projects} projetos
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </main>

            {/* FULL SCREEN AI CHAT MODAL */}
            <AnimatePresence>
                {isAiModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex justify-center items-end sm:items-center sm:p-6"
                    >
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full sm:max-w-2xl bg-surface border border-brand/30 sm:rounded-3xl rounded-t-3xl h-[85vh] sm:h-[70vh] flex flex-col shadow-2xl overflow-hidden shadow-[0_0_50px_rgba(10,47,182,0.15)] relative"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-brand/20 bg-brand-dark/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand/30 flex items-center justify-center border border-brand-light/20">
                                        <Zap className="w-5 h-5 text-brand-light fill-brand-light" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold tracking-wide">Concierge Lumina</h3>
                                        <p className="text-brand-light/70 text-xs">Sua IA Pessoal Avançada</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsAiModalOpen(false)}
                                    className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Chat History Area */}
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scroll">
                                {chatHistory.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'ai' ? 'bg-brand/20 border border-brand/30 text-brand-light' : 'bg-white/10 text-white'}`}>
                                            {msg.role === 'ai' ? <Zap className="w-4 h-4 fill-brand-light" /> : <img src="https://i.pravatar.cc/150?u=client1" className="w-full h-full object-cover rounded-full" alt="User" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl ${msg.role === 'ai' ? 'bg-brand-dark border border-brand/20 text-white/90 rounded-tl-none' : 'bg-white text-background rounded-tr-none'}`}>
                                            <p className="leading-relaxed text-sm md:text-base">{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {isAiTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-4 max-w-[85%]"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 text-brand-light flex items-center justify-center flex-shrink-0">
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                                <Zap className="w-4 h-4 fill-brand-light" />
                                            </motion.div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-brand-dark/50 border border-brand/20 rounded-tl-none flex items-center gap-2 text-brand-light/70 text-sm">
                                            Analizando seu pedido...
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Form */}
                            <div className="p-4 border-t border-brand/20 bg-background/50 backdrop-blur-md">
                                <form onSubmit={handleChatSubmit} className="relative flex items-center bg-surface border border-white/10 rounded-full focus-within:border-brand/40 focus-within:shadow-[0_0_20px_rgba(10,47,182,0.2)] transition-all">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Digite sua resposta aqui..."
                                        className="flex-1 bg-transparent border-none text-white focus:outline-none py-4 pl-6 text-sm placeholder:text-white/30"
                                        disabled={isAiTyping}
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        disabled={!chatInput.trim() || isAiTyping}
                                        className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white mr-2 hover:bg-brand-light hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
