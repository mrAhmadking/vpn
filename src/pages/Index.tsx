import React, { useState } from 'react';
import ServerMap from '../components/ServerMap';
import ConnectionStatus from '../components/ConnectionStatus';
import ServerList from '../components/ServerList';
import { toast } from 'sonner';
import { Search, Shield } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Server, mockServers } from '../utils/vpnUtils';

const Index = () => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleConnect = () => {
    if (!selectedServer) return;
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info('Disconnected from VPN');
  };

  const handleServerSelect = (server: Server) => {
    setSelectedServer(server);
  };

  const filteredServers = mockServers.filter(server => 
    server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-vpn-text">
      <div className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col items-center">
        {/* Logo and App Name */}
        <div className="mb-8 flex flex-col items-center justify-center space-y-2">
          <Shield className="w-16 h-16 md:w-20 md:h-20 text-vpn-accent animate-pulse-slow" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">VPN All Free</h1>
          <p className="text-sm md:text-base text-gray-400 text-center">Secure. Fast. Free.</p>
        </div>

        {/* Connection Status and Button */}
        <div className="w-full max-w-md mb-8">
          <ConnectionStatus
            isConnected={isConnected}
            selectedServer={selectedServer}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-vpn-background border-gray-800"
            />
          </div>
        </div>

        {/* Server Selection */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ServerMap
              servers={filteredServers}
              selectedServer={selectedServer}
              onServerSelect={handleServerSelect}
            />
            <ServerList
              servers={filteredServers}
              selectedServer={selectedServer}
              onServerSelect={handleServerSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
