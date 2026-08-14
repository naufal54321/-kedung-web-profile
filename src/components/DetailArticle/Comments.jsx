import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaCommentDots, FaUser } from 'react-icons/fa';
import api from '../../utils/api';

const timeAgo = (ts) => {
  if (!ts) return '';
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return 'baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', text: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let active = true;
    api.getComments(articleId).then((list) => {
      if (active) {
        setComments(list);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [articleId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setError('');
    setSending(true);
    try {
      const created = await api.publicCreateComment(articleId, { name: form.name.trim(), text: form.text.trim() });
      setComments((prev) => [...prev, created].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)));
      setForm({ name: '', text: '' });
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    } catch {
      setError('Gagal mengirim komentar. Silakan coba lagi.');
    }
    setSending(false);
  };

  return (
    <section className="detail-comments">
      <h4 className="detail-comments-title"><FaCommentDots /> Komentar ({comments.length})</h4>
      {error && <Alert variant="danger" className="py-2" role="alert">{error}</Alert>}
      {sent && <Alert variant="success" className="py-2" role="alert">Komentar terkirim!</Alert>}
      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" variant="success" size="sm" /></div>
      ) : comments.length === 0 ? (
        <p className="detail-comments-empty">Belum ada komentar. Jadilah yang pertama berkomentar.</p>
      ) : (
        <div className="detail-comments-list">
          {comments.map((c) => (
            <div key={c.id} className="detail-comment">
              <div className="detail-comment-avatar"><FaUser /></div>
              <div className="detail-comment-body">
                <div className="detail-comment-head">
                  <span className="detail-comment-name">{c.name}</span>
                  <span className="detail-comment-time">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="detail-comment-text mb-0">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Form onSubmit={handleSubmit} className="detail-comment-form mt-4">
        <h5 className="detail-comments-title">Tulis Komentar</h5>
        <Form.Control type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nama Anda" maxLength={100} required className="mb-2" />
        <Form.Control as="textarea" rows={3} name="text" value={form.text} onChange={handleChange} placeholder="Tulis komentar Anda..." maxLength={1000} required className="mb-2" />
        <Button variant="success" type="submit" disabled={sending}>
          {sending ? 'Mengirim...' : 'Kirim Komentar'}
        </Button>
      </Form>
    </section>
  );
};

export default Comments;