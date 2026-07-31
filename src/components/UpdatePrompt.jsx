import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

function UpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState(() => () => {});

  useEffect(() => {
    const updater = registerSW({
      immediate: true,
      onNeedRefresh(nextUpdateSW) {
        setUpdateSW(() => nextUpdateSW);
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
        setTimeout(() => setOfflineReady(false), 4000);
      },
    });
    return () => {
      if (updater) updater();
    };
  }, []);

  if (offlineReady) {
    return (
      <div className="update-toast update-toast-success" role="status">
        <span>Aplikasi siap digunakan offline</span>
        <button className="update-toast-close" onClick={() => setOfflineReady(false)} aria-label="Tutup">✕</button>
      </div>
    );
  }

  if (!needRefresh) return null;

  return (
    <div className="update-toast" role="alert">
      <span>Versi baru tersedia.</span>
      <button className="update-toast-btn" onClick={() => updateSW(true)}>Muat Ulang</button>
      <button className="update-toast-close" onClick={() => setNeedRefresh(false)} aria-label="Tutup">✕</button>
    </div>
  );
}

export default UpdatePrompt;
