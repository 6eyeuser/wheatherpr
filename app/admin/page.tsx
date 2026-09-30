'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    latitude: '25.4706',
    longitude: '78.6103',
    title: 'Severe Convective Thunderstorm',
    severity: 'severe',
    windSpeed: '78',
    pressure: '988',
    description: 'Rapid cloud-top cooling and extreme vertical shear detected.',
    radiusKm: '50'
  })
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Submitting meteorological data to AI backend...')

    const formDataToSend = new FormData()
    formDataToSend.append('latitude', formData.latitude)
    formDataToSend.append('longitude', formData.longitude)
    formDataToSend.append('title', formData.title)
    formDataToSend.append('severity', formData.severity)
    formDataToSend.append('description', `${formData.description} [Wind: ${formData.windSpeed} km/h | Pressure: ${formData.pressure} hPa]`)
    formDataToSend.append('radius_km', formData.radiusKm)
    
    if (file) {
      formDataToSend.append('file', file)
    }

    try {
      // Updated to point to your live Render backend
      const response = await fetch('https://ai-weather-backend-qu4u.onrender.com/trigger-broadcast', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()
      if (response.ok) {
        setStatus(`Alert dispatched. Notified users in ${formData.radiusKm} km radius: ${data.users_in_radius?.length ?? 0}`)
      } else {
        const errorMsg = typeof data.detail === 'object' 
          ? JSON.stringify(data.detail) 
          : (data.detail || data.error || 'Server error')
        setStatus(`Broadcast failed: ${errorMsg}`)
      }
    } catch {
      setStatus('Error connecting to the live Python backend. Ensure the Render service is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex justify-between items-center pb-4 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold text-red-500">Meteorological Admin Dispatch</h1>
            <p className="text-sm text-gray-400">Manual threat input & AI broadcast controller</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-medium rounded transition-colors"
          >
            Go to User Dashboard
          </Link>
        </header>

        <form onSubmit={handleBroadcast} className="p-6 bg-gray-900 border border-gray-800 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Target Latitude</label>
              <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Target Longitude</label>
              <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Severity Level</label>
              <select name="severity" value={formData.severity} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500">
                <option value="severe">Severe</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Wind Speed (km/h)</label>
              <input type="number" name="windSpeed" value={formData.windSpeed} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Pressure (hPa)</label>
              <input type="number" name="pressure" value={formData.pressure} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Alert Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Meteorological Details</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Attach Image For AI Analysis (Optional)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Broadcast Radius (km)</label>
            <input type="number" name="radiusKm" value={formData.radiusKm} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 rounded font-semibold text-sm transition-colors cursor-pointer">
            {loading ? 'Transmitting...' : 'Dispatch Meteorological Alert'}
          </button>

          {status && (
            <div className="p-3 bg-gray-800 border border-gray-700 text-sm text-yellow-300 rounded">
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}