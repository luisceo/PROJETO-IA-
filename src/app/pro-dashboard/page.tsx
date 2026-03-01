"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Wallet,
    CheckCircle2,
    Clock,
    Star,
    ArrowRight,
    MoreVertical,
    MapPin,
    Calendar
} from "lucide-react";
import Link from "next/link";

export default function ProDashboardOverview() {
    return (
        <div className="max-w-6xl mx-auto pt-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-white/40 text-sm font-medium mb-1 tracking-wider uppercase">Painel de Controle</p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Bom dia, Marcus.
                    </h1>
                    <p className="text-white/60 mt-2 font-light">
                        Você tem <strong className="text-white font-medium">3 novas solicitações</strong> aguardando análise hoje.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Link href="/pro-dashboard/requests" className="hidden md:inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-light transition-all shadow-[0_0_20px_rgba(10,47,182,0.3)]">
                        Ver Solicitações <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>

            {/* Real-time Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { label: "Ganhos do Mês", value: "R$ 14.850", trend: "+12.5%", trendUp: true, icon: Wallet, color: "text-brand-light", bg: "bg-brand/10" },
                    { label: "Serviços Ativos", value: "5", trend: "2 próximos", trendUp: true, icon: Clock, color: "text-white", bg: "bg-white/10" },
                    { label: "Aprovação de Orçamento", value: "68%", trend: "+5.2%", trendUp: true, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
                    { label: "Avaliação Média", value: "4.9", trend: "Top 5% Região", trendUp: true, icon: Star, color: "text-gold", bg: "bg-gold/10" },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                        {/* Subtle highlight effect on hover */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -mr-10 -mt-10 group-hover:bg-white/10 transition-colors" />

                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                            <stat.icon className="w-6 h-6" />
                        </div>

                        <p className="text-white/40 text-sm font-medium mb-1">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-heading font-bold text-white">{stat.value}</h3>
                            <div className={`text-xs font-medium flex items-center gap-1 ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.trendUp && <TrendingUp className="w-3 h-3" />} {stat.trend}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Two Column Layout for the rest */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Próximos Atendimentos (Agenda) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 space-y-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-heading font-bold text-white">Próximos Atendimentos</h3>
                        <Link href="/pro-dashboard/schedule" className="text-sm text-brand-light hover:text-white transition-colors">
                            Ver Agenda Completa
                        </Link>
                    </div>

                    {[
                        { client: "Dr. Henrique Faria", service: "Projeto Luminotécnico Área Externa", date: "Hoje, 14:00", address: "Jardins, SP (4km)", status: "Confirmado", amount: "R$ 4.500" },
                        { client: "Mariana Costa", service: "Instalação Elétrica - Cozinha", date: "Amanhã, 09:30", address: "Itaim Bibi, SP (8km)", status: "Confirmado", amount: "R$ 1.200" },
                        { client: "Condomínio Reserva", service: "Manutenção Preventiva - Quadra", date: "Sex, 24 Nov", address: "Morumbi, SP (12km)", status: "Pendente", amount: "R$ 2.800" },
                    ].map((item, i) => (
                        <div key={i} className="bg-surface border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gold/30 transition-colors cursor-default">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <span className="font-heading font-bold text-white/50">{item.client.charAt(0)}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-base">{item.service}</h4>
                                    <p className="text-sm text-white/50 mb-2">{item.client}</p>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 font-medium">
                                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md"><Calendar className="w-3 h-3 text-gold" /> {item.date}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-light" /> {item.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t border-white/5 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0 gap-2">
                                <span className="font-bold text-white">{item.amount}</span>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${item.status === 'Confirmado' ? 'bg-green-400/10 text-green-400' : 'bg-gold/10 text-gold'}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Insight & Dicas (Impacto no Ranking) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="space-y-6"
                >
                    {/* AI Insight Widget */}
                    <div className="bg-gradient-to-br from-brand-dark/50 to-background border border-brand/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingUp className="w-24 h-24" />
                        </div>
                        <div className="relative border border-brand/30 bg-brand/10 w-fit px-3 py-1 rounded-full text-xs text-brand-light font-bold uppercase tracking-widest mb-4">
                            Lumina Insight
                        </div>
                        <h4 className="font-heading font-bold text-lg text-white mb-2">Potencialize seus ganhos</h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                            Profissionais de <strong className="text-white">Elétrica e Automação</strong> que incluem fotos antes/depois no portfólio fecham **34% mais orçamentos** fechados na sua região.
                        </p>
                        <button className="text-sm font-bold text-white hover:text-gold transition-colors inline-flex items-center gap-2">
                            Atualizar Portfólio <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-surface border border-white/5 rounded-2xl p-6">
                        <h3 className="font-heading font-bold text-white mb-4 flex items-center justify-between">
                            Ações Rápidas
                            <button className="text-white/40 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-white transition-colors flex items-center justify-between group">
                                Criar Novo Orçamento
                                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-white transition-colors flex items-center justify-between group">
                                Solicitar Saque (Resgate)
                                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-white transition-colors flex items-center justify-between group">
                                Bloquear Período na Agenda
                                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>

        </div>
    );
}
