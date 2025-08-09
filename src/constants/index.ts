// Rotas da aplicação
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
  PROPERTIES: "/dashboard/properties",
  CONTRACTS: "/dashboard/contracts",
  PAYMENTS: "/dashboard/payments",
  TENANTS: "/dashboard/tenants",
  OWNERS: "/dashboard/owners",
  PROFILE: "/dashboard/profile",
  SETTINGS: "/dashboard/settings",
} as const;

// Status de contratos
export const CONTRACT_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  EXPIRED: "expired",
  TERMINATED: "terminated",
} as const;

// Status de pagamentos
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
} as const;

// Tipos de propriedade
export const PROPERTY_TYPES = {
  APARTMENT: "apartment",
  HOUSE: "house",
  STUDIO: "studio",
  COMMERCIAL: "commercial",
} as const;

// Roles de usuário
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  TENANT: "tenant",
  OWNER: "owner",
} as const;

// Configurações de navegação
export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: "LayoutDashboard",
  },
  {
    title: "Propriedades",
    href: ROUTES.PROPERTIES,
    icon: "Building2",
  },
  {
    title: "Contratos",
    href: ROUTES.CONTRACTS,
    icon: "FileText",
  },
  {
    title: "Pagamentos",
    href: ROUTES.PAYMENTS,
    icon: "CreditCard",
  },
  {
    title: "Inquilinos",
    href: ROUTES.TENANTS,
    icon: "Users",
  },
  {
    title: "Proprietários",
    href: ROUTES.OWNERS,
    icon: "UserCheck",
  },
] as const;
