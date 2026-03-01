"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, UserCircle, Briefcase, Zap, ShieldCheck, Mail, Lock, User, Phone, CheckCircle2, Star, TrendingUp, Gem, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Role = "client" | "professional" | null;
type Step = "role_selection" | "client_form" | "email_verification" | "professional_form" | "professional_plans" | "success";

function RegisterForm() {
    const searchParams = useSearchParams();
    const initialType = searchParams.get("type") as Role;

    const [role, setRole] = useState<Role>(initialType);
    const [step, setStep] = useState<Step>(
        initialType === "client" ? "client_form" :
            initialType === "professional" ? "professional_form" :
                "role_selection"
    );

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    // Sync role if parameter changes (for direct links while already in the app)
    useEffect(() => {
        if (initialType === "client") {
            setRole("client");
            setStep("client_form");
        } else if (initialType === "professional") {
            setRole("professional");
            setStep("professional_form");
        }
    }, [initialType]);

    const handleRoleSelect = (selectedRole: "client" | "professional") => {
        setRole(selectedRole);
        setStep(selectedRole === "client" ? "client_form" : "professional_form");
    };

    const handleClientSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("email_verification");
    };

    const handleEmailVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("success");
    };

    const handleProfessionalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("professional_plans");
    };

    const handlePlanSelection = (planId: string) => {
        setSelectedPlan(planId);
        // Em um app real, aqui chamaríamos a API de checkout / assinatura
        setTimeout(() => {
            setStep("success");
        }, 600);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex font-sans overflow-hidden w-full">

            {/* Left Side - Abstract Premium Graphic with Dynamic Content (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-1 relative bg-surface items-center justify-center p-12 lg:px-16 border-r border-white/5 overflow-hidden">
                {/* Glowing Orbs specific to Role */}
                <motion.div
                    initial={false}
                    animate={{
                        backgroundColor: role === "professional" ? "rgba(212, 175, 55, 0.15)" : "rgba(10, 47, 182, 0.15)"
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[150px] rounded-full mix-blend-screen transition-colors duration-1000"
                />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                <div className="relative z-10 max-w-lg w-full text-left">
                    <Link href="/" className="inline-flex items-center gap-3 mb-16 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                            <Zap className="w-5 h-5 text-gold" fill="currentColor" />
                        </div>
                        <span className="font-heading font-semibold text-2xl tracking-tight text-white">Lumina</span>
                    </Link>

                    <AnimatePresence mode="wait">
                        {role === "client" || (!role && step === "role_selection") ? (
                            <motion.div
                                key="client-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl xl:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                                    O cuidado que seu <br />
                                    patrimônio <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">merece.</span>
                                </h1>
                                <p className="text-white/50 text-lg font-light leading-relaxed mb-12">
                                    Nossa missão é conectar você aos melhores e mais qualificados profissionais do mercado, garantindo tranquilidade do início ao fim do projeto.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { icon: <ShieldCheck className="w-5 h-5" />, title: "Garantia de Qualidade", desc: "Profissionais rigorosamente avaliados por nosso comitê." },
                                        { icon: <Lock className="w-5 h-5" />, title: "Pagamento Seguro", desc: "Seu dinheiro fica protegido em custódia até a aprovação." },
                                        { icon: <Star className="w-5 h-5" />, title: "Atendimento VIP", desc: "Concierge dedicado para acompanhar todo o seu serviço." },
                                    ].map((benefit, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-brand/10 flex flex-shrink-0 items-center justify-center border border-brand/20 text-brand-light">
                                                {benefit.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-heading font-medium text-white mb-1">{benefit.title}</h4>
                                                <p className="text-sm text-white/40 font-light leading-relaxed">
                                                    {benefit.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="professional-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl xl:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                                    Eleve o nível <br />
                                    dos seus <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">clientes.</span>
                                </h1>
                                <p className="text-white/50 text-lg font-light leading-relaxed mb-12">
                                    Faça parte de uma vitrine exclusiva para profissionais de alta performance. Deixe a Lumina cuidar da burocracia para você focar no que faz de melhor.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { icon: <UserCircle className="w-5 h-5" />, title: "Clientes Alto Padrão", desc: "Acesse quem não busca apenas preço, mas qualidade absoluta." },
                                        { icon: <CheckCircle2 className="w-5 h-5" />, title: "Garantia de Recebimento", desc: "Pagamento em custódia significa 0% de risco de inadimplência." },
                                        { icon: <TrendingUp className="w-5 h-5" />, title: "Gestão Centralizada", desc: "Orçamentos, pagamentos e conversas em uma única plataforma." },
                                    ].map((benefit, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gold/10 flex flex-shrink-0 items-center justify-center border border-gold/20 text-gold">
                                                {benefit.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-heading font-medium text-white mb-1">{benefit.title}</h4>
                                                <p className="text-sm text-white/40 font-light leading-relaxed">
                                                    {benefit.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side - Forms */}
            <div className="flex-1 flex flex-col relative z-10 justify-center w-full lg:max-w-none">
                <div className="w-full max-w-md mx-auto p-8 sm:p-12 lg:px-16 lg:py-12">

                    <AnimatePresence mode="wait">

                        {/* STEP 1: ROLE SELECTION (Only visible if no query param) */}
                        {step === "role_selection" && (
                            <motion.div
                                key="role_selection"
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

                                <div className="mb-10">
                                    <h2 className="text-3xl font-heading font-bold text-white mb-3">Junte-se a nós</h2>
                                    <p className="text-white/50 font-light">Selecione seu perfil para iniciar a experiência.</p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => handleRoleSelect("client")}
                                        className="w-full group flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-surface/50 hover:bg-white/5 hover:border-brand/50 transition-all text-left"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                                            <UserCircle className="w-6 h-6 text-white group-hover:text-brand-light transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-medium text-white text-lg mb-1">Sou Cliente Exigente</h3>
                                            <p className="text-sm text-white/40 font-light">Quero contratar especialistas verificados para projetos no meu imóvel.</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleRoleSelect("professional")}
                                        className="w-full group flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-surface/50 hover:bg-white/5 hover:border-gold/50 transition-all text-left"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                                            <Briefcase className="w-6 h-6 text-white group-hover:text-gold transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-medium text-white text-lg mb-1">Sou Especialista</h3>
                                            <p className="text-sm text-white/40 font-light">Quero passar pela curadoria e atender clientes de alto padrão.</p>
                                        </div>
                                    </button>
                                </div>

                                <p className="text-center text-sm text-white/40 mt-10">
                                    Já possui um convite/conta? <Link href="/login" className="text-white hover:text-gold transition-colors font-medium">Fazer login</Link>
                                </p>
                            </motion.div>
                        )}

                        {/* STEP 2A: CLIENT FORM */}
                        {step === "client_form" && (
                            <motion.div
                                key="client_form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {!initialType && (
                                    <button
                                        onClick={() => { setStep("role_selection"); setRole(null); }}
                                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8 group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar
                                    </button>
                                )}
                                {initialType && (
                                    <div className="lg:hidden mb-12">
                                        <Link href="/" className="inline-flex items-center gap-2">
                                            <Zap className="w-6 h-6 text-gold" fill="currentColor" />
                                            <span className="font-heading font-semibold text-xl text-white">Lumina</span>
                                        </Link>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Conta Cliente</h2>
                                    <p className="text-white/50 font-light">Preencha seus dados para solicitar acesso à plataforma.</p>
                                </div>

                                <form className="space-y-5" onSubmit={handleClientSubmit}>
                                    {/* Form fields */}
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input type="text" required placeholder="Nome Completo" className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input type="email" required placeholder="Seu melhor e-mail" className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input type="tel" required placeholder="Telefone / WhatsApp" className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input type="password" required placeholder="Crie uma senha forte" className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" />
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-4 bg-brand text-white font-medium rounded-xl hover:bg-brand-light transition-all shadow-[0_0_20px_rgba(10,47,182,0.3)] mt-8">
                                        Solicitar Convite VIP
                                    </button>

                                    <p className="text-xs text-white/30 text-center font-light leading-relaxed">
                                        Ao confirmar, você concorda com nossos <Link href="#" className="underline hover:text-white">Termos de Serviço</Link> e <Link href="#" className="underline hover:text-white">Privacidade</Link>.
                                    </p>
                                </form>

                                <p className="text-center text-sm text-white/40 mt-10">
                                    Já possui conta? <Link href="/login" className="text-white hover:text-brand-light transition-colors font-medium">Faça login</Link>
                                </p>
                            </motion.div>
                        )}

                        {/* STEP 2A.1: CLIENT EMAIL VERIFICATION */}
                        {step === "email_verification" && (
                            <motion.div
                                key="email_verification"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-white mb-2">Verifique seu e-mail</h2>
                                <p className="text-white/50 font-light mb-8 max-w-sm mx-auto">
                                    Enviamos um código de 6 dígitos para o seu e-mail. Insira abaixo para confirmar sua identidade.
                                </p>

                                <form onSubmit={handleEmailVerify} className="space-y-6">
                                    <div className="flex justify-center gap-2 sm:gap-4">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                maxLength={1}
                                                className="w-12 h-14 sm:w-14 sm:h-16 bg-surface border border-white/10 rounded-xl text-center text-2xl text-white font-heading font-bold focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                                                onChange={(e) => {
                                                    if (e.target.value && e.target.nextElementSibling) {
                                                        (e.target.nextElementSibling as HTMLInputElement).focus();
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <button type="submit" className="w-full py-4 bg-brand text-white font-medium rounded-xl hover:bg-brand-light transition-all shadow-[0_0_20px_rgba(10,47,182,0.3)] mt-8">
                                        Validar Código
                                    </button>

                                    <p className="text-sm text-white/40 text-center">
                                        Não recebeu? <button type="button" className="text-white hover:text-brand-light transition-colors font-medium">Reenviar código</button>
                                    </p>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 2B: PROFESSIONAL FORM */}
                        {step === "professional_form" && (
                            <motion.div
                                key="professional_form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {!initialType && (
                                    <button
                                        onClick={() => { setStep("role_selection"); setRole(null); }}
                                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8 group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar
                                    </button>
                                )}
                                {initialType && (
                                    <div className="lg:hidden mb-12">
                                        <Link href="/" className="inline-flex items-center gap-2">
                                            <Zap className="w-6 h-6 text-gold" fill="currentColor" />
                                            <span className="font-heading font-semibold text-xl text-white">Lumina</span>
                                        </Link>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Aplicação Profissional</h2>
                                    <p className="text-white/50 font-light">Inicie o processo de curadoria informando seus dados.</p>
                                </div>

                                <form className="space-y-4" onSubmit={handleProfessionalSubmit}>
                                    {/* Form fields */}
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="relative flex-1">
                                                <input type="text" required placeholder="Nome" className="w-full px-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="text" required placeholder="Sobrenome" className="w-full px-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input type="email" required placeholder="E-mail profissional" className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-white/30" />
                                            </div>
                                            <input type="password" required placeholder="Senha de acesso" className="w-full pl-12 pr-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                                        </div>

                                        <div className="relative">
                                            <select required className="w-full px-4 py-4 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none" defaultValue="">
                                                <option value="" disabled hidden>Qual sua especialidade principal?</option>
                                                <option value="marcenaria">Marcenaria / Restauro</option>
                                                <option value="reforma">Gestão de Obras / Reformas</option>
                                                <option value="eletrica">Elétrica e Automação</option>
                                                <option value="pintura">Pintura e Acabamento</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                            {/* Custom dropdown arrow */}
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                <ChevronDown className="w-4 h-4 text-white/50" />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <input type="url" placeholder="Link do Portfólio (Insta/Site)" className="w-full px-4 py-4 bg-background border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" />
                                        </div>

                                    </div>

                                    <button type="submit" className="w-full py-4 bg-white text-background font-bold rounded-xl hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-8">
                                        Avançar para Planos <ArrowRight className="inline w-4 h-4 ml-2" />
                                    </button>

                                    <p className="text-xs text-white/30 text-center font-light leading-relaxed">
                                        Apenas 10% dos profissionais são aprovados na curadoria Lumina.
                                    </p>
                                </form>

                                <p className="text-center text-sm text-white/40 mt-10">
                                    Já é parceiro? <Link href="/login" className="text-white hover:text-gold transition-colors font-medium">Faça login</Link>
                                </p>
                            </motion.div>
                        )}

                        {/* STEP 3: PROFESSIONAL SUBSCRIPTION PLANS */}
                        {step === "professional_plans" && (
                            <motion.div
                                key="professional_plans"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full lg:min-w-[500px] -ml-[25px]" /* Wider container for plans */
                            >
                                <div className="mb-10 text-center">
                                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Escolha seu plano</h2>
                                    <p className="text-white/50 font-light">Selecione o nível de visibilidade na plataforma.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: "premium", name: "Premium", price: "R$ 149", interval: "/mês", desc: "Acesso a pedidos ilimitados e selo de Especialista Verificado.", icon: <Star className="w-6 h-6 text-brand-light" />, border: "border-white/10 hover:border-brand/50", badge: null },
                                        { id: "exclusivo", name: "Exclusivo Lumina", price: "R$ 389", interval: "/mês", desc: "Prioridade nos orçamentos VIP, taxa administrativa zero e suporte concierge.", icon: <Gem className="w-6 h-6 text-gold" />, border: "border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]", badge: "Mais Escolhido" },
                                        { id: "padrao", name: "Padrão", price: "9%", interval: " / taxa", desc: "Acesso básico. Sujeito à fila de aprovação comum e taxa de intermediação.", icon: <Briefcase className="w-6 h-6 text-white/50" />, border: "border-white/5 opacity-80 hover:opacity-100", badge: null },
                                    ].map((plan) => (
                                        <div
                                            key={plan.id}
                                            onClick={() => handlePlanSelection(plan.id)}
                                            className={`relative cursor-pointer bg-surface border ${plan.border} p-5 rounded-2xl flex items-center gap-5 transition-all group`}
                                        >
                                            {plan.badge && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-background text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                                    {plan.badge}
                                                </div>
                                            )}

                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                                {plan.icon}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-heading font-bold text-white text-lg">{plan.name}</h4>
                                                    <div className="text-right">
                                                        <span className="font-bold text-white">{plan.price}</span>
                                                        <span className="text-xs text-white/40">{plan.interval}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-white/50 font-light pr-4">{plan.desc}</p>
                                            </div>

                                            {/* Selected indicator (visually faked on hover/click) */}
                                            <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-colors ${selectedPlan === plan.id ? 'bg-gold border-gold' : 'group-hover:border-white/60'}`}>
                                                {selectedPlan === plan.id && <CheckCircle2 className="w-4 h-4 text-background" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 text-center flex justify-center">
                                    <button onClick={() => setStep("professional_form")} className="text-sm text-white/40 hover:text-white transition-colors">
                                        Voltar aos dados
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: SUCCESS FEEDBACK */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border ${role === "client" ? "bg-brand/20 border-brand/30" : "bg-gold/20 border-gold/30"}`}>
                                    <ShieldCheck className={`w-10 h-10 ${role === "client" ? "text-brand-light" : "text-gold"}`} />
                                </div>
                                <h2 className="text-3xl font-heading font-bold text-white mb-4">
                                    {role === "client" ? "Recebemos sua solicitação!" : "Aplicação enviada!"}
                                </h2>
                                <p className="text-white/50 font-light leading-relaxed mb-8">
                                    {role === "client"
                                        ? "Nossa equipe de concierge irá revisar seu perfil e em breve você receberá seu acesso exclusivo por e-mail."
                                        : "Sua inscrição e plano escolhido estão sob análise. Você será notificado sobre a aprovação da curadoria em até 48h."}
                                </p>
                                <Link href="/" className="inline-flex py-3 px-8 bg-surface border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all">
                                    Voltar para o Início
                                </Link>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Wrap the component in Suspense since it uses useSearchParams()
export default function RegisterPage() {
    return (
        <Suspense fallback={
            // Fallback loader while searchParams is injected
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Zap className="w-8 h-8 text-white/20 animate-pulse" />
            </div>
        }>
            <RegisterForm />
        </Suspense>
    )
}
