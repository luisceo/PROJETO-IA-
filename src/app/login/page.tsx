"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Mail, Lock, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Step = "login_form" | "success";

export default function LoginPage() {
    const [step, setStep] = useState<Step>("login_form");
    const [email, setEmail] = useState("");
    const [isProfessional, setIsProfessional] = useState(false); // Simulated logic based on email

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Determina se é profissional para redirecionamento correto
        if (email.includes("pro") || email.includes("especialista")) {
            setIsProfessional(true);
        } else {
            setIsProfessional(false);
        }

        setStep("success");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex font-sans overflow-hidden w-full">

            {/* Left Side - Abstract Premium Graphic (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-1 relative bg-surface items-center justify-center p-12 lg:px-16 border-r border-white/5 overflow-hidden">
                {/* Glowing Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/15 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/15 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                <div className="relative z-10 max-w-lg w-full text-left">
                    <Link href="/" className="inline-flex items-center gap-3 mb-16 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                            <Zap className="w-5 h-5 text-gold" fill="currentColor" />
                        </div>
                        <span className="font-heading font-semibold text-2xl tracking-tight text-white">Lumina</span>
                    </Link>

                    <h1 className="text-4xl xl:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                        Bem-vindo de <br />
                        volta à <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-gold">excelência.</span>
                    </h1>
                    <p className="text-white/50 text-lg font-light leading-relaxed mb-12 max-w-md">
                        Acesse sua conta para gerenciar seus projetos de alto padrão ou acompanhar suas demandas em andamento com segurança de nível bancário.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md inline-flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand/20 flex flex-shrink-0 items-center justify-center border border-brand/30">
                            <Lock className="w-5 h-5 text-brand-light" />
                        </div>
                        <div>
                            <h4 className="font-heading font-medium text-white mb-1">Segurança de ponta a ponta</h4>
                            <p className="text-sm text-white/40 font-light leading-relaxed max-w-[280px]">
                                Todos os acessos à área financeira são protegidos por autenticação de múltiplos fatores, garantindo 100% de segurança dos seus dados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Forms */}
            <div className="flex-1 flex flex-col relative z-10 justify-center w-full lg:max-w-none">
                <div className="w-full max-w-md mx-auto p-8 sm:p-12 lg:px-16 lg:py-12">

                    <AnimatePresence mode="wait">

                        {/* STEP 1: unified login form */}
                        {step === "login_form" && (
                            <motion.div
                                key="login_form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <div className="lg:hidden mb-12">
                                    <Link href="/" className="inline-flex items-center gap-2">
                                        <Zap className="w-6 h-6 text-gold" fill="currentColor" />
                                        <span className="font-heading font-semibold text-xl text-white">Lumina</span>
                                    </Link>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Entrar</h2>
                                    <p className="text-white/50 font-light">
                                        Digite suas credenciais de acesso.
                                    </p>
                                </div>

                                <form className="space-y-5" onSubmit={handleLoginSubmit}>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="E-mail"
                                                className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                                            />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                placeholder="Senha"
                                                className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Link href="#" className="text-sm text-brand-light hover:text-white transition-colors">Esqueceu a senha?</Link>
                                    </div>

                                    <button type="submit" className="w-full py-4 bg-white text-background font-bold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-8">
                                        Acessar Conta
                                    </button>
                                </form>

                                <p className="text-center text-sm text-white/40 mt-10">
                                    Ainda não possui conta? <Link href="/register" className="text-white hover:text-brand-light transition-colors font-medium">Criar conta</Link>
                                </p>
                            </motion.div>
                        )}

                        {/* 2FA step removed, will be handled internally in the Dashboard */}

                        {/* STEP 3: SUCCESS FEEDBACK */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-brand/20 border border-brand/30">
                                    <CheckCircle2 className="w-10 h-10 text-brand-light" />
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-white mb-4">
                                    Acesso Liberado
                                </h2>
                                <p className="text-white/50 font-light leading-relaxed mb-8">
                                    Credenciais validadas. Redirecionando você para o seu novo painel {isProfessional ? "financeiro" : "de controle"}...
                                </p>

                                {/* Loader animation to simulate redirect */}
                                <div className="flex justify-center">
                                    <div className="w-6 h-6 border-2 border-brand-light border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
