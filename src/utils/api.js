import { db, databaseURL } from './firebase'
import { ref, push, set, remove, get, onValue, runTransaction } from 'firebase/database'

const VISIT_KEY_PREFIX = 'kedung_visit_'

export function visitKeyFor(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isNewVisit(dateKey) {
  try {
    return !localStorage.getItem(`${VISIT_KEY_PREFIX}${dateKey}`)
  } catch {
    return false
  }
}

export function markVisited(dateKey) {
  try {
    localStorage.setItem(`${VISIT_KEY_PREFIX}${dateKey}`, '1')
  } catch {
    // penyimpanan lokal tidak tersedia — abaikan
  }
}

function compareUmkm(a, b) {
  const aFire = a.id && a.id.startsWith('-')
  const bFire = b.id && b.id.startsWith('-')
  if (aFire && !bFire) return -1
  if (!aFire && bFire) return 1
  return b.id.localeCompare(a.id)
}

const api = (() => {
  const BASE_URL = databaseURL;

  async function fetchData(url) {
    try {
      const response = await fetch(`${BASE_URL}/${url}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('fetchData error:', url, error)
      throw new Error('Error fetching data: ' + (error?.message || error));
    }
  }

  async function postData(url, data) {
    try {
      const result = await push(ref(db, url.replace(/\.json$/, '')), data);
      return { name: result.key };
    } catch (error) {
      console.error('postData error:', url, error)
      throw new Error('Error posting data: ' + (error?.message || error));
    }
  }

  async function putData(url, data) {
    try {
      await set(ref(db, url.replace(/\.json$/, '')), data);
      return null;
    } catch (error) {
      console.error('putData error:', url, error)
      throw new Error('Error updating data: ' + (error?.message || error));
    }
  }

  async function deleteData(url) {
    try {
      await remove(ref(db, url.replace(/\.json$/, '')));
      return null;
    } catch (error) {
      console.error('deleteData error:', url, error)
      throw new Error('Error deleting data: ' + (error?.message || error));
    }
  }

  async function getAllArticles() {
    try {
      const response = await fetchData('article.json');
      if (typeof response === 'object' && response !== null) {
        const articles = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return articles.sort((a, b) => {
          const dA = Date.parse(a.publishDate)
          const dB = Date.parse(b.publishDate)
          if (isNaN(dA)) return 1
          if (isNaN(dB)) return -1
          if (dB !== dA) return dB - dA
          return b.id.localeCompare(a.id)
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }
  
  async function getArticleDetail(articleId) {
    try {
      const response = await fetchData(`article/${articleId}.json`);
  
      if (response && typeof response === 'object') {
        // Mengonversi respons ke format yang diharapkan
        const article = {
          id: articleId,
          ...response
        };
  
        return article;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching article detail:', error);
      throw error;
    }
  }

  async function getUmkmDetail(umkmId) {
    try {
      const response = await fetchData(`umkm/${umkmId}.json`);
    
      if (response && typeof response === 'object') {
        return { id: umkmId, ...response };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching umkm detail:', error);
      throw error;
    }
  }
  
  async function getAllUmkm() {
    try {
      const response = await fetchData('umkm.json');
      if (typeof response === 'object' && response !== null) {
        const umkms = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return umkms
          .filter(u => u.status === 'approved' || !u.status)
          .sort(compareUmkm);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching UMKM:', error);
      throw error;
    }
  }

  async function getAllUmkmAdmin() {
    try {
      const response = await fetchData('umkm.json');
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })).sort(compareUmkm);
      }
      return [];
    } catch (error) {
      console.error('Error fetching UMKM admin:', error);
      return [];
    }
  }

  async function updateUmkmStatus(id, status) {
    await putData(`umkm/${id}/status.json`, status);
    return { id, status };
  }   

  async function getDataPenduduk() {
    try {
      const response = await fetchData('penduduk.json');
      // console.log('Penduduk Data:', response);
      return response;
    } catch (error) {
      console.error('Error fetching population data:', error);
      throw error;
    }
  }

  async function getAllHayatis() {
    try {
      const response = await fetchData('hayati.json');
      // console.log('Hayati List:', response); // Tambahkan pernyataan log
      // Pastikan response adalah objek
      if (typeof response === 'object' && response !== null) {
        // Ubah objek artikel menjadi array
        const hayatis = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return hayatis;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching hayatis:', error);
      throw error;
    }
  }

  async function getAllNonHayatis() {
    try {
      const response = await fetchData('Nonhayati.json');
      // console.log('Non Hayati List:', response); // Tambahkan pernyataan log
      // Pastikan response adalah objek
      if (typeof response === 'object' && response !== null) {
        // Ubah objek artikel menjadi array
        const nonhayatis = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return nonhayatis;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching nonhayatis:', error);
      throw error;
    }
  }

  async function getAllStrukturs() {
    try {
      const response = await fetchData('struktur.json');
      // console.log('Struktur List:', response);
      if (typeof response === 'object' && response !== null) {
        const strukturs = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return strukturs;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching strukturs:', error);
      throw error;
    }
  }

  async function getAllAgendas() {
    try {
      const response = await fetchData('agenda.json');
      // console.log('Agenda List:', response);
      // Pastikan response adalah objek
      if (typeof response === 'object' && response !== null) {
        // Ubah objek artikel menjadi array
        const agendas = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return agendas;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching agendas:', error);
      throw error;
    }
  }

  async function getAllTogas() {
    try {
      const response = await fetchData('toga.json');
      // console.log('Toga List:', response); // Tambahkan pernyataan log
      // Pastikan response adalah objek
      if (typeof response === 'object' && response !== null) {
        // Ubah objek toga menjadi array
        const togas = Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
        return togas;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching togas:', error);
      throw error;
    }
  }
  
  async function getTogaDetail(togaId) {
    try {
      const response = await fetchData(`toga/${togaId}.json`);
  
      if (response && typeof response === 'object') {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching toga detail:', error);
      throw error;
    }
  }
  
  
  async function createArticle(data) {
    const result = await postData('article.json', data);
    return { id: result.name, ...data };
  }

  async function updateArticle(id, data) {
    await putData(`article/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteArticle(id) {
    return await deleteData(`article/${id}.json`);
  }

  async function createUmkm(data) {
    const result = await postData('umkm.json', data);
    return { id: result.name, ...data };
  }

  async function updateUmkm(id, data) {
    await putData(`umkm/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteUmkm(id) {
    return await deleteData(`umkm/${id}.json`);
  }

  async function createStruktur(data) {
    const result = await postData('struktur.json', data);
    return { id: result.name, ...data };
  }

  async function updateStruktur(id, data) {
    await putData(`struktur/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteStruktur(id) {
    return await deleteData(`struktur/${id}.json`);
  }

  async function createHayati(data) {
    const result = await postData('hayati.json', data);
    return { id: result.name, ...data };
  }

  async function updateHayati(id, data) {
    await putData(`hayati/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteHayati(id) {
    return await deleteData(`hayati/${id}.json`);
  }

  async function createNonHayati(data) {
    const result = await postData('Nonhayati.json', data);
    return { id: result.name, ...data };
  }

  async function updateNonHayati(id, data) {
    await putData(`Nonhayati/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteNonHayati(id) {
    return await deleteData(`Nonhayati/${id}.json`);
  }

  async function createToga(data) {
    const result = await postData('toga.json', data);
    return { id: result.name, ...data };
  }

  async function updateToga(id, data) {
    await putData(`toga/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteToga(id) {
    return await deleteData(`toga/${id}.json`);
  }

  async function getAllVideos() {
    try {
      const response = await fetchData('video.json');
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response)
          .map(key => ({ ...response[key], id: key, order: response[key].order ?? 0 }))
          .sort((a, b) => a.order - b.order);
      }
      return [];
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  async function createVideo(data) {
    const result = await postData('video.json', data);
    return { id: result.name, ...data };
  }

  async function updateVideo(id, data) {
    await putData(`video/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteVideo(id) {
    return await deleteData(`video/${id}.json`);
  }

  async function getAllFotos() {
    try {
      const response = await fetchData('foto.json');
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response)
          .map(key => ({ ...response[key], id: key, order: response[key].order ?? 0 }))
          .sort((a, b) => a.order - b.order);
      }
      return [];
    } catch (error) {
      console.error('Error fetching fotos:', error);
      throw error;
    }
  }

  async function createFoto(data) {
    const result = await postData('foto.json', data);
    return { id: result.name, ...data };
  }

  async function updateFoto(id, data) {
    await putData(`foto/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteFoto(id) {
    return await deleteData(`foto/${id}.json`);
  }

  async function getAllLembagas() {
    try {
      const response = await fetchData('lembaga.json');
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching lembagas:', error);
      throw error;
    }
  }

  async function createLembaga(data) {
    const result = await postData('lembaga.json', data);
    return { id: result.name, ...data };
  }

  async function updateLembaga(id, data) {
    await putData(`lembaga/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteLembaga(id) {
    return await deleteData(`lembaga/${id}.json`);
  }

  async function getAllCarousels() {
    try {
      const response = await fetchData('carousel.json');
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response)
          .map(key => ({ ...response[key], id: key, order: response[key].order ?? response[key].sortOrder ?? 0 }))
          .sort((a, b) => a.order - b.order);
      }
      return [];
    } catch (error) {
      console.error('Error fetching carousels:', error);
      return [];
    }
  }

  async function createCarousel(data) {
    const result = await postData('carousel.json', data);
    return { id: result.name, ...data };
  }

  async function updateCarousel(id, data) {
    await putData(`carousel/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteCarousel(id) {
    return await deleteData(`carousel/${id}.json`);
  }

  async function createAgenda(data) {
    const result = await postData('agenda.json', data);
    return { id: result.name, ...data };
  }

  async function updateAgenda(id, data) {
    await putData(`agenda/${id}.json`, data);
    return { id, ...data };
  }

  async function deleteAgenda(id) {
    return await deleteData(`agenda/${id}.json`);
  }

  async function publicCreateUmkm(data) {
    const payload = { ...data, status: 'pending' };
    const url = `${BASE_URL}/umkm.json`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return { id: result.name, ...payload };
  }

  async function publicCreateMessage(data) {
    const payload = { ...data, createdAt: new Date().toISOString() };
    const url = `${BASE_URL}/pesan.json`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return { id: result.name, ...payload };
  }

  async function getAllMessages() {
    try {
      const snapshot = await get(ref(db, 'pesan'));
      const response = snapshot.val();
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }))
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      }
      return [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async function deleteMessage(id) {
    return await deleteData(`pesan/${id}.json`);
  }

  async function publicCreateComment(articleId, data) {
    const payload = { ...data, createdAt: Date.now() };
    const url = `${BASE_URL}/komentar/${articleId}.json`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return { id: result.name, ...payload };
  }

  async function getComments(articleId) {
    try {
      const response = await fetchData(`komentar/${articleId}.json`);
      if (typeof response === 'object' && response !== null) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }))
          .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      }
      return [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  async function deleteComment(articleId, commentId) {
    return await deleteData(`komentar/${articleId}/${commentId}.json`);
  }

  async function getAllComments() {
    try {
      const response = await fetchData('komentar.json');
      if (typeof response === 'object' && response !== null) {
        const list = [];
        Object.entries(response).forEach(([articleId, comments]) => {
          if (typeof comments === 'object' && comments !== null) {
            Object.keys(comments).forEach(commentId => {
              list.push({ ...comments[commentId], id: commentId, articleId });
            });
          }
        });
        return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      return [];
    } catch (error) {
      console.error('Error fetching all comments:', error);
      return [];
    }
  }

  async function trackVisit() {
    const dateKey = visitKeyFor();
    if (!isNewVisit(dateKey)) return false;
    try {
      await runTransaction(ref(db, 'stats/total'), (current) => (current || 0) + 1);
      await runTransaction(ref(db, `stats/perHari/${dateKey}`), (current) => (current || 0) + 1);
      markVisited(dateKey);
      return true;
    } catch {
      return false;
    }
  }

  function getStats(onUpdate) {
    return onValue(ref(db, 'stats'), (snapshot) => {
      onUpdate(snapshot.val() || {});
    });
  }

  return {
    getAllArticles,
    getArticleDetail,
    createArticle,
    updateArticle,
    deleteArticle,
    getAllUmkm,
    getAllUmkmAdmin,
    getUmkmDetail,
    createUmkm,
    updateUmkm,
    deleteUmkm,
    publicCreateUmkm,
    updateUmkmStatus,
    getAllStrukturs,
    createStruktur,
    updateStruktur,
    deleteStruktur,
    createHayati,
    updateHayati,
    deleteHayati,
    createNonHayati,
    updateNonHayati,
    deleteNonHayati,
    createToga,
    updateToga,
    deleteToga,
    getAllVideos,
    createVideo,
    updateVideo,
    deleteVideo,
    getAllFotos,
    createFoto,
    updateFoto,
    deleteFoto,
    getAllLembagas,
    createLembaga,
    updateLembaga,
    deleteLembaga,
    getAllCarousels,
    createCarousel,
    updateCarousel,
    deleteCarousel,
    createAgenda,
    updateAgenda,
    deleteAgenda,
    getDataPenduduk,
    getAllHayatis,
    getAllNonHayatis,
    getAllAgendas,
    getAllTogas,
    getTogaDetail,
    publicCreateMessage,
    getAllMessages,
    deleteMessage,
    publicCreateComment,
    getComments,
    deleteComment,
    getAllComments,
    trackVisit,
    getStats,
  };  
})();


export default api;