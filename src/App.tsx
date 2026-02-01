import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { ManualEntryForm } from './components/ManualEntryForm';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { StartNewModal } from './components/StartNewModal';
import { PDFPreview } from './components/PDFPreview';
import { useCatalogue } from './context/CatalogueContext';

function App() {
  const {
    products,
    addImages,
    setDataFile,
    addProduct,
    clearAll,
    rawImages,
    dataFileName
  } = useCatalogue();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleStartNew = () => {
    setIsModalOpen(true);
  };

  const confirmStartNew = () => {
    clearAll();
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcess = () => {
    setIsPreviewOpen(true);
  };

  const handleManualProduct = (data: any) => {
    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      source: 'manual',
      ...data
    });
  };

  return (
    <Layout>
      {isPreviewOpen && <PDFPreview onClose={() => setIsPreviewOpen(false)} />}
      <Header onStartNew={handleStartNew} />

      <div className="space-y-8">
        <UploadSection
          onImagesDrop={addImages}
          onDataDrop={setDataFile}
          imageCount={rawImages.length}
          dataFileName={dataFileName}
        />

        <ManualEntryForm onAddProduct={handleManualProduct} />

        <ProductList />
      </div>

      <Footer productCount={products.length} onProcess={handleProcess} />

      <StartNewModal
        isOpen={isModalOpen}
        onConfirm={confirmStartNew}
        onCancel={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}

export default App;
