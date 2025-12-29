// Mock API module - returns promises to simulate fetching data from APIs
// note: global fetchMenus removed; menus are provided per-user via fetchMenusByUser


// validate whether a given userCode has access to a menu id
export function validateMenuForUser(userCode, menuId){
  // if no userCode provided, deny access
  if(!userCode) return Promise.resolve(false)

  // coerce menuId to number
  const mid = typeof menuId === 'string' && !isNaN(Number(menuId)) ? Number(menuId) : menuId

  const url = `https://localhost:7003/api/Admin/menus/validate?userCode=${encodeURIComponent(userCode)}&menuId=${encodeURIComponent(mid)}`
  return fetchJson(url).then(data => !!data)
}

// fetchMenusByRole - returns menus based on role
// fetchMenusByRole removed; role handling is server-side and not used in UI mock

export function fetchProjects() {
  const url = 'https://localhost:7003/api/Projects'
  return fetchJson(url).then(data => {
    if (!Array.isArray(data)) return []
    return data.map(p => ({ id: p.id, name: p.name ?? p.projectName ?? String(p.id) }))
  })
}

// fetchRoles removed; roles are managed by backend

export function fetchUsers() {
  const url = 'https://localhost:7003/api/Admin/users'
  return fetchJson(url).then(data => {
    if (!Array.isArray(data)) return []
    return data.map(u => ({ id: u.id, label: u.userName || u.userCode || String(u.id), userCode: u.userCode }))
  })
}

// fetchMenusByUser - returns menus based on a userCode
export function fetchMenusByUser(userCode){
  // if no userCode provided, return empty list
  if(!userCode) return Promise.resolve([])
  const url = `https://localhost:7003/api/Admin/menus?userCode=${encodeURIComponent(userCode)}`
  return fetchJson(url).then(data => {
    if(!Array.isArray(data)) return []
    return data.map(m => ({
      id: m.id,
      label: m.label,
      url: m.url,
      icon: m.icon,
      isquickMenu: !!(m.isQuickMenu ?? m.isquickMenu)
    }))
  })
}

export function fetchMetrics() {
  const url = 'https://localhost:7003/api/Metrics'
  return fetchJson(url).then(data => {
    if (!Array.isArray(data)) return []
    return data.map(m => ({
      id: m.id ?? m.key ?? String(m.label),
      value: m.value ?? m.count ?? 0,
      label: m.label ?? m.name ?? '',
      color: m.color ?? '#999999',
      icon: m.icon ?? m.iconName ?? ''
    }))
  })
}

// --- internal helper: dedupe in-flight requests and cache responses ---
const _inFlight = new Map()
const _cache = new Map()

function fetchJson(url, options = {}){
  // return cached value if present
  if(_cache.has(url)){
    return Promise.resolve(_cache.get(url))
  }

  // if request already in-flight, return the same promise
  if(_inFlight.has(url)){
    return _inFlight.get(url)
  }

  const p = fetch(url, options)
    .then(res => {
      if(!res.ok) throw new Error(`Request failed: ${res.status}`)
      return res.json()
    })
    .then(json => {
      _cache.set(url, json)
      _inFlight.delete(url)
      return json
    })
    .catch(err => {
      _inFlight.delete(url)
      throw err
    })

  _inFlight.set(url, p)
  return p
}



// fetchTablePreview for a project with pagination
export function fetchTablePreview(projectId, page = 1, pageSize = 10){
  if(!projectId) return Promise.resolve({ items: [], totalCount: 0, page, pageSize })
  const url = `https://localhost:7003/api/Projects/${encodeURIComponent(projectId)}/apartments/report?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
  return fetchJson(url).then(data => ({
    items: Array.isArray(data?.items) ? data.items : [],
    totalCount: typeof data?.totalCount === 'number' ? data.totalCount : (Array.isArray(data) ? data.length : 0),
    page: data?.page ?? page,
    pageSize: data?.pageSize ?? pageSize
  }))
}
