import { useState } from 'react';
import { PageBanner } from '@/components/ui/PageBanner';
import { ImportAdminTab } from '@/features/admin/components/ImportAdminTab';
import { MaterialsAdminTab } from '@/features/admin/components/MaterialsAdminTab';
import { SectionsAdminTab } from '@/features/admin/components/SectionsAdminTab';
import { useAuth } from '@/features/auth/useAuth';

type AdminTab = 'sections' | 'materials' | 'import';

const adminTabs: Array<{ id: AdminTab; label: string }> = [
  { id: 'sections', label: 'Розділи' },
  { id: 'materials', label: 'Матеріали' },
  { id: 'import', label: 'Імпорт' },
];

export function AdminPage() {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('sections');

  return (
    <div className="page-stack">
      <PageBanner
        eyebrow="Адмін-панель"
        title="Керування довідником"
        description="Створення й редагування розділів, рас, класів і предметів."
      />

      <section className="admin-shell">
        <div className="admin-meta">
          <span>Користувач: {profile?.email ?? 'невідомо'}</span>
          <span>Роль: {profile?.role ?? 'немає'}</span>
          <button type="button" className="secondary-button" onClick={() => void signOut()}>
            Вийти
          </button>
        </div>

        <div className="admin-tabs" role="tablist" aria-label="Розділи адмін-панелі">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'sections' ? <SectionsAdminTab /> : null}
        {activeTab === 'materials' ? <MaterialsAdminTab /> : null}
        {activeTab === 'import' ? <ImportAdminTab /> : null}
      </section>
    </div>
  );
}
