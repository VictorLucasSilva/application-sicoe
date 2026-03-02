/**
 * SICOE - Página de Teste de Modais (Sprint 1)
 * Esta página serve para testar todos os modais implementados
 */

import { useState } from 'react';
import {
  ConfirmModal,
  LoadingModal,
  FilterModal,
  EditUserModal,
  EstablishmentAccessModal,
  ReleaseAccessModal,
} from '@/components/modals';
import DatePicker from '@/components/common/DatePicker';
import Autocomplete from '@/components/common/Autocomplete';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import Button from '@/components/common/Button';
import type { User } from '@/types';
import styles from './TestModals.module.css';

// Mock data
const mockGroupOptions: AutocompleteOption[] = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Auditor' },
  { value: 3, label: 'Gerente Regional' },
  { value: 4, label: 'Usuário' },
  { value: 5, label: 'Sem Acesso' },
];

const mockEstablishmentOptions: AutocompleteOption[] = [
  { value: 1, label: 'Estabelecimento 1 - Centro' },
  { value: 2, label: 'Estabelecimento 2 - Norte' },
  { value: 3, label: 'Estabelecimento 3 - Sul' },
  { value: 4, label: 'Estabelecimento 4 - Leste' },
  { value: 5, label: 'Estabelecimento 5 - Oeste' },
];

const mockUser: User = {
  id: 1,
  numEmployee: '12345',
  username: 'joao.silva',
  firstName: 'João',
  lastName: 'Silva',
  fullName: 'João Silva',
  email: 'joao.silva@bb.com.br',
  flgActive: true,
  flgStatusEmail: true,
  dtExpiration: '2024-12-31',
  tsCreation: '2024-01-01',
  tsUpdated: '2024-01-15',
  tsLastLogin: '2024-02-27',
  groups: [{ id: 4, nmGroup: 'Usuário', tsCreation: '2024-01-01', tsUpdated: '2024-01-01' }],
  establishments: [
    {
      id: 1,
      sqEstablishment: '001',
      nmEstablishment: 'Estabelecimento 1 - Centro',
      tsCreation: '2024-01-01',
      tsUpdated: '2024-01-01'
    }
  ],
};

const mockUsersPending: User[] = [
  {
    id: 10,
    numEmployee: '99999',
    username: 'maria.santos',
    firstName: 'Maria',
    lastName: 'Santos',
    fullName: 'Maria Santos',
    email: 'maria.santos@bb.com.br',
    flgActive: false,
    flgStatusEmail: false,
    tsCreation: '2024-02-20',
    tsUpdated: '2024-02-20',
    groups: [{ id: 5, nmGroup: 'Sem Acesso', tsCreation: '2024-02-20', tsUpdated: '2024-02-20' }],
    establishments: [],
  },
];

