import React, { useState } from 'react';
import { Shield, ShieldOff } from 'lucide-react';
import { Server, simulateConnection, findBackupServer, mockServers } from '../utils/vpnUtils';
import { toast } from 'sonner';

interface ConnectionStatusProps {
  isConnected: boolean;
  selectedServer: Server | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  selectedServer,
  onConnect,
  onDisconnect,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!selectedServer) return;
    
    setIsConnecting(true);
    try {
      const success = await simulateConnection(selectedServer);
      
      if (!success) {
        const backupServer = findBackupServer(selectedServer, mockServers);
        if (backupServer) {
          toast.info(`Attempting connection to backup server in ${backupServer.city}...`);
          const backupSuccess = await simulateConnection(backupServer);
          if (backupSuccess) {
            onConnect();
          }
        } else {
          toast.error('No backup servers available. Please try again later.');
        }
      } else {
        onConnect();
      }
    } catch (error) {
      toast.error('Connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-vpn-background rounded-lg p-4 md:p-6 border border-gray-800 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          {isConnected ? (
            <Shield className="w-16 h-16 md:w-20 md:h-20 text-vpn-success animate-pulse-slow" />
          ) : (
            <ShieldOff className="w-16 h-16 md:w-20 md:h-20 text-vpn-error" />
          )}
          {isConnected && (
            <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 -m-2 rounded-full border-4 border-vpn-success animate-ping opacity-20" />
          )}
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-vpn-text mb-2">
          {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Not Connected'}
        </h2>
        {selectedServer && (
          <div className="text-sm md:text-base text-gray-400 mb-4">
            <p>{selectedServer.city}, {selectedServer.country}</p>
            <p className="text-xs md:text-sm mt-1">Protocol: {selectedServer.protocol}</p>
          </div>
        )}
        <button
          onClick={isConnected ? onDisconnect : handleConnect}
          disabled={!selectedServer || isConnecting}
          className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-lg font-medium text-base md:text-lg transition-all transform hover:scale-105 ${
            isConnected
              ? 'bg-vpn-error text-white hover:bg-red-600'
              : selectedServer
              ? 'bg-vpn-accent text-white hover:bg-blue-600'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          } ${isConnecting ? 'opacity-75 cursor-wait' : ''}`}
        >
          {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default ConnectionStatus;
