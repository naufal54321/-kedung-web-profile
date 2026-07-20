const api = (() => {
  const BASE_URL = 'https://kedung-api-7eaed-default-rtdb.asia-southeast1.firebasedatabase.app';

  async function fetchData(url) {
    try {
      const response = await fetch(`${BASE_URL}/${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  }

  async function getAllArticles() {
    try {
      const response = await fetchData('article.json');
      // console.log('Article List:', response); // Tambahkan pernyataan log
      // Pastikan response adalah objek
      if (typeof response === 'object' && response !== null) {
        // Ubah objek artikel menjadi array
        const articles = Object.keys(response).map(key => ({
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti artikel
        }));
        return articles;
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
      // console.log('UMKM List:', response);
    
      if (response && typeof response === 'object') {
        return response; // Kembalikan respons langsung, tanpa perlu membungkusnya
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
      // console.log('UMKM List:', response); // Tambahkan pernyataan log
      // Pastikan response adalah objek
      if (typeof response === 'object' && response !== null) {
        // Ubah objek umkm menjadi array
        const umkms = Object.keys(response).map(key => ({
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti umkm
        }));
        return umkms;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching UMKM:', error);
      throw error;
    }
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
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti artikel
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
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti artikel
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
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti artikel
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
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti artikel
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
          id: key, // Gunakan kunci sebagai ID
          ...response[key] // Sisipkan semua properti toga
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
  
  
  return {
    getAllArticles,
    getArticleDetail,
    getAllUmkm,
    getDataPenduduk,
    getAllHayatis,
    getAllNonHayatis,
    getAllStrukturs,
    getUmkmDetail,
    getAllAgendas,
    getAllTogas,
    getTogaDetail,
  };  
})();


export default api;