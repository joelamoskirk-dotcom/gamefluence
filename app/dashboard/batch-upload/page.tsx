'use client';

import React from 'react';
import BatchContactUploaderComponent from '@/components/admin/BatchContactUploader';

export default function BatchUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <BatchContactUploaderComponent />
      </div>
    </div>
  );
}
