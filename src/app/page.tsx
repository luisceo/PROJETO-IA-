"use client";

import { motion } from "framer-motion";
import { ArrowRight, UserCircle, Briefcase, Zap, ShieldCheck, Diamond, Star, Wrench, Home as HomeIcon, Ruler, Paintbrush, Droplet, Clock, ThumbsUp, ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"client" | "professional">("client");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">

      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          {/* Modern Logo */}
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Zap className="w-5 h-5 text-gold" fill="currentColor" />
          </div>
          <span className="font-heading font-semibold text-2xl tracking-tight">
            Lumina
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/60">
          <Link href="/marketplace" className="hover:text-white transition-colors">Catálogo de Profissionais</Link>
          <Link href="#" className="hover:text-white transition-colors">A Experiência</Link>
          <Link href="#" className="hover:text-white transition-colors">Padrão de Qualidade</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="bg-white/10 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md">
            Entrar
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 w-full max-w-5xl mx-auto mt-8 md:mt-12 pb-20 z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full"
        >
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-xs font-bold tracking-widest text-gold uppercase">Alto Padrão em Serviços</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-8"
            >
              Onde excelência encontra <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#FFDF73] to-gold-dark italic pr-2">
                confiança.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
            >
              Uma plataforma criada para clientes que não aceitam improviso e profissionais que não entregam menos que perfeição.
            </motion.p>
          </div>

          {/* Toggle Area */}
          <div className="max-w-md mx-auto bg-surface p-1.5 rounded-2xl border border-white/5 flex mb-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("client")}
              className={`relative flex-1 flex flex-col items-center justify-center py-4 px-6 transition-all duration-300 z-10 ${activeTab === "client"
                ? "text-white"
                : "text-white/40 hover:text-white/70"
                }`}
            >
              <UserCircle className="w-5 h-5 mb-2" strokeWidth={activeTab === "client" ? 2 : 1.5} />
              <span className="text-sm font-medium tracking-wide">Sou Cliente</span>
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className={`relative flex-1 flex flex-col items-center justify-center py-4 px-6 transition-all duration-300 z-10 ${activeTab === "professional"
                ? "text-white"
                : "text-white/40 hover:text-white/70"
                }`}
            >
              <Briefcase className="w-5 h-5 mb-2" strokeWidth={activeTab === "professional" ? 2 : 1.5} />
              <span className="text-sm font-medium tracking-wide">Sou Profissional</span>
            </button>

            {/* Animated Tab Background Indicator */}
            <motion.div
              layoutId="tabBackground"
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-white/10 border border-white/10 z-0"
              initial={false}
              animate={{
                left: activeTab === "client" ? "0.375rem" : "50%",
                width: "calc(50% - 0.375rem)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>

          {/* Action Area */}
          <div className="flex justify-center min-h-[60px]">
            {activeTab === "client" ? (
              <motion.div
                key="btn-client"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Link href="/register?type=client" className="bg-brand text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-medium hover:bg-brand-light transition-all shadow-[0_0_20px_rgba(10,47,182,0.3)] group">
                  Solicitar Serviço
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="btn-prof"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Link href="/register?type=professional" className="bg-white text-background px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-medium hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group">
                  Aplicar para Plataforma
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Stats / Numbers Section */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-20 md:mt-24 text-center">
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              <span className="block text-3xl font-heading font-bold text-white mb-1">2.347</span>
              <span className="text-xs text-white/50 uppercase tracking-widest">Serviços Realizados</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              <span className="block text-3xl font-heading font-bold text-white mb-1 flex items-center justify-center gap-2">4.9 <Star className="w-5 h-5 text-gold fill-gold" /></span>
              <span className="text-xs text-white/50 uppercase tracking-widest">Avaliação Média</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
              <span className="block text-3xl font-heading font-bold text-white mb-1">12<span className="text-xl">min</span></span>
              <span className="text-xs text-white/50 uppercase tracking-widest">Tempo de Resposta</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Partners Section */}
      <section className="py-16 border-t border-white/5 bg-surface/30 relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] mb-8">Marcas que confiam em nosso padrão</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2 font-heading text-lg font-bold"><div className="w-5 h-5 bg-white rounded-sm" /> ARCHITECTURE</div>
            <div className="flex items-center gap-2 font-serif text-xl italic">Lumina Design</div>
            <div className="flex items-center gap-2 font-heading text-lg tracking-widest uppercase">Studio<span className="font-normal">Nord</span></div>
            <div className="flex items-center gap-2 font-heading text-lg font-light">CASA<span className="font-bold">VIVA</span></div>
            <div className="flex items-center gap-2 font-sans font-bold text-lg tracking-tighter">METRICA<span className="font-light">®</span></div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-32 w-full relative z-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">A jornada <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Lumina</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">Um processo desenhado para minimizar seu atrito mental e maximizar a eficiência.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

            {[
              {
                step: "01",
                title: "Solicite o Serviço",
                desc: "Descreva sua necessidade em poucos cliques de forma clara e objetiva.",
                icon: <Zap className="w-6 h-6 text-brand-light" />
              },
              {
                step: "02",
                title: "Conexão VIP",
                desc: "Receba propostas apenas de profissionais rigorosamente verificados.",
                icon: <UserCircle className="w-6 h-6 text-gold" />
              },
              {
                step: "03",
                title: "Aprovação & Pagamento",
                desc: "Pagamento seguro mantido em custódia até a entrega 100% perfeita.",
                icon: <ShieldCheck className="w-6 h-6 text-white" />
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-32 h-32 rounded-full border border-white/10 bg-surface/80 backdrop-blur-xl flex items-center justify-center mb-8 relative shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-2 rounded-full border border-white/5 bg-background flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs font-bold text-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white/50 font-light leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 w-full relative z-10 bg-surface/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Especialidades</h2>
              <p className="text-white/50 text-lg font-light max-w-lg">Profissionais segmentados pelas áreas de maior demanda e complexidade técnica.</p>
            </div>
            <Link href="#" className="flex items-center gap-2 text-brand-light font-medium hover:text-white transition-colors group">
              Explorar todas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Marcenaria Fina", icon: <Ruler className="w-6 h-6 text-white/70" />, desc: "Móveis sob medida e restauro" },
              { name: "Reformas e Obras", icon: <HomeIcon className="w-6 h-6 text-white/70" />, desc: "Gestão completa de ambientes" },
              { name: "Civil e Pintura", icon: <Paintbrush className="w-6 h-6 text-white/70" />, desc: "Acabamentos de alto padrão" },
              { name: "Elétrica Especializada", icon: <Zap className="w-6 h-6 text-white/70" />, desc: "Automação e projetos elétricos" },
              { name: "Hidráulica", icon: <Droplet className="w-6 h-6 text-white/70" />, desc: "Instalações e reparos precisos" },
              { name: "Manutenções Gerais", icon: <Wrench className="w-6 h-6 text-white/70" />, desc: "Pequenos consertos preventivos" }
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-heading font-medium text-white mb-2">{cat.name}</h3>
                <p className="text-sm text-white/40">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof (Reviews) Section */}
      <section className="py-32 w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">A palavra de quem exige <span className="text-gold">o melhor</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">A qualidade do nosso serviço fala através das vozes dos nossos clientes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "O nível de detalhe na marcenaria foi absurdo. A equipe não apenas entregou no prazo, como deixou minha casa impecável. Pela primeira vez não tive dores de cabeça com reformas.", author: "Mariana S.", role: "Cliente Lumina" },
              { text: "Finalmente uma plataforma que entende que o valor não está no menor preço, mas na tranquilidade e qualidade absoluta. O restauro do meu piso ficou fenomenal.", author: "Ricardo V.", role: "Investidor Imobiliário" },
              { text: "Como arquiteta, a Lumina se tornou minha parceira secreta. Indico de olhos fechados porque sei que a execução do projeto refletirá exatamente o padrão que exijo.", author: "Helena C.", role: "Arquiteta" }
            ].map((review, i) => (
              <div key={i} className="bg-surface/30 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-brand/30 transition-colors">
                <div>
                  <div className="flex gap-1.5 mb-8">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 text-gold fill-gold" />)}
                  </div>
                  <p className="text-white/80 leading-relaxed font-light mb-8 italic">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-heading font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-medium text-white">{review.author}</p>
                    <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 w-full relative z-10 bg-surface/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">O Padrão Lumina</h2>
            <p className="text-white/50 font-light">Entenda por que não somos apenas mais um aplicativo de serviços.</p>
          </div>

          <div className="bg-background rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="col-span-1 font-medium text-white/50">Característica</div>
              <div className="col-span-1 font-medium text-white/50 text-center">Mercado Comum</div>
              <div className="col-span-1 font-heading font-bold text-brand-light text-center text-lg">Lumina</div>
            </div>

            {[
              { label: "Seleção de Profissionais", common: "Aberta a todos", premium: "Verificação de histórico e portfólio" },
              { label: "Qualidade do Serviço", common: "Inconsistente", commonClass: "text-white/40", premium: "Padrão Alto Nível Garantido" },
              { label: "Segurança de Pagamento", common: "Direto (Risco do cliente)", commonClass: "text-white/40", premium: "Custódia Cn Pay Segura" },
              { label: "Suporte e Mediação", common: "Ausente ou demorado", commonClass: "text-white/40", premium: "Atendimento dedicado e ágil" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="col-span-1 font-medium text-white text-sm md:text-base flex items-center">{row.label}</div>
                <div className="col-span-1 text-sm md:text-base text-center flex items-center justify-center font-light text-white/40">{row.common}</div>
                <div className="col-span-1 text-sm md:text-base text-center flex items-center justify-center text-white font-medium gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold hidden md:block" />
                  {row.premium}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment & Security Section */}
      <section className="py-24 w-full relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full order-2 lg:order-1 relative">
            {/* Abstract Payment Graphic */}
            <div className="bg-surface rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="flex justify-between items-center mb-10 relative z-10">
                <span className="font-heading font-semibold text-xl">Acordo de Serviço</span>
                <div className="bg-white px-3 py-1 rounded-full flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1a1a1a]" />
                  <span className="text-xs font-bold text-[#1a1a1a]">Cn Pay Integrado</span>
                </div>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                </div>

                <div className="p-6 rounded-2xl bg-background border border-white/5 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 text-sm">Status do Pagamento</span>
                    <span className="text-brand-light text-sm font-medium flex items-center gap-1"><Clock className="w-4 h-4" /> Em Custódia Segura</span>
                  </div>
                  <div className="h-14 w-full bg-white/5 rounded-xl border border-white/10 flex items-center justify-between px-5 font-heading text-lg">
                    <span className="text-white/60">Valor total</span>
                    <span className="font-medium">Oculto</span>
                  </div>
                </div>

                <button className="w-full py-5 mt-4 bg-white text-background font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                  Liberar Pagamento <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10 mb-8 backdrop-blur-md">
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">Garantia absoluta. Do início ao fim.</h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10 font-light">
              Na Lumina, toda a negociação ocorre em ambiente blindado pela <strong className="text-white font-medium">Cn Pay</strong>.
              Garantimos a proteção do seu dinheiro: ele só é liberado ao profissional quando você aprova o serviço finalizado.
            </p>
            <ul className="space-y-6">
              {[
                { title: "Pagamento em Custódia", desc: "Seu dinheiro fica seguro até a conclusão." },
                { title: "Sem Taxas Ocultas", desc: "Transparência total no orçamento aprovado." },
                { title: "Suporte Dedicado", desc: "Equipe pronta para mediação imediata." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-brand/20 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-light" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50 font-light">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-surface/30 w-full relative z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Dúvidas Frequentes</h2>
            <p className="text-white/50 font-light">Transparência em cada detalhe da nossa operação.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Como funciona a verificação dos profissionais?", a: "Nossa equipe avalia portfólio, checa referências passadas, realiza entrevistas e verifica o histórico criminal. Apenas 1 em cada 10 candidatos é aceito na Lumina." },
              { q: "O pagamento é feito antes ou depois do serviço?", a: "Você realiza o pagamento via cartão ou Pix na contratação, mas o valor fica retido na nossa conta de custódia Cn Pay. O profissional só recebe após você confirmar que o serviço foi concluído satisfatoriamente." },
              { q: "E se houver algum imprevisto ou discordância?", a: "Nossa equipe de concierge atua como mediadora imediata. Se o serviço não puder ser finalizado ou não estiver no padrão acordado, o seu dinheiro é reembolsado integralmente." },
              { q: "Existe taxa de adesão para clientes?", a: "Não. Clientes navegam e solicitam orçamentos gratuitamente. Apenas retemos uma taxa de administração sobre o valor do serviço fechado." }
            ].map((faq, i) => (
              <div key={i} className="bg-surface border border-white/5 rounded-2xl p-6 group cursor-pointer hover:border-white/20 transition-colors">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-white pr-4">{faq.q}</h4>
                  <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                </div>
                <p className="text-white/50 font-light text-sm mt-4 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 w-full relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-brand/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-brand/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">
            Transforme seu espaço hoje.
          </h2>
          <p className="text-xl text-white/70 mb-10 font-light max-w-2xl mx-auto">
            Junte-se à lista restrita de clientes que não abrem mão da perfeição quando se trata de suas casas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register?type=client" className="w-full sm:w-auto bg-white text-background px-10 py-5 rounded-xl font-bold hover:bg-white/90 transition-all font-heading text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Criar Minha Conta
            </Link>
            <Link href="/register?type=professional" className="w-full sm:w-auto flex items-center justify-center bg-transparent border border-white/20 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/5 transition-all font-heading text-lg">
              Sou Profissional
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold" fill="currentColor" />
            <span className="font-heading font-semibold text-xl tracking-tight text-white/50">Lumina</span>
          </div>
          <div className="text-sm text-white/30 font-light">
            &copy; {new Date().getFullYear()} Lumina Services. Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-sm text-white/40 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
