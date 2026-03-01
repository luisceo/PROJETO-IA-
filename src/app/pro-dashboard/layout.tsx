"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Inbox,
    Calendar,
    FileText,
    Wallet,
    Star,
    UserCircle,
    HeadphonesIcon,
    Trophy,
    TrendingUp,
    LogOut,
    Menu,
    X,
    Zap
} from "lucide-react";

const sidebarLinks = [
    { name: "Visão Geral", icon: LayoutDashboard, href: "/pro-dashboard" },
    { name: "Solicitações", icon: Inbox, href: "/pro-dashboard/requests" },
    { name: "Agenda", icon: Calendar, href: "/pro-dashboard/schedule" },
    { name: "Orçamentos", icon: FileText, href: "/pro-dashboard/proposals" },
    { name: "Financeiro", icon: Wallet, href: "/pro-dashboard/finance" },
    { name: "Reputação", icon: Star, href: "/pro-dashboard/reviews" },
    { name: "Meu Perfil", icon: UserCircle, href: "/pro-dashboard/profile" },
    { name: "Analytics", icon: TrendingUp, href: "/pro-dashboard/analytics" },
    { name: "Ranking", icon: Trophy, href: "/pro-dashboard/ranking" },
    { name: "Suporte", icon: HeadphonesIcon, href: "/pro-dashboard/support" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex font-sans">

            {/* Mobile Header & Nav Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-50">
                <Link href="/" className="inline-flex items-center gap-2">
                    <Zap className="w-5 h-5 text-gold" fill="currentColor" />
                    <span className="font-heading font-semibold text-xl text-white">Lumina Pro</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-gold transition-colors">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <AnimatePresence>
                {(isMobileMenuOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className={`
              fixed lg:static top-0 left-0 bottom-0 z-40
              w-72 bg-surface border-r border-white/5 
              flex flex-col
              ${isMobileMenuOpen ? 'pt-20' : 'pt-0'} lg:pt-0
            `}
                    >
                        {/* Logo Area (Hidden on Mobile inside sidebar) */}
                        <div className="hidden lg:flex h-24 items-center px-8 border-b border-white/5">
                            <Link href="/" className="inline-flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-gold/50 transition-colors">
                                    <Zap className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" fill="currentColor" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-heading font-bold text-xl text-white tracking-tight leading-none">Lumina</span>
                                    <span className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">Pro Workspace</span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                            <nav className="space-y-1">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                        flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm
                        ${isActive
                                                    ? 'bg-gold/10 text-gold shadow-[inset_2px_0_0_0_#D4AF37]' // Lighter inner shadow for elegance
                                                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                                                }
                      `}
                                        >
                                            <link.icon className={`w-5 h-5 ${isActive ? 'text-gold' : ''}`} />
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* User Profile / Logout Area */}
                        <div className="p-4 border-t border-white/5 mt-auto">
                            <div className="bg-background rounded-2xl p-4 border border-white/5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-surface border border-white/10 overflow-hidden flex-shrink-0">
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-white truncate">Marcus Silva</h4>
                                    <p className="text-xs text-brand-light font-medium flex items-center gap-1">
                                        <Trophy className="w-3 h-3" /> Especialista Ouro
                                    </p>
                                </div>
                                <button className="p-2 text-white/40 hover:text-white transition-colors bg-white/5 rounded-lg hover:bg-white/10">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen relative max-w-full overflow-hidden">
                {/* Subtle Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

                <div className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-24 lg:pb-12 px-6 lg:px-12">
                    {children}
                </div>
            </main>

        </div>
    );
}
