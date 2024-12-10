'use client';

import { useState, useEffect } from 'react';

export default function JoinPage() {
  const [serverIp, setServerIp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServerIp = async () => {
      try {
        // In a real implementation, this would be an API call to your backend
        // which would then use Alibaba Cloud SDK to get the IP
        // For now, we'll use a placeholder API endpoint
        const response = await fetch('/api/server-ip');
        const data = await response.json();
        setServerIp(data.ip);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch server IP' + err);
        setIsLoading(false);
      }
    };

    fetchServerIp();
  }, []);

  const joinServer = () => {
    if (serverIp) {
      window.location.href = `steam://rungameid/730//+connect ${serverIp}:27022`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading server information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Join CS2 Server</h1>
      <button
        onClick={joinServer}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
      >
        Join Server
      </button>
      <p className="mt-4 text-gray-400">Server IP: {serverIp}:27022</p>
    </div>
  );
}
