import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const PDFUpload = ({ 
  onFileUpload,
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  disabled = false,
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError(null);

    // Validate files
    const validFiles = selectedFiles.filter(file => {
      // Check file type
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        setError("Only PDF files are allowed");
        return false;
      }

      // Check file size
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds ${maxSize / (1024 * 1024)}MB limit`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      if (multiple) {
        setFiles(prev => [...prev, ...validFiles]);
      } else {
        setFiles(validFiles.slice(0, 1)); // Only keep first file if not multiple
      }
    }
  };

  const handleRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one PDF file");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      await onFileUpload(multiple ? files : files[0]);
      if (!multiple) {
        setFiles([]); // Clear after successful upload for single file mode
      }
    } catch (err) {
      setError(err.message || "Failed to upload PDF");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          disabled ? 'bg-gray-100 border-gray-200' : 'border-gray-300 hover:border-green-500 cursor-pointer'
        }`}
        onClick={!disabled ? triggerFileInput : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf"
          multiple={multiple}
          disabled={disabled || uploading}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <div className="flex flex-col items-center">
            <Label className="text-sm font-medium text-green-600 hover:text-green-500 cursor-pointer">
              {multiple ? "Upload PDF files" : "Upload a PDF file"}
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              {multiple ? "Drag & drop multiple PDFs or click to browse" : "Drag & drop a PDF or click to browse"}
            </p>
            <p className="text-xs text-gray-500">
              Max size: {maxSize / (1024 * 1024)}MB per file
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500"
                onClick={() => handleRemove(index)}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {files.length > 0 && !disabled && (
        <Button
          className="w-full"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            `Upload ${files.length} PDF${files.length > 1 ? 's' : ''}`
          )}
        </Button>
      )}

      {uploading && (
        <Progress value={50} className="h-2" />
      )}
    </div>
  );
};

export default PDFUpload;