'use client';

import React, { useState, useRef } from 'react';
import { BatchContactUploader as Uploader, BatchContact, ContactPipeline, BatchUploadResult } from '@/lib/batch-contact-upload';
import { Button } from '@/components/ui/Button';
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Users,
  Loader,
  Copy,
} from 'lucide-react';

interface BatchContactUploaderProps {
  defaultPipeline?: ContactPipeline;
}

export default function BatchContactUploaderComponent({ defaultPipeline }: BatchContactUploaderProps) {
  const [pipeline, setPipeline] = useState<ContactPipeline>(defaultPipeline || 'gamefluence');
  const [inputMode, setInputMode] = useState<'paste' | 'file'>('paste');
  const [csvText, setCsvText] = useState('');
  const [uploadResult, setUploadResult] = useState<BatchUploadResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [defaultMarket, setDefaultMarket] = useState('');
  const [contactedBy, setContactedBy] = useState('Joel');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
    };
    reader.readAsText(file);
  };

  const handlePastePreview = () => {
    if (!csvText.trim()) return;
    
    const rows = Uploader.parseCSV(csvText);
    const result = Uploader.processBatch(rows, pipeline, {
      source: 'manual_upload',
      contactedBy,
      defaultMarket: defaultMarket || undefined,
    });
    setUploadResult(result);
  };

  const handleSubmitToAPI = async () => {
    if (!csvText.trim()) return;
    setIsUploading(true);

    try {
      const rows = Uploader.parseCSV(csvText);
      
      const response = await fetch('/api/batch-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: rows,
          pipeline,
          options: {
            source: 'manual_upload',
            contactedBy,
            defaultMarket: defaultMarket || undefined,
          },
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setUploadResult({
          ...result,
          contacts: result.sampleContacts || [],
        });
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const csv = Uploader.getCSVTemplate(pipeline);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pipeline}_contacts_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTemplate = () => {
    const csv = Uploader.getCSVTemplate(pipeline);
    navigator.clipboard.writeText(csv);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Batch Contact Upload</h2>
          <p className="text-gray-600 text-sm">Upload contacts for outreach tracking and pipeline management</p>
        </div>
      </div>

      {/* Pipeline Selection */}
      <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pipeline</label>
          <div className="flex gap-2">
            <button
              onClick={() => setPipeline('gamefluence')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                pipeline === 'gamefluence'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              🎮 Gamefluence (APAC Gaming)
            </button>
            <button
              onClick={() => setPipeline('mobileyes')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                pipeline === 'mobileyes'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              🎬 Mobileyes (AU Live Talent)
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Market</label>
          <select
            value={defaultMarket}
            onChange={(e) => setDefaultMarket(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Auto-detect</option>
            {pipeline === 'gamefluence' ? (
              <>
                <option value="Vietnam">Vietnam</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Thailand">Thailand</option>
                <option value="Philippines">Philippines</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapore">Singapore</option>
              </>
            ) : (
              <>
                <option value="Australia">Australia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="APAC">APAC</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contacted By</label>
          <input
            type="text"
            value={contactedBy}
            onChange={(e) => setContactedBy(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm w-32"
          />
        </div>
      </div>

      {/* Template & Format Help */}
      <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <div className="flex-1 text-sm text-blue-800">
          <strong>CSV format:</strong> name, platform, handle, profile_url, email, phone, location, followers, avg_viewers, engagement_rate, content_focus, market, notes
        </div>
        <button onClick={handleDownloadTemplate} className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
          <Download className="w-4 h-4" /> Template
        </button>
        <button onClick={handleCopyTemplate} className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
          <Copy className="w-4 h-4" /> Copy
        </button>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setInputMode('paste')}
          className={`px-4 py-2 text-sm rounded-lg ${inputMode === 'paste' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          📋 Paste CSV
        </button>
        <button
          onClick={() => setInputMode('file')}
          className={`px-4 py-2 text-sm rounded-lg ${inputMode === 'file' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          📁 Upload File
        </button>
      </div>

      {/* Input Area */}
      {inputMode === 'paste' ? (
        <div>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`Paste your CSV data here...\n\nExample:\nname,platform,handle,profile_url,followers,market\nStreamKing,kick,StreamKingAU,https://kick.com/StreamKingAU,85000,Australia`}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">
            {csvText ? `${csvText.trim().split('\n').length - 1} data rows detected` : 'Supports K/M notation for followers (e.g. 85K, 4.4M)'}
          </p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt,.tsv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">Drop a CSV file or click to browse</p>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="text-sm">
            Choose File
          </Button>
          {csvText && (
            <p className="text-sm text-green-600 mt-3">
              ✓ File loaded ({csvText.trim().split('\n').length - 1} rows)
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handlePastePreview}
          disabled={!csvText.trim()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> Preview & Validate
        </Button>
        <Button
          onClick={handleSubmitToAPI}
          disabled={!csvText.trim() || isUploading}
          className="flex items-center gap-2 bg-indigo-600 text-white"
        >
          {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {isUploading ? 'Uploading...' : 'Upload to Pipeline'}
        </Button>
      </div>

      {/* Results */}
      {uploadResult && (
        <div className="space-y-4">
          {/* Summary */}
          <div className={`p-4 rounded-lg border ${
            uploadResult.invalidRows === 0 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {uploadResult.invalidRows === 0 ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              )}
              <h3 className="font-semibold text-gray-900">
                Upload {uploadResult.invalidRows === 0 ? 'Successful' : 'Completed with Warnings'}
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{uploadResult.totalRows}</div>
                <div className="text-xs text-gray-500">Total Rows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{uploadResult.validRows}</div>
                <div className="text-xs text-gray-500">Valid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{uploadResult.invalidRows}</div>
                <div className="text-xs text-gray-500">Invalid</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-mono text-gray-500 break-all">{uploadResult.batchId}</div>
                <div className="text-xs text-gray-500">Batch ID</div>
              </div>
            </div>
          </div>

          {/* Errors */}
          {uploadResult.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Validation Errors
              </h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {uploadResult.errors.slice(0, 20).map((err, i) => (
                  <p key={i} className="text-sm text-red-700">
                    Row {err.row}: {err.error}
                  </p>
                ))}
                {uploadResult.errors.length > 20 && (
                  <p className="text-sm text-red-600 font-medium">
                    + {uploadResult.errors.length - 20} more errors
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Preview Table */}
          {uploadResult.contacts.length > 0 && (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Uploaded Contacts (showing first {Math.min(uploadResult.contacts.length, 10)})
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Name</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Platform</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Handle</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Followers</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Market</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Tier</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {uploadResult.contacts.slice(0, 10).map((c, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-3 py-2 font-medium">{c.name}</td>
                        <td className="px-3 py-2">
                          {c.platform === 'kick' ? '🟢' : c.platform === 'twitch' ? '🟣' : c.platform === 'youtube' ? '🔴' : c.platform === 'tiktok' ? '🎵' : '📺'}{' '}
                          {c.platform}
                        </td>
                        <td className="px-3 py-2 font-mono text-xs">@{c.handle}</td>
                        <td className="px-3 py-2">{c.followerCount?.toLocaleString() || '—'}</td>
                        <td className="px-3 py-2">{c.market || '—'}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            c.tier === 'diamond' ? 'bg-blue-100 text-blue-700' :
                            c.tier === 'platinum' ? 'bg-purple-100 text-purple-700' :
                            c.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                            c.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {c.tier || '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
