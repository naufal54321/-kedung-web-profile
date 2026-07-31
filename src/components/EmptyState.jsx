import { FaInbox } from 'react-icons/fa'

function EmptyState({ message = 'Belum ada data.', icon: Icon = FaInbox }) {
  return (
    <div className="text-center py-5 text-muted">
      <Icon size={40} className="mb-3 opacity-50" />
      <p className="mb-0">{message}</p>
    </div>
  )
}

export default EmptyState