export default function TestModals() {
  // Confirm Modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmResult, setConfirmResult] = useState('');

  // Loading Modal
  const [showLoading, setShowLoading] = useState(false);

  // Filter Modal
  const [showFilter, setShowFilter] = useState(false);

  // Edit User Modal
  const [showEditUser, setShowEditUser] = useState(false);

  // Establishment Access Modal
  const [showEstablishment, setShowEstablishment] = useState(false);

  // Release Access Modal
  const [showRelease, setShowRelease] = useState(false);

  // DatePicker
  const [selectedDate, setSelectedDate] = useState('');

  // Autocomplete
  const [selectedGroup, setSelectedGroup] = useState<string | number>('');
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🧪 Teste de Modais - Sprint 1</h1>
        <p className={styles.subtitle}>
          Página de teste para validar todos os componentes e modais implementados
        </p>
      </div>

      <div className={styles.sections}>
        {/* Componentes Base */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📦 Componentes Base</h2>

          <div className={styles.testGroup}>
            <h3>DatePicker</h3>
            <DatePicker
              label="Data de Teste"
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="dd/mm/aaaa"
            />
            {selectedDate && (
              <div className={styles.result}>✅ Selecionado: {selectedDate}</div>
            )}
          </div>

          <div className={styles.testGroup}>
            <h3>Autocomplete (Single)</h3>
            <Autocomplete
              label="Selecione um Perfil"
              options={mockGroupOptions}
              value={selectedGroup}
              onChange={(value) => setSelectedGroup(value)}
              placeholder="Escolha um perfil..."
            />
            {selectedGroup && (
              <div className={styles.result}>✅ Selecionado: {selectedGroup}</div>
            )}
          </div>

          <div className={styles.testGroup}>
            <h3>Autocomplete (Multi)</h3>
            <Autocomplete
              label="Selecione Múltiplos Perfis"
              options={mockGroupOptions}
              selectedValues={selectedGroups}
              onChange={() => {}}
              onMultiChange={(values) => setSelectedGroups(values)}
              placeholder="Escolha perfis..."
              multiSelect
            />
            {selectedGroups.length > 0 && (
              <div className={styles.result}>
                ✅ Selecionados: {selectedGroups.length} item(s)
              </div>
            )}
          </div>
        </section>

        {/* Modais Simples */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💬 Modais Simples</h2>

          <div className={styles.testGroup}>
            <h3>ConfirmModal</h3>
            <Button onClick={() => setShowConfirm(true)}>
              Abrir Modal de Confirmação
            </Button>
            {confirmResult && (
              <div className={styles.result}>✅ Resultado: {confirmResult}</div>
            )}
          </div>

          <div className={styles.testGroup}>
            <h3>LoadingModal</h3>
            <Button onClick={() => {
              setShowLoading(true);
              setTimeout(() => setShowLoading(false), 3000);
            }}>
              Mostrar Loading (3s)
            </Button>
          </div>
        </section>

        {/* Modais de Usuário */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👥 Modais de Usuário</h2>

          <div className={styles.testGroup}>
            <h3>FilterModal</h3>
            <Button onClick={() => setShowFilter(true)}>
              Abrir Filtros (Lateral Direito)
            </Button>
          </div>

          <div className={styles.testGroup}>
            <h3>EditUserModal</h3>
            <Button onClick={() => setShowEditUser(true)}>
              Editar Usuário
            </Button>
          </div>

          <div className={styles.testGroup}>
            <h3>EstablishmentAccessModal</h3>
            <Button onClick={() => setShowEstablishment(true)}>
              Gerenciar Estabelecimentos
            </Button>
          </div>

          <div className={styles.testGroup}>
            <h3>ReleaseAccessModal</h3>
            <Button onClick={() => setShowRelease(true)}>
              Liberar Acesso
            </Button>
          </div>
        </section>
      </div>

      {/* Modais */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setConfirmResult('Confirmado em ' + new Date().toLocaleTimeString());
          setShowConfirm(false);
        }}
        title="Confirmar Ação"
        message="Você tem certeza que deseja realizar esta ação? Esta operação não pode ser desfeita."
      />

      <LoadingModal
        isOpen={showLoading}
        message="Salvando dados..."
      />

      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters) => {
          console.log('Filtros aplicados:', filters);
          setShowFilter(false);
        }}
        onClear={() => console.log('Filtros limpos')}
        nameOptions={mockEstablishmentOptions}
        profileOptions={[
          { value: 1, label: 'Administrador' },
          { value: 2, label: 'Auditor' },
          { value: 3, label: 'Gerente Regional' },
          { value: 4, label: 'Usuário' },
        ]}
        statusOptions={[
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
        ]}
        emailStatusOptions={[
          { value: 'enabled', label: 'Habilitado' },
          { value: 'disabled', label: 'Desabilitado' },
        ]}
      />

      <EditUserModal
        isOpen={showEditUser}
        onClose={() => setShowEditUser(false)}
        onSuccess={() => {
          console.log('Usuário editado com sucesso!');
          setShowEditUser(false);
        }}
        user={mockUser}
        groupOptions={mockGroupOptions}
      />

      <EstablishmentAccessModal
        isOpen={showEstablishment}
        onClose={() => setShowEstablishment(false)}
        onSuccess={() => {
          console.log('Estabelecimentos atualizados!');
          setShowEstablishment(false);
        }}
        user={mockUser}
        establishmentOptions={mockEstablishmentOptions}
      />

      <ReleaseAccessModal
        isOpen={showRelease}
        onClose={() => setShowRelease(false)}
        onSuccess={() => {
          console.log('Acesso liberado!');
          setShowRelease(false);
        }}
        usersPendingAccess={mockUsersPending}
        groupOptions={mockGroupOptions.filter(g => g.value !== 5)}
      />
    </div>
  );
}
