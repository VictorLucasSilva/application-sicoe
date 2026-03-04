import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Button from '@/components/common/Button';
import ButtonOptions from '@/components/common/ButtonOptions';
import Autocomplete from '@/components/common/Autocomplete';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import DatePicker from '@/components/common/DatePicker';
import { usersService } from '@/services/api/usersService';
import type { User } from '@/types';
import styles from './ReleaseAccessModal.module.css';

interface ReleaseAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRequestSave?: (saveFunction: () => Promise<void>) => void;
  usersPendingAccess: User[]; 
  groupOptions: AutocompleteOption[]; 
  loadingUsers?: boolean;
}

export default function ReleaseAccessModal({
  isOpen,
  onClose,
  onSuccess,
  onRequestSave,
  usersPendingAccess,
  groupOptions,
  loadingUsers = false
}: ReleaseAccessModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | string>('');
  const [expirationDate, setExpirationDate] = useState('');
  const [userStatus, setUserStatus] = useState<(string | number)[]>(['active']);
  const [emailStatus, setEmailStatus] = useState<(string | number)[]>(['enabled']);
  const [error, setError] = useState<string>('');

  const selectedUser = usersPendingAccess.find(u => u.id === Number(selectedUserId));

  
  const userOptions: AutocompleteOption[] = usersPendingAccess.map(user => ({
    value: user.id,
    label: `${user.fullName} (${user.username})`
  }));

  
  useEffect(() => {
    if (!isOpen) {
      setSelectedUserId('');
      setSelectedGroupId('');
      setExpirationDate('');
      setUserStatus(['active']);
      setEmailStatus(['enabled']);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (!selectedUserId) {
      setError('Selecione um usuário');
      return;
    }

    if (!selectedGroupId) {
      setError('Selecione um perfil');
      return;
    }

    
    if (onRequestSave) {
      onRequestSave(async () => {
        const userId = Number(selectedUserId);
        const groupId = Number(selectedGroupId);

        
        const user = usersPendingAccess.find(u => u.id === userId);
        const currentGroupId = user?.groups?.[0]?.id;

        
        if (currentGroupId) {
          await usersService.removeGroup(userId, currentGroupId);
        }

        
        await usersService.addGroup(userId, groupId);

        
        await usersService.updateUser(userId, {
          dtExpiration: expirationDate || undefined,
          flgActive: userStatus.includes('active'),
          flgStatusEmail: emailStatus.includes('enabled')
        });

        
        onClose();
        onSuccess();
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Liberar Acesso"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.description}>
          Selecione um usuário sem acesso e atribua um perfil para liberar o acesso ao sistema.
        </div>

        {}
        <div className={styles.field}>
          <Autocomplete
            label="Usuário"
            options={userOptions}
            value={selectedUserId}
            onChange={(value) => {
              setSelectedUserId(value);
              setError('');
            }}
            placeholder="Selecione o usuário..."
            required
            disabled={loadingUsers}
            loading={loadingUsers}
            error={error && !selectedUserId ? error : undefined}
            emptyMessage={
              loadingUsers
                ? 'Carregando usuários...'
                : 'Nenhum usuário sem acesso encontrado'
            }
          />
        </div>

        {}
        <div className={styles.field}>
          <Autocomplete
            label="Perfil"
            options={groupOptions}
            value={selectedGroupId}
            onChange={(value) => {
              setSelectedGroupId(value);
              setError('');
            }}
            placeholder="Selecione o perfil..."
            required
            disabled={!selectedUserId}
            error={error && !selectedGroupId && Boolean(selectedUserId) ? error : undefined}
          />
        </div>

        {}
        <div className={styles.field}>
          <DatePicker
            label="Fim da Vigência (opcional)"
            value={expirationDate}
            onChange={setExpirationDate}
            placeholder="dd/mm/aaaa"
            disabled={!selectedUserId}
            minDate={new Date().toISOString().split('T')[0]}
          />
        </div>

        {}
        <div className={styles.field}>
          <ButtonOptions
            label="Status"
            options={[
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' },
            ]}
            value={userStatus}
            onChange={setUserStatus}
            multiSelect={false}
            disabled={!selectedUserId}
          />
        </div>

        {}
        <div className={styles.field}>
          <ButtonOptions
            label="Envio de Email"
            options={[
              { value: 'enabled', label: 'Habilitado' },
              { value: 'disabled', label: 'Desabilitado' },
            ]}
            value={emailStatus}
            onChange={setEmailStatus}
            multiSelect={false}
            disabled={!selectedUserId}
          />
        </div>

        {}
        {selectedUser && (
          <div className={styles.userInfo}>
            <div className={styles.infoLabel}>Usuário selecionado:</div>
            <div className={styles.infoItem}>
              <strong>Nome:</strong> {selectedUser.fullName}
            </div>
            <div className={styles.infoItem}>
              <strong>Login:</strong> {selectedUser.username}
            </div>
            <div className={styles.infoItem}>
              <strong>Email:</strong> {selectedUser.email || 'N/A'}
            </div>
          </div>
        )}

        {}
        {error && selectedUserId && selectedGroupId && (
          <div className={styles.errorBox}>{error}</div>
        )}

        {}
        <div className={styles.footer}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={false}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loadingUsers || !selectedUserId || !selectedGroupId}
          >
            Liberar Acesso
          </Button>
        </div>
      </form>
    </Modal>
  );
}
