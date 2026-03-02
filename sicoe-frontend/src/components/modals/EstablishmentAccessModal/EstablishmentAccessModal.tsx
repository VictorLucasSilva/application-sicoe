import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Button from '@/components/common/Button';
import Autocomplete from '@/components/common/Autocomplete';
import type { AutocompleteOption } from '@/components/common/Autocomplete';
import { usersService } from '@/services/api/usersService';
import type { User } from '@/types';
import styles from './EstablishmentAccessModal.module.css';

interface EstablishmentAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRequestSave?: (saveFunction: () => Promise<void>) => void;
  user: User | null;
  establishmentOptions?: AutocompleteOption[];
  loadingEstablishments?: boolean;
}

export default function EstablishmentAccessModal({
  isOpen,
  onClose,
  onSuccess,
  onRequestSave,
  user,
  establishmentOptions = [],
  loadingEstablishments = false
}: EstablishmentAccessModalProps) {
  const [selectedEstablishmentIds, setSelectedEstablishmentIds] = useState<number[]>([]);
  const [error, setError] = useState<string>('');

  // Preencher estabelecimentos já vinculados ao usuário
  useEffect(() => {
    if (user && isOpen) {
      const currentEstablishmentIds = user.establishments?.map(est => est.id) || [];
      setSelectedEstablishmentIds(currentEstablishmentIds);
      setError('');
    }
  }, [user, isOpen]);

  // Limpar ao fechar
  useEffect(() => {
    if (!isOpen) {
      setSelectedEstablishmentIds([]);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    // Validação
    if (selectedEstablishmentIds.length === 0) {
      setError('Selecione pelo menos um estabelecimento');
      return;
    }

    // Chamar callback para página principal mostrar confirmação
    if (onRequestSave) {
      onRequestSave(async () => {
        if (!user) throw new Error('Usuário não encontrado');

        // Obter IDs atuais
        const currentIds = user.establishments?.map(est => est.id) || [];

        // Calcular adições e remoções
        const toAdd = selectedEstablishmentIds.filter(id => !currentIds.includes(id));
        const toRemove = currentIds.filter(id => !selectedEstablishmentIds.includes(id));

        // Executar remoções
        for (const estId of toRemove) {
          await usersService.removeEstablishment(user.id, estId);
        }

        // Executar adições
        for (const estId of toAdd) {
          await usersService.addEstablishment(user.id, estId);
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

  const hasChanges = () => {
    if (!user) return false;
    const currentIds = user.establishments?.map(est => est.id) || [];

    if (selectedEstablishmentIds.length !== currentIds.length) return true;

    return !selectedEstablishmentIds.every(id => currentIds.includes(id));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Acesso aos Estabelecimentos"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Usuário e Perfil (read-only) */}
        <div className={styles.userInfoSection}>
          <div className={styles.infoRow}>
            <label className={styles.infoLabel}>Usuário</label>
            <div className={styles.infoValue}>
              {user?.fullName || 'N/A'}
            </div>
          </div>

          <div className={styles.infoRow}>
            <label className={styles.infoLabel}>Perfil</label>
            <div className={styles.infoValue}>
              {user?.groups?.[0]?.nmGroup || 'Sem perfil'}
            </div>
          </div>
        </div>

        {/* Estabelecimentos (multiselect) */}
        <div className={styles.field}>
          <Autocomplete
            label="Estabelecimentos"
            options={establishmentOptions}
            selectedValues={selectedEstablishmentIds}
            onChange={() => {}} // Not used in multiselect mode
            onMultiChange={(values) => {
              setSelectedEstablishmentIds(values as number[]);
              setError('');
            }}
            placeholder="Selecione os estabelecimentos..."
            multiSelect
            required
            disabled={loadingEstablishments}
            loading={loadingEstablishments}
            error={error && selectedEstablishmentIds.length === 0 ? error : undefined}
            emptyMessage="Nenhum estabelecimento disponível"
          />
          <div className={styles.hint}>
            Selecione os estabelecimentos aos quais o usuário terá acesso
          </div>
        </div>

        {/* Contador */}
        {selectedEstablishmentIds.length > 0 && (
          <div className={styles.counter}>
            {selectedEstablishmentIds.length} estabelecimento(s) selecionado(s)
          </div>
        )}

        {/* Error message */}
        {error && selectedEstablishmentIds.length > 0 && (
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
            disabled={loadingEstablishments || !hasChanges()}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
