import React, { useState, useEffect } from 'react';
import { X, HardDrive, ExternalLink, Trash2, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { listPowerXDriveFiles, deleteFileFromDrive, DriveFileItem } from '../services/googleDrive';
import { User } from 'firebase/auth';

interface GoogleDriveFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onGoogleSignIn: () => void;
}

export const GoogleDriveFilesModal: React.FC<GoogleDriveFilesModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onGoogleSignIn,
}) => {
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Destructive action state (Mandatory confirmation modal)
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchFiles = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetched = await listPowerXDriveFiles();
      setFiles(fetched);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch files from Google Drive.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchFiles();
    }
  }, [isOpen, currentUser]);

  const confirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteFileFromDrive(fileToDelete.id);
      setSuccessMessage(`Deleted "${fileToDelete.name}" from Google Drive.`);
      setFileToDelete(null);
      await fetchFiles();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(`Failed to delete: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0D0F16] border border-white/15 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sports text-2xl font-black uppercase text-white">
                Google Drive Quote Documents
              </h3>
              <p className="text-xs text-neutral-400">
                {currentUser ? `Connected as ${currentUser.email}` : 'Connect to access stored specifications'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {successMessage && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/30 rounded-lg text-xs text-red-300">
              {error}
            </div>
          )}

          {!currentUser ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-950/40 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                <HardDrive className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sports text-2xl font-bold uppercase text-white">
                  Connect Google Drive
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Sign in with Google to automatically backup, view, and organize custom order specifications and tech pack summaries in your Google Drive.
                </p>
              </div>

              {/* Official Google Sign In Button */}
              <button
                onClick={onGoogleSignIn}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white text-gray-800 hover:bg-gray-100 rounded-lg text-sm font-semibold shadow-md transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">
                  {files.length} saved specification document{files.length === 1 ? '' : 's'}
                </span>
                <button
                  onClick={fetchFiles}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-red-500" />
                  Loading your Google Drive files...
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-10 bg-neutral-900/50 rounded-xl border border-white/5 space-y-2">
                  <HardDrive className="w-8 h-8 text-neutral-500 mx-auto" />
                  <p className="text-xs text-neutral-400">
                    No PowerX Sports specifications found in your Drive yet.
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Submit a quotation on the website to automatically generate and save your first tech pack document.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3.5 bg-neutral-900/80 border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="truncate">
                          <strong className="text-white block truncate">{file.name}</strong>
                          <span className="text-[10px] text-neutral-400">
                            {file.createdTime ? new Date(file.createdTime).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => setFileToDelete(file)}
                          className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded"
                          title="Delete from Google Drive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explicit Confirmation Dialog for Deletion (MANDATORY per Workspace Skill) */}
        {fileToDelete && (
          <div className="absolute inset-0 z-50 bg-black/90 p-6 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950 border border-red-500 text-red-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="font-sports text-2xl font-black uppercase text-white">
                Delete File From Google Drive?
              </h4>
              <p className="text-xs text-neutral-300 max-w-sm">
                Are you sure you want to permanently delete <strong className="text-white">"{fileToDelete.name}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase rounded-lg shadow-lg flex items-center gap-1.5"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
