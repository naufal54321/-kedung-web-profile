import { useEffect, useState } from 'react';
import { FaEye, FaCalendarDay } from 'react-icons/fa';
import api, { visitKeyFor } from '../utils/api';

function VisitorStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const off = api.getStats((s) => setStats(s));
    api.trackVisit();
    return off;
  }, []);

  if (!stats) return null;

  const todayKey = visitKeyFor();
  const today = stats.perHari?.[todayKey] || 0;
  const total = stats.total || 0;

  return (
    <div className="visitor-stats">
      <span><FaEye aria-hidden="true" /> Total Pengunjung: <b>{total.toLocaleString('id-ID')}</b></span>
      <span><FaCalendarDay aria-hidden="true" /> Hari ini: <b>{today.toLocaleString('id-ID')}</b></span>
    </div>
  );
}

export default VisitorStats;
