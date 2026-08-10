"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Users, BookOpen, Landmark, UserCheck, ShieldAlert, KeyRound, Maximize2 } from "lucide-react";
import { useAuth, UserRole, PRESET_USERS } from "@/providers/AuthProvider";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole>("relationship_manager");
  const [email, setEmail] = useState(PRESET_USERS.relationship_manager.email);
  const [password, setPassword] = useState("••••••••••••");
  const [customName, setCustomName] = useState(PRESET_USERS.relationship_manager.name);
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const preset = PRESET_USERS[role];
    setEmail(preset.email);
    setCustomName(preset.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, email, customName);
    router.push("/dashboard");
  };

  const openFeatureModal = (title: string, desc: string, category: string) => {
    setSelectedModal({
      title: `${title} Module Overview`,
      category,
      subtitle: desc,
      badge: "Role-Authenticated Access",
      metrics: [
        { label: "Module Type", value: title, change: "Live Telemetry" },
        { label: "Security Policy", value: "Role Gated (RBAC)", change: "Multi-Agent AI" },
        { label: "Model Latency", value: "< 400ms", color: "text-emerald-400" },
      ],
      description: `Aegis ${title} equips banking specialists with domain-specific AI models, predictive risk scores, and real-time telemetry. Select your role on the sign-in panel to authenticate.`,
      details: [
        "Customer Intelligence: Churn analytics & prescriptive retention offers",
        "Fraud Intelligence: Real-time velocity alerts & device graph telemetry",
        "Knowledge Intelligence: Instant SOP answers via RAG regulatory policy index",
      ],
      actionLabel: "Authenticate Workspace Role",
      actionHref: "/login",
    });
  };

  const roleOptions: { role: UserRole; title: string; desc: string; icon: typeof Users; color: string }[] = [
    {
      role: "relationship_manager",
      title: "Relationship Manager",
      desc: "Portfolio intelligence, churn risk telemetry & client retention offers.",
      icon: Users,
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    },
    {
      role: "fraud_analyst",
      title: "Fraud Analyst",
      desc: "Real-time velocity alerts, device graph telemetry & SAR disclosures.",
      icon: ShieldAlert,
      color: "border-red-500/40 bg-red-500/10 text-red-400",
    },
    {
      role: "compliance_officer",
      title: "Compliance Officer",
      desc: "Regulatory SOP search, UBO verification & audit compliance RAG.",
      icon: BookOpen,
      color: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    },
    {
      role: "admin",
      title: "Super Admin",
      desc: "Unrestricted workspace access across all intelligence modules & risk engines.",
      icon: KeyRound,
      color: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-16 px-8 py-16">

        {/* Left Section */}
        <ScrollReveal direction="left" delay={50} className="max-w-xl space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            <ShieldCheck className="h-4 w-4" /> Enterprise AI Banking Platform
          </span>

          <h1 className="text-6xl font-black tracking-tight leading-none text-foreground">Welcome to Aegis</h1>

          <p className="text-lg leading-relaxed text-muted-foreground">
            Role-authenticated AI workspace providing personalized risk telemetry and domain intelligence for banking specialists.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: Users,
                title: "Customer Intelligence",
                category: "Relationship & Retention AI",
                desc: "Predict churn and identify customers requiring proactive engagement.",
              },
              {
                icon: ShieldCheck,
                title: "Fraud Intelligence",
                category: "Financial Crime & Graph AI",
                desc: "Investigate suspicious activity using AI-assisted workflows.",
              },
              {
                icon: BookOpen,
                title: "Knowledge Intelligence",
                category: "Regulatory SOP & Policy RAG",
                desc: "Instant answers from enterprise policies using RAG.",
              },
            ].map(({ icon: Icon, title, category, desc }) => (
              <div
                key={title}
                onClick={() => openFeatureModal(title, desc, category)}
                className="group flex items-start justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-md hover:shadow-2xl hover:scale-[1.04] hover:-translate-y-1.5 hover:border-blue-500/60 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background border border-border text-blue-500 group-hover:scale-110 transition duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-foreground group-hover:text-blue-400 transition">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
                <Maximize2 size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right Form Card */}
        <ScrollReveal direction="left" delay={150} className="w-full max-w-lg">
          <div className="group rounded-3xl border border-border bg-card p-8 shadow-2xl space-y-6 hover:border-blue-500/40 hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-3 border-b border-border pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-black text-white text-xl shadow-md group-hover:scale-110 transition duration-300">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition">Sign In</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select your functional role to authenticate workspace permissions
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Select Assigned Persona & Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((opt) => {
                    const isSelected = selectedRole === opt.role;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.role}
                        type="button"
                        onClick={() => handleRoleSelect(opt.role)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2.5 cursor-pointer hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl ${
                          isSelected
                            ? "border-blue-600 bg-blue-500/10 text-foreground ring-2 ring-blue-500/40 shadow-md"
                            : "border-border bg-background hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`p-1.5 rounded-xl border text-xs font-bold ${opt.color}`}>
                            <Icon size={14} />
                          </span>
                          {isSelected && <UserCheck size={16} className="text-blue-500" />}
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-foreground leading-snug">{opt.title}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Employee Full Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Security Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-blue-700 hover:scale-[1.03] cursor-pointer"
              >
                Authenticate & Launch Workspace
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="rounded-2xl border border-border bg-background p-4 text-xs space-y-1 hover:border-blue-500/40 hover:scale-[1.02] transition duration-300 cursor-pointer">
              <p className="font-bold flex items-center gap-1.5 text-foreground">
                <span>🔒 Role-Based Access Control (RBAC) Active</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your logged-in role determines accessible workspace telemetry, fraud actions, and regulatory policy permissions.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </section>

      <CardModal
        isOpen={!!selectedModal}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />
    </main>
  );
}
