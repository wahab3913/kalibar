'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  FileText,
  ImageIcon,
} from 'lucide-react';
import Link from 'next/link';

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading' as const,
      preview: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === uploadFile.id) {
              const newProgress = Math.min(
                f.progress + Math.random() * 30,
                100
              );
              const newStatus = newProgress === 100 ? 'completed' : f.status;
              return { ...f, progress: newProgress, status: newStatus };
            }
            return f;
          })
        );
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, progress: 100, status: 'completed' }
              : f
          )
        );
      }, 3000);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive,
  } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  });

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (file: File) => {
    if (
      file.type.includes('spreadsheet') ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.csv')
    ) {
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
    }
    if (file.type.includes('pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              Upload Files
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Drag and drop your files here or click to browse. Supports Excel,
              CSV, PDF and text files up to 50MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200
                ${
                  isDragActive || dropzoneActive
                    ? 'border-primary bg-primary/5 scale-[1.02]'
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={`p-4 rounded-full ${
                    isDragActive || dropzoneActive
                      ? 'bg-primary/10'
                      : 'bg-muted'
                  }`}
                >
                  <Upload
                    className={`h-12 w-12 ${
                      isDragActive || dropzoneActive
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    {isDragActive || dropzoneActive
                      ? 'Drop files here'
                      : 'Drag & drop files here'}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    or click to select files from your computer
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary">Excel</Badge>
                    <Badge variant="secondary">CSV</Badge>
                    <Badge variant="secondary">PDF</Badge>
                    <Badge variant="secondary">Images</Badge>
                    <Badge variant="secondary">Text</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                Uploaded Files ({uploadedFiles.length})
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Track the progress of your file uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center space-x-4 p-4 border border-border rounded-lg bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground truncate">
                          {uploadedFile.file.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          {uploadedFile.status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {uploadedFile.status === 'error' && (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(uploadedFile.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{formatFileSize(uploadedFile.file.size)}</span>
                        <span>
                          {uploadedFile.status === 'completed'
                            ? 'Complete'
                            : uploadedFile.status === 'error'
                            ? 'Error'
                            : `${Math.round(uploadedFile.progress)}%`}
                        </span>
                      </div>

                      {uploadedFile.status === 'uploading' && (
                        <Progress
                          value={uploadedFile.progress}
                          className="h-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {uploadedFiles.some((f) => f.status === 'completed') && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Process Uploaded Files
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
