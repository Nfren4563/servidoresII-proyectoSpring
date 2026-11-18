export type TabType = "productos" | "almacenes" | "existencias" | "movimientos";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  conteos: {
    productos: number;
    almacenes: number;
    existencias: number;
    movimientos: number;
  };
}

export function Sidebar({ activeTab, onTabChange, conteos }: SidebarProps) {
  const navItems: { id: TabType; label: string; count: number; icon: React.ReactNode }[] = [
    {
      id: "productos",
      label: "Catálogo de Productos",
      count: conteos.productos,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      id: "almacenes",
      label: "Almacenes y Sucursales",
      count: conteos.almacenes,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9h1" />
          <path d="M9 13h1" />
          <path d="M9 17h1" />
        </svg>
      ),
    },
    {
      id: "existencias",
      label: "Existencias en Stock",
      count: conteos.existencias,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: "movimientos",
      label: "Historial de Movimientos",
      count: conteos.movimientos,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-box">
        <div className="brand-mark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <div className="brand-copy">
          <span className="brand-name">Inventario</span>
          <span className="brand-badge">Sistema</span>
        </div>
      </div>

      {/* Nav Section */}
      <div className="sidebar-section-title">MÓDULOS DEL SISTEMA</div>
      <nav className="sidebar-menu">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`menu-button ${isActive ? "active" : ""}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              <span className="menu-count">{item.count}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-indicator"></span>
          <span className="status-label">Backend Spring Boot activo</span>
        </div>
      </div>
    </aside>
  );
}
