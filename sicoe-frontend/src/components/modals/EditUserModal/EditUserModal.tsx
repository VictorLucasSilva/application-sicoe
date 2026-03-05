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


  useEffect(() => {
    if (user && isOpen) {

      const currentGroup = user.groups?.[0];
      setSelectedGroupId(currentGroup?.id || '');
      setExpirationDate(user.dtExpiration || '');
      setEmailStatus(user.flgStatusEmail ? ['enabled'] : ['disabled']);
      setUserStatus(user.flgActive ? ['active'] : ['inactive']);
      setError('');
    }
  }, [user, isOpen]);


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


    if (!selectedGroupId) {
      setError('Perfil é obrigatório');
      return;
    }


    if (onRequestSave) {
      onRequestSave(async () => {
        if (!user) throw new Error('Usuário não encontrado');


        await usersService.updateUser(user.id, {
          dtExpiration: expirationDate || undefined,
          flgStatusEmail: emailStatus.includes('enabled'),
          flgActive: userStatus.includes('active')
        });


        const currentGroupId = user.groups?.[0]?.id;
        if (currentGroupId && currentGroupId !== selectedGroupId) {

          await usersService.removeGroup(user.id, currentGroupId);

          await usersService.addGroup(user.id, Number(selectedGroupId));
        } else if (!currentGroupId && selectedGroupId) {

          await usersService.addGroup(user.id, Number(selectedGroupId));
        }


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
        {}
        <div className={styles.userField}>
          <label className={styles.userLabel}>Usuário</label>
          <div className={styles.userValue}>
            {user?.fullName || 'N/A'}
          </div>
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
            disabled={false}
            error={error && !selectedGroupId ? error : undefined}
          />
        </div>

        {}
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
          />
        </div>

        {}
        {error && selectedGroupId && (
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
            disabled={false}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
