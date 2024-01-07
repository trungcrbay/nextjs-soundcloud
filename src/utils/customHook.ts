import { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

export const useWavesurfer = (containerRef: React.RefObject<HTMLDivElement>, 
    options: Omit<WaveSurferOptions, 'container'>) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      const ws: any = WaveSurfer.create({
        ...options,
        container: containerRef.current,
        
      });
  
      setWavesurfer(ws);
  
      return () => {
        ws.destroy();
      };
    }, [options, containerRef]);
  
    return wavesurfer;
  };

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
