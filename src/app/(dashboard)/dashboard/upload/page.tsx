'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
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
  Database,
  Zap,
  Clock,
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
      return <Database className="h-8 w-8 text-primary" />;
    }
    if (file.type.includes('pdf')) {
      return <FileText className="h-8 w-8 text-primary/80" />;
    }
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-primary/60" />;
    }
    return <File className="h-8 w-8 text-primary/40" />;
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
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
          >
            <Database className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Data Upload Center
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your operational data files and let our AI analyze
            performance instantly. Supports Excel, CSV, and various data
            formats.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8 border-2 border-dashed border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-8">
              <motion.div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden
                  ${
                    isDragActive || dropzoneActive
                      ? 'border-primary bg-primary/10 scale-[1.02] shadow-xl'
                      : 'border-primary/30 hover:border-primary hover:bg-primary/5 hover:shadow-lg'
                  }
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input {...getInputProps()} />

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23081425' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '60px 60px',
                    }}
                  />
                </div>

                <div className="flex flex-col items-center space-y-6 relative z-10">
                  <motion.div
                    className={`p-6 rounded-full ${
                      isDragActive || dropzoneActive
                        ? 'bg-primary/20'
                        : 'bg-primary/10'
                    }`}
                    animate={
                      isDragActive || dropzoneActive
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      repeat: isDragActive ? Infinity : 0,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: isDragActive ? 360 : 0 }}
                      transition={{
                        duration: 2,
                        repeat: isDragActive ? Infinity : 0,
                        ease: 'linear',
                      }}
                    >
                      <Upload
                        className={`h-16 w-16 ${
                          isDragActive || dropzoneActive
                            ? 'text-primary'
                            : 'text-primary/80'
                        }`}
                      />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-2xl font-semibold text-foreground mb-2">
                        {isDragActive || dropzoneActive
                          ? 'Drop your files here!'
                          : 'Upload Your Data Files'}
                      </p>
                      <p className="text-muted-foreground text-lg mb-6">
                        Drag & drop files here or click to browse your computer
                      </p>
                    </motion.div>

                    {/* File Type Badges */}
                    <motion.div
                      className="flex flex-wrap gap-3 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {[
                        {
                          name: 'Excel',
                          icon: Database,
                          color: 'bg-primary/10 text-primary border-primary/30',
                        },
                        {
                          name: 'CSV',
                          icon: FileSpreadsheet,
                          color: 'bg-primary/10 text-primary border-primary/30',
                        },
                        {
                          name: 'PDF',
                          icon: FileText,
                          color: 'bg-primary/10 text-primary border-primary/30',
                        },
                        {
                          name: 'Images',
                          icon: ImageIcon,
                          color: 'bg-primary/10 text-primary border-primary/30',
                        },
                      ].map((type, index) => (
                        <motion.div
                          key={type.name}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge
                            variant="outline"
                            className={`${type.color} px-3 py-1 text-sm font-medium flex items-center gap-2`}
                          >
                            <type.icon className="h-4 w-4" />
                            {type.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Upload Stats */}
                    <motion.div
                      className="flex items-center justify-center gap-6 pt-4 border-t border-primary/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>Up to 50MB</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Instant Processing</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Uploaded Files */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Database className="h-5 w-5 text-primary" />
                        </motion.div>
                        Uploaded Files ({uploadedFiles.length})
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Track the progress of your file uploads and processing
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      {
                        uploadedFiles.filter((f) => f.status === 'completed')
                          .length
                      }{' '}
                      Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {uploadedFiles.map((uploadedFile, index) => (
                        <motion.div
                          key={uploadedFile.id}
                          initial={{ opacity: 0, x: -20, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 20, scale: 0.95 }}
                          transition={{ delay: index * 0.1 }}
                          className="group"
                        >
                          <motion.div
                            className={`
                              flex items-center space-x-4 p-4 border rounded-xl transition-all duration-300
                              ${
                                uploadedFile.status === 'completed'
                                  ? 'border-primary/30 bg-primary/5'
                                  : uploadedFile.status === 'error'
                                  ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30'
                                  : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5'
                              }
                            `}
                            whileHover={{ scale: 1.01 }}
                            layout
                          >
                            {/* File Icon */}
                            <motion.div
                              className="flex-shrink-0"
                              animate={
                                uploadedFile.status === 'uploading'
                                  ? { scale: [1, 1.1, 1] }
                                  : {}
                              }
                              transition={{
                                duration: 1,
                                repeat:
                                  uploadedFile.status === 'uploading'
                                    ? Infinity
                                    : 0,
                              }}
                            >
                              {getFileIcon(uploadedFile.file)}
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {uploadedFile.file.name}
                                </p>
                                <div className="flex items-center space-x-2">
                                  {uploadedFile.status === 'completed' && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: 'spring',
                                        duration: 0.5,
                                      }}
                                    >
                                      <CheckCircle className="h-5 w-5 text-primary" />
                                    </motion.div>
                                  )}
                                  {uploadedFile.status === 'error' && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: 'spring',
                                        duration: 0.5,
                                      }}
                                    >
                                      <AlertCircle className="h-5 w-5 text-red-500" />
                                    </motion.div>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(uploadedFile.id)}
                                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                <span className="flex items-center gap-2">
                                  <span>
                                    {formatFileSize(uploadedFile.file.size)}
                                  </span>
                                  {uploadedFile.status === 'completed' && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-primary/10 text-primary border-primary/30"
                                    >
                                      Ready
                                    </Badge>
                                  )}
                                </span>
                                <span
                                  className={`font-medium ${
                                    uploadedFile.status === 'completed'
                                      ? 'text-primary'
                                      : uploadedFile.status === 'error'
                                      ? 'text-red-500'
                                      : 'text-muted-foreground'
                                  }`}
                                >
                                  {uploadedFile.status === 'completed'
                                    ? 'Complete'
                                    : uploadedFile.status === 'error'
                                    ? 'Error'
                                    : `${Math.round(uploadedFile.progress)}%`}
                                </span>
                              </div>

                              {uploadedFile.status === 'uploading' && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <Progress
                                    value={uploadedFile.progress}
                                    className="h-2 bg-primary/20"
                                  />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {uploadedFiles.some((f) => f.status === 'completed') && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 pt-4 border-t border-primary/20"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg">
                          <Zap className="h-4 w-4 mr-2" />
                          Process Uploaded Files
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
