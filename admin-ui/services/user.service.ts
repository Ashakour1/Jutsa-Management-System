import { apiClient } from "@/lib/api-client";

export type RoleRef = { id: string; name: string };

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  status: string;
  roles: RoleRef[];
  permissions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PermissionDto {
  id: string;
  name: string;
  module: string;
  description?: string | null;
}

export interface RoleCatalogItem {
  id: string;
  name: string;
  description?: string | null;
  permissionIds: string[];
  permissions: { id: string; name: string; module: string }[];
  /** Users with this role (server may omit when loading inline pickers) */
  assignedUserCount?: number;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  username?: string;
  roleName?: string;
  roleIds?: string[];
  newRole?: {
    name: string;
    description?: string;
    permissionIds: string[];
  };
}

export interface LoginResponse {
  token: string;
  user: User;
  success?: boolean;
  message?: string;
}

export const userService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/users/auth/login",
      credentials
    );
    if (typeof window !== "undefined" && response.token) {
      localStorage.setItem("token", response.token);
      const u = response.user as User | undefined;
      if (u) {
        localStorage.setItem("user", JSON.stringify(u));
      }
    }
    return response;
  },

  register: async (data: RegisterData): Promise<User> => {
    return apiClient.post<User>("/users/auth/reg", data);
  },

  getRolesCatalog: async (): Promise<RoleCatalogItem[]> => {
    return apiClient.get<RoleCatalogItem[]>("/roles");
  },

  getPermissionsCatalog: async (): Promise<PermissionDto[]> => {
    return apiClient.get<PermissionDto[]>("/roles/permissions/catalog");
  },

  createRole: async (body: {
    name: string;
    description?: string;
    permissionIds: string[];
  }): Promise<RoleCatalogItem> => {
    return apiClient.post<RoleCatalogItem>("/roles", body);
  },

  getRole: async (
    id: string
  ): Promise<RoleCatalogItem & { assignedUserCount: number }> => {
    return apiClient.get(`/roles/${id}`);
  },

  updateRole: async (
    id: string,
    body: {
      name?: string;
      description?: string | null;
      permissionIds?: string[];
    }
  ): Promise<RoleCatalogItem> => {
    return apiClient.put<RoleCatalogItem>(`/roles/${id}`, body);
  },

  deleteRole: async (id: string): Promise<void> => {
    await apiClient.delete(`/roles/${id}`);
  },

  getUsers: async (): Promise<User[]> => {
    return apiClient.get<User[]>("/users");
  },

  getUser: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },

  updateUser: async (
    id: string,
    data: Partial<User> & { roleIds?: string[]; password?: string }
  ): Promise<User> => {
    return apiClient.put<User>(`/users/edit/${id}`, data);
  },

  deleteUser: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`);
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getEffectivePermissions(): string[] {
    return this.getCurrentUser()?.permissions ?? [];
  },

  getRoleNames(): string[] {
    const u = this.getCurrentUser();
    if (!u?.roles?.length) return [];
    return u.roles.map((r) => r.name);
  },

  hasAnyAssignedRole(): boolean {
    const u = this.getCurrentUser();
    return Boolean(u?.roles && u.roles.length > 0);
  },

  hasAnyRole(...names: string[]): boolean {
    const set = new Set(this.getRoleNames());
    return names.some((n) => set.has(n));
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },
};
