"use client";

import { Bell, Mail, Smartphone, Send } from "lucide-react";
import { useState } from "react";

export function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [webhook, setWebhook] = useState(true);

  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-xs space-y-6">
      <div className="pb-4 border-b border-border">
        <h3 className="text-xl font-bold tracking-tight">Notification & Alert Channels</h3>
        <p className="text-sm text-muted-foreground">Configure instant alert notifications for high-risk fraud and churn events</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-background p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="font-bold text-base text-foreground">Email Alert Notifications</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Send instant executive summary to tanvee@aegisbank.com</p>
            </div>
          </div>
          <button
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`rounded-full w-14 h-8 p-1 transition duration-200 ${
              emailAlerts ? "bg-blue-600" : "bg-muted"
            }`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-200 ${emailAlerts ? "translate-x-6" : "translate-x-0"}`} />
          </button>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <Smartphone size={20} />
            </div>
            <div>
              <h4 className="font-bold text-base text-foreground">SMS Out-of-Band Alerts</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Send SMS push for critical wire transfer holds (&gt;₹1 Crore)</p>
            </div>
          </div>
          <button
            onClick={() => setSmsAlerts(!smsAlerts)}
            className={`rounded-full w-14 h-8 p-1 transition duration-200 ${
              smsAlerts ? "bg-blue-600" : "bg-muted"
            }`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-200 ${smsAlerts ? "translate-x-6" : "translate-x-0"}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
