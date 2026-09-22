import { useState } from 'react';
import { Shield, User, Edit2, Trash2, Plus } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  permissions: string[];
  userCount: number;
}

const defaultPermissions = [
  'products.view', 'products.edit', 'products.delete',
  'orders.view', 'orders.edit', 'orders.delete',
  'customers.view', 'customers.edit',
  'analytics.view',
  'settings.view', 'settings.edit',
];

const mockRoles: Role[] = [
  { id: '1', name: 'Super Admin', permissions: defaultPermissions, userCount: 1 },
  { id: '2', name: 'Manager', permissions: ['products.view', 'products.edit', 'orders.view', 'orders.edit', 'customers.view', 'analytics.view'], userCount: 3 },
  { id: '3', name: 'Vendeur', permissions: ['products.view', 'orders.view', 'orders.edit', 'customers.view'], userCount: 5 },
  { id: '4', name: 'Inventaire', permissions: ['products.view', 'products.edit'], userCount: 2 },
];

export default function RoleManager() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  return (
    <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield size={20} className="text-[#D4A853]" />
          Gestion des rôles
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg text-sm font-semibold hover:brightness-110 transition-all">
          <Plus size={16} />
          Nouveau rôle
        </button>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.id} className="p-4 bg-[#0A0A0B] rounded-lg border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-[#D4A853]" />
                <div>
                  <p className="font-semibold text-white">{role.name}</p>
                  <p className="text-xs text-gray-500">{role.userCount} utilisateur(s)</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingRole(role)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((perm) => (
                <span key={perm} className="text-xs px-2 py-1 bg-[#D4A853]/10 text-[#D4A853] rounded-full">
                  {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
