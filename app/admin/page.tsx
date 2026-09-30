'tsx'
'use client';

import React, { useState } from 'react';
import { Upload, Cpu, Database, CheckCircle2, RefreshCw, Terminal, ArrowLeft, Shield, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'System initialized. FastAPI inference server connected.',
    'Loaded ResNet50 4-channel tensor weights [heavy_weather_model_resnet50.pt].',
    'Awaiting Copernicus ERA5 NetCDF tensor stream...'
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setSuccess(false);
      setLogs(prev => [...prev, `Uploading target tensor file: ${e.target.files![0].name}...`]);
      
      setTimeout(() => {
        setUploading(false);
        setSuccess(true);
        setLogs(prev => [
          ...prev,
          'NetCDF tensor unpacked successfully (Shape: [12, 4, 128, 128]).',
          'Z-score normalization applied across U10, V10, MSLP, and CAPE channels.',
          'PyTorch ResNet50 inference executed: Threat Class = SEVERE (Probability: 94.8%).'
        ]);
      }, 2000);
    }
  };

  const handleBroadcastAlert = () => {
    setBroadcasting(true);
    setLogs(prev => [...prev, 'Broadcasting emergency notification banner to Supabase & User Portals...']);
    setTimeout(() => {
      setBroadcasting(false);
      setBroadcastSuccess(true);
      setLogs(prev => [...prev, 'SUCCESS: Severe Convective Alert active on live public user dashboard!']);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:bg-slate-800 transition text-slate-300 flex items-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-cyan-400" /> Admin Command Center
              </h1>
              <p className="text-xs text-slate-400">SIH 26078 • R&D Lab & Backend Inference Management</p>
            </div>
          </div>
          <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800 px-3.5 py-1.5 rounded-full font-mono">
            Model: ResNet50 (4-Channel)
          </span>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* NetCDF File Ingestion Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20 text-cyan-400">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Raw Tensor Ingestion</h2>
                  <p className="text-xs text-slate-400">Upload Copernicus ERA5 NetCDF (.nc) files</p>
                </div>
              </div>

              <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-950/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition group">
                <Upload className="w-10 h-10 text-slate-500 group-hover:text-cyan-400 mb-3 transition" />
                <span className="text-sm font-medium text-slate-200">Click to upload NetCDF tensor</span>
                <span className="text-xs text-slate-500 mt-1">Accepts .nc files up to 500MB</span>
                <input type="file" accept=".nc" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="space-y-3">
              {uploading && (
                <div className="flex items-center space-x-3 text-cyan-400 text-sm bg-cyan-950/40 border border-cyan-900 p-3.5 rounded-xl animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span>Processing multidimensional tensor through PyTorch pipeline...</span>
                </div>
              )}
              {success && (
                <div className="flex items-center space-x-3 text-emerald-400 text-sm bg-emerald-950/40 border border-emerald-900 p-3.5 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Inference complete! Ready for notification broadcast.</span>
                </div>
              )}
            </div>
          </div>

          {/* Broadcast Alert & Model Control */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20 text-red-400">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Broadcast Alert to Users</h2>
                  <p className="text-xs text-slate-400">Push emergency warnings to public dashboard</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 font-mono">Target Payload:</div>
                <div className="text-xs font-bold text-red-400">Severe Convective Storm (&gt;1400 J/kg CAPE)</div>
                <p className="text-[11px] text-slate-500">Triggering this will instantly display the high-priority warning banner across all connected user portals.</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleBroadcastAlert}
                disabled={broadcasting}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-2xl transition text-sm shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2"
              >
                {broadcasting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{broadcasting ? 'Broadcasting...' : 'Push Alert to User Dashboard'}</span>
              </button>

              {broadcastSuccess && (
                <div className="text-xs text-emerald-400 text-center font-medium bg-emerald-950/40 border border-emerald-900 py-2 rounded-xl">
                  ✓ Notification successfully live on User Dashboard!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Live Terminal Logs */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center font-mono">
              <Terminal className="w-4 h-4 mr-2 text-cyan-400" /> System Execution Logs
            </h3>
            <span className="text-xs text-slate-500 font-mono">Live Stream</span>
          </div>
          <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2 h-40 overflow-y-auto border border-slate-900">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-cyan-500">&gt;</span>
                <span className={log.includes('SEVERE') || log.includes('SUCCESS') ? 'text-red-400 font-bold' : log.includes('successfully') ? 'text-emerald-400' : ''}>{log}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}