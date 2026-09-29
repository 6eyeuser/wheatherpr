'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface WeatherAlert {
  id: string
  title: string
  description: string
  severity: 'low' | 'moderate' | 'severe'
  distance_km?: string
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [locationStatus, setLocationStatus] = useState<string>('Checking location status...')
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])

  useEffect(() => {
    let currentLat = 0;
    let currentLon = 0;

    const fetchAlerts = async (lat: number, lon: number) => {
      const { data } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        const localAlerts = data.map((alert: any) => {
          const dist = calculateDistance(lat, lon, alert.latitude, alert.longitude);
          return { ...alert, distance_km: dist.toFixed(1) };
        }).filter((alert: any) => parseFloat(alert.distance_km) <= 50);

        setAlerts(localAlerts);
      }
    };

    const checkAuthAndSyncLocation = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            currentLat = position.coords.latitude
            currentLon = position.coords.longitude
            setLocationStatus(`Location found: Lat ${currentLat.toFixed(4)}, Lon ${currentLon.toFixed(4)}`)

            await supabase.from('profiles').upsert({
              id: user.id,
              email: user.email,
              latitude: currentLat,
              longitude: currentLon,
              updated_at: new Date().toISOString()
            })

            fetchAlerts(currentLat, currentLon);
          },
          (err) => setLocationStatus(`Location permission denied: ${err.message}`)
        )
      }
    }

    checkAuthAndSyncLocation()

    const subscription = supabase
      .channel('alerts-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts' }, payload => {
        if (currentLat !== 0 && currentLon !== 0) {
          fetchAlerts(currentLat, currentLon);
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(subscription) }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center pb-4 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold">Weather Warning Dashboard</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors">
            Logout
          </button>
        </header>

        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-1">Your Location Status</h2>
          <p className="text-sm text-gray-300">{locationStatus}</p>
        </div>

        <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Active Weather Alerts (50 km radius)</h2>
          
          {alerts.length === 0 ? (
            <div className="p-6 text-center text-gray-500 border border-dashed border-gray-800 rounded-lg">
              There are currently no severe weather warnings in your area.
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${alert.severity === 'severe' ? 'bg-red-950/40 border-red-800 text-red-200' : 'bg-yellow-950/40 border-yellow-800 text-yellow-200'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{alert.title}</span>
                    <span className="text-xs uppercase px-2 py-0.5 rounded bg-black/40">{alert.severity}</span>
                  </div>
                  <p className="text-sm">{alert.description}</p>
                  <p className="text-xs mt-2 text-gray-400">Distance: {alert.distance_km} km away</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}