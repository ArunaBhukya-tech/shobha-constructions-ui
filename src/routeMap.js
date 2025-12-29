// Central route map for menu ids -> paths
export function resolvePath(id){
  // accept either numeric id or string id
  const mid = typeof id === 'string' && !isNaN(Number(id)) ? Number(id) : id
  switch(mid){
    case 1: return '/dashboard'
    case 2: return '/new'
    case 3: return '/view'
    case 4: return '/bulk'
    case 5: return '/reports'
    case 'dashboard': return '/dashboard'
    case 'new': return '/new'
    case 'view': return '/view'
    case 'bulk': return '/bulk'
    case 'reports': return '/reports'
    default: return '/dashboard'
  }
}

export function getFirstPathFromMenus(menus){
  if(!menus) return '/dashboard'
  // handle array or object with main/quick
  if(Array.isArray(menus)){
    const first = menus[0]
    return first?.url || resolvePath(first?.id)
  }
  const first = (menus.main && menus.main.length>0) ? menus.main[0] : (menus.quick && menus.quick.length>0 ? menus.quick[0] : null)
  return first ? (first.url || resolvePath(first.id)) : '/dashboard'
}
