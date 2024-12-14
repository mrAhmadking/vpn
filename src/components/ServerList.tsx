import React from 'react';
import { Globe, Signal, Shield } from 'lucide-react';
import { Server } from '../utils/vpnUtils';

interface ServerListProps {
  servers: Server[];
  selectedServer: Server | null;
  onServerSelect: (server: Server) => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onServerSelect }) => {
  return (
    <div className="bg-vpn-background rounded-lg border border-gray-800">
      <div className="p-3 md:p-4 border-b border-gray-800">
        <h2 className="text-base md:text-lg font-semibold text-vpn-text">Available Servers</h2>
      </div>
      <div className="divide-y divide-gray-800 max-h-[300px] md:max-h-[400px] overflow-y-auto">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => onServerSelect(server)}
            className={`w-full p-3 md:p-4 text-left transition-all hover:bg-gray-800 ${
              selectedServer?.id === server.id ? 'bg-gray-800' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-vpn-accent" />
                <div>
                  <div className="font-medium text-sm md:text-base text-vpn-text">{server.country}</div>
                  <div className="text-xs md:text-sm text-gray-400">{server.city}</div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end md:space-x-4">
                <div className="text-xs md:text-sm text-gray-400">
                  <Signal className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                  {server.latency}ms
                </div>
                <div className="text-xs md:text-sm text-gray-400">{server.load}% load</div>
                <div className={`text-xs px-2 py-1 rounded ${
                  server.quality === 'good' ? 'bg-green-900 text-green-300' :
                  server.quality === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {server.quality}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServerList;
