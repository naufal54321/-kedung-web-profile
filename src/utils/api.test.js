import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: () => {}
}))

vi.mock('./firebase', () => ({
  auth: { currentUser: { getIdToken: async () => 'test-token' } },
  databaseURL: 'https://test-db.firebaseio.com'
}))

import api from './api'

const mockFetch = () => vi.fn(() => Promise.resolve({
  ok: true,
  status: 200,
  statusText: 'OK',
  json: async () => ({})
}))

describe('api', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch())
  })

  it('fetchData tidak mengirim header Authorization dan URL tanpa ?auth=', async () => {
    await api.getAllArticles()
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/article.json')
    expect(url).not.toContain('auth=')
    expect(init).toBeUndefined()
  })

  it('postData mengirim Authorization Bearer tanpa ?auth= di URL', async () => {
    await api.createArticle({ title: 'Berita' })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/article.json')
    expect(url).not.toContain('auth=')
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe('Bearer test-token')
  })

  it('putData mengirim Authorization Bearer tanpa ?auth= di URL', async () => {
    await api.updateUmkmStatus('abc', 'approved')
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/umkm/abc/status.json')
    expect(url).not.toContain('auth=')
    expect(init.method).toBe('PUT')
    expect(init.headers.Authorization).toBe('Bearer test-token')
  })

  it('deleteData mengirim Authorization Bearer tanpa ?auth= di URL', async () => {
    await api.deleteArticle('abc')
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/article/abc.json')
    expect(url).not.toContain('auth=')
    expect(init.method).toBe('DELETE')
    expect(init.headers.Authorization).toBe('Bearer test-token')
  })

  it('publicCreateUmkm tidak mengirim header Authorization', async () => {
    await api.publicCreateUmkm({ name: 'Toko Baru' })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/umkm.json')
    expect(init.headers.Authorization).toBeUndefined()
  })
})
