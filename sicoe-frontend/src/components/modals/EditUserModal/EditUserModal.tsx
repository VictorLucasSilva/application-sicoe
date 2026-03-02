import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Button from '@/components/common/Button';
import ButtonOptions from '@/components/common/ButtonOptions';
import DatePicker from '@/components/common/DatePicker';
import Autocomplete from '@/components/common/Autocomplete';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import { usersService } from '@/services/api/usersService';
import type { User } from '@/types';
import styles from './EditUserModal.module.css';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRequestSave?: (saveFunction: () => Promise<void>) => void;
  user: User | null;
  groupOptions?: AutocompleteOption[];
}

export default function EditUserModal({
  isOpen,
  onClose,
  onSuccess,
  onRequestSave,
  user,
  groupOptions = []
}: EditUserModalProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<number | string>('');
  const [expirationDate, setExpirationDate] = useState('');
  const [emailStatus, setEmailStatus] = useState<(string | number)[]>([]);
  const [userStatus, setUserStatus] = useState<(string | number)[]>([]);
  const [error, setError] = useState<string>('');

  // Preencher campos quando user mudar
  useEffect(() => {
    if (user && isOpen) {
      // Pegar o primeiro grupo do usuário
      const currentGroup = user.groups?.[0];
      setSelectedGroupId(currentGroup?.id || '');
      setExpirationDate(user.dtExpiration || '');
      setEmailStatus(user.flgStatusEmail ? ['enabled'] : ['disabled']);
      setUserStatus(user.flgActive ? ['active'] : ['inactive']);
      setError('');
    }
  }, [user, isOpen]);

  // Limpar ao fechar
  useEffect(() => {
    if (!isOpen) {
      setSelectedGroupId('');
      setExpirationDate('');
      setEmailStatus([]);
      setUserStatus([]);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    // Validação
    if (!selectedGroupId) {
      setError('Perfil é obrigatório');
      return;
    }

    // Chamar callback para página principal mostrar confirmação
    if (onRequestSave) {
      onRequestSave(async () => {
        if (!user) throw new Error('Usuário não encontrado');

        // 1. Atualizar dados básicos do usuário
        await usersService.updateUser(user.id, {
          dtExpiration: expirationDate || undefined,
          flgStatusEmail: emailStatus.includes('enabled'),
          flgActive: userStatus.includes('active')
        });

        // 2. Se o grupo mudou, atualizar grupo
        const currentGroupId = user.groups?.[0]?.id;
        if (currentGroupId && currentGroupId !== selectedGroupId) {
          // Remover grupo antigo
          await usersService.removeGroup(user.id, currentGroupId);
          // Adicionar novo grupo
          await usersService.addGroup(user.id, Number(selectedGroupId));
        } else if (!currentGroupId && selectedGroupId) {
          // Adicionar grupo se não tinha
          await usersService.addGroup(user.id, Number(selectedGroupId));
        }

        // Fechar modal e chamar onSuccess
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
      title="Editar Usuário"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Usuário (read-only - centralizado) */}
        <div className={styles.userField}>
          <label className={styles.userLabel}>Usuário</label>
          <div className={styles.userValue}>
            {user?.fullName || 'N/A'}
          </div>
        </div>

        {/* Perfil */}
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
            disabled={false}
            error={error && !selectedGroupId ? error : undefined}
          />
        </div>

        {/* Data de Fim da Vigência */}
        <div className={styles.field}>
          <DatePicker
            label="Fim da Vigência"
            value={expirationDate}
            onChange={setExpirationDate}
            placeholder="dd/mm/aaaa"
            disabled={false}
            minDate={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Status */}
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
          />
        </div>

        {/* Envio de Email */}
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
          />
        </div>

        {/* Error message */}
        {error && selectedGroupId && (
          <div className={styles.errorBox}>{error}</div>
        )}

        {/* Footer com botões */}
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
            disabled={false}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
