'tsx'
'use client';

import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-cyan-500 text-slate-950 p-3 rounded-2xl font-black text-xl mb-2 shadow-lg shadow-cyan-500/20">
            VN
          </div>
          <h1 className="text-2xl font-black tracking-wide text-white">VAYUNET ACCESS</h1>
          <p className="text-xs text-slate-400">SIH 26078 • AI-Driven Extreme Weather Early Warning System</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>User Portal</span>
          </button>
          <button 
            onClick={() => router.push('/admin')}
            className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Portal</span>
          </button>
        </div>

        <form className="space-y-4 pt-2" onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input type="email" required placeholder="admin@sih26078.gov" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Secure Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input type="password" required placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2">
            <span>Login to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}