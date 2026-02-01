import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface UploadSectionProps {
    onImagesDrop: (files: File[]) => void;
    onDataDrop: (file: File) => void;
    imageCount: number;
    dataFileName: string | null;
}

export function UploadSection({ onImagesDrop, onDataDrop, imageCount, dataFileName }: UploadSectionProps) {

    // Image Dropzone
    const onDropImages = useCallback((acceptedFiles: File[]) => {
        onImagesDrop(acceptedFiles);
    }, [onImagesDrop]);

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
        onDrop: onDropImages,
        accept: { 'image/*': [] }
    });

    // Data Dropzone
    const onDropData = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onDataDrop(acceptedFiles[0]);
        }
    }, [onDataDrop]);

    const { getRootProps: getDataRootProps, getInputProps: getDataInputProps, isDragActive: isDataDragActive } = useDropzone({
        onDrop: onDropData,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        },
        maxFiles: 1
    });

    return (
        <section id="upload-section" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Images */}
            <div
                {...getImageRootProps()}
                className={clsx(
                    "relative rounded-3xl border-2 border-dashed p-8 md:p-12 transition-all cursor-pointer group",
                    isImageDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
                    imageCount > 0 && "border-blue-500 bg-blue-50/30"
                )}
            >
                <input {...getImageInputProps()} />
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className={clsx(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                        isImageDragActive || imageCount > 0 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                    )}>
                        {imageCount > 0 ? <CheckCircle2 className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {imageCount > 0 ? `${imageCount} Images Uploaded` : "Upload Images"}
                        </h3>
                        <p className="text-gray-500 mt-2">
                            {imageCount > 0 ? "Drag more to add to collection" : "Drag & drop folder or individual images"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Box 2: Data */}
            <div
                {...getDataRootProps()}
                className={clsx(
                    "relative rounded-3xl border-2 border-dashed p-8 md:p-12 transition-all cursor-pointer group",
                    isDataDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400 hover:bg-gray-50",
                    dataFileName && "border-green-500 bg-green-50/30"
                )}
            >
                <input {...getDataInputProps()} />
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className={clsx(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                        isDataDragActive || dataFileName ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400 group-hover:bg-green-50 group-hover:text-green-500"
                    )}>
                        {dataFileName ? <CheckCircle2 className="w-8 h-8" /> : <FileSpreadsheet className="w-8 h-8" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {dataFileName ? "Data File Linked" : "Upload Data (Optional)"}
                        </h3>
                        <p className="text-gray-500 mt-2 break-all">
                            {dataFileName ? dataFileName : "Drag & drop CSV or Excel file"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
