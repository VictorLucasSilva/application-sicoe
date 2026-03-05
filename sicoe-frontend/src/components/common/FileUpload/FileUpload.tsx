import { useRef, useState } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  accept: string;
  maxSize: number;
  multiple?: boolean;
  files: File[];
  onFilesChange: (files: File[]) => void;
  errors?: (string | null)[];
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default function FileUpload({
  accept,
  maxSize,
  multiple = false,
  files,
  onFilesChange,
  errors = [],
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {

    const acceptedTypes = accept.split(',').map(t => t.trim());
    if (!acceptedTypes.includes(file.type)) {
      return 'Tipo de arquivo não permitido. Apenas PDF é aceito.';
    }


    if (file.size > maxSize) {
      return `Arquivo excede o limite de ${formatFileSize(maxSize)}`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList) => {
    const filesArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const newErrors: (string | null)[] = [];

    filesArray.forEach(file => {
      const error = validateFile(file);
      if (!error) {
        validFiles.push(file);
      }
      newErrors.push(error);
    });

    if (multiple) {
      onFilesChange([...files, ...validFiles]);
    } else {
      onFilesChange(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className={styles.hiddenInput}
      />

      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className={styles.mainText}>
          <strong>+ ADICIONAR ARQUIVO</strong>
        </p>
        <p className={styles.hintText}>OU SOLTE ARQUIVOS AQUI</p>
        <p className={styles.formatText}>
          Formato aceito: PDF | Tamanho máximo: {formatFileSize(maxSize)}
        </p>
      </div>

      {}
      {files.length > 0 && (
        <div className={styles.filesList}>
          {files.map((file, idx) => (
            <div
              key={idx}
              className={`${styles.fileItem} ${errors[idx] ? styles.error : ''}`}
            >
              <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
              </div>
              {errors[idx] && (
                <span className={styles.errorMessage}>{errors[idx]}</span>
              )}
              <button
                className={styles.removeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(idx);
                }}
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
