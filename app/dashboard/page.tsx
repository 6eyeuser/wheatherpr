'tsx'
'use client';

import React, { useState } from 'react';
import { ShieldAlert, Activity, Compass, Bell, ArrowUpRight, LogOut, Radio } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [selectedRegion] = useState('Gangetic Plains (Northern India)');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500 p-2 rounded-xl text-slate-950 font-black tracking-wider text-xl">VN</div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">VAYUNET <span className="text-cyan-400 text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 uppercase">Live Public Watch</span></h1>
            <p className="text-xs text-slate-400">SIH 26078 • AI-Driven Extreme Weather Early Warning System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:flex items-center text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-full font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse mr-2 text-emerald-400" />
            CDS Satellite Stream Active
          </span>
          <button 
            onClick={() => router.push('/admin')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition border border-slate-700 flex items-center"
          >
            Admin Switch <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
          </button>
          <button 
            onClick={() => router.push('/')}
            className="text-xs bg-red-950/40 hover:bg-red-900/50 text-red-300 px-3 py-2 rounded-lg transition border border-red-900/50 flex items-center"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Threat Banner */}
        <div className="bg-gradient-to-r from-red-950/80 via-rose-950/40 to-slate-900 border border-red-900/60 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="bg-red-600 text-white p-3.5 rounded-2xl shadow-lg shadow-red-600/30 flex-shrink-0">
                <ShieldAlert className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded uppercase">Severe Convective Alert</span>
                  <span className="text-xs text-red-400 font-mono">ID: WX-2026-SIH26078</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white mt-1">High-Intensity Convective Storm Tracked over {selectedRegion}</h2>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  PyTorch tensor analysis confirms extreme CAPE anomalies (&gt;1400 J/kg) coupled with sudden MSLP drops. High risk of localized flash floods and destructive wind shear.
                </p>
              </div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-5 py-4 rounded-2xl text-right min-w-[200px] backdrop-blur-md">
              <span className="text-xs text-slate-400 block">Threat Confidence</span>
              <span className="text-3xl font-black text-red-400 font-mono">94.8%</span>
            </div>
          </div>
        </div>

        {/* Grid Stats & Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Map Visualizer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white flex items-center">
                  <Compass className="w-5 h-5 mr-2 text-cyan-400" /> Atmospheric Tensor Tracking Map (India Bounding Box)
                </h3>
                <span className="text-xs font-mono bg-slate-800 text-cyan-300 px-3 py-1 rounded-full border border-slate-700">ERA5 0.25° Resolution</span>
              </div>
              
              <div className="bg-slate-950 rounded-2xl border border-slate-800 h-[400px] relative overflow-hidden flex items-center justify-center">
                {/* Simulated Radar Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"></div>
                
                {/* Vortex Core Animation */}
                <div className="relative z-10 w-56 h-56 rounded-full border border-red-500/30 flex items-center justify-center animate-spin" style={{ animationDuration: '25s' }}>
                  <div className="w-36 h-36 rounded-full border border-amber-500/40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-cyan-400 blur-md opacity-80 animate-pulse"></div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 backdrop-blur-md p-3.5 rounded-xl text-xs space-y-1 shadow-lg">
                  <div className="text-slate-400">Active Coordinates Grid:</div>
                  <div className="font-mono text-cyan-400">[38.1°N, 68.1°E, 6.1°N, 98.1°E]</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: 4-Channel Metrics */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-5">
              <h3 className="text-base font-bold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-cyan-400" /> 4-Channel Tensor Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
                    <span>Zonal Wind (U10)</span>
                    <span className="text-cyan-400 font-mono">18.4 m/s</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[70%]"></div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
                    <span>Meridional Wind (V10)</span>
                    <span className="text-cyan-400 font-mono">22.1 m/s</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[85%]"></div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
                    <span>Mean Sea Level Pressure (MSLP)</span>
                    <span className="text-amber-400 font-mono">992.4 hPa (Drop)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[45%]"></div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
                    <span>Convective Energy (CAPE)</span>
                    <span className="text-red-400 font-mono">1450 J/kg (Critical)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[92%]"></div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-2xl transition text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center">
                  <Bell className="w-4 h-4 mr-2" /> Subscribe to Regional SMS Alerts
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}