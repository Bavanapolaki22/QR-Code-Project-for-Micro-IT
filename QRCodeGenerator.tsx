import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { CSPRNG } from '../../lib/crypto';

interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  scale: number;
  color: {
    dark: string;
    light: string;
  };
}

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qrImage, setQRImage] = useState<string>('');
  const [options, setOptions] = useState<QROptions>({
    errorCorrectionLevel: 'M',
    margin: 4,
    scale: 8,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    try {
      if (!text) {
        alert('Please enter text or Bitcoin address');
        return;
      }

      const qrDataUrl = await QRCode.toDataURL(text, {
        errorCorrectionLevel: options.errorCorrectionLevel,
        margin: options.margin,
        scale: options.scale,
        color: options.color
      });
      
      setQRImage(qrDataUrl);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate QR code');
    }
  };

  const downloadQR = () => {
    if (!qrImage) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrImage;
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Text or Bitcoin Address</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border rounded-lg h-24"
            placeholder="Enter text or Bitcoin address..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Error Correction</label>
            <select
              value={options.errorCorrectionLevel}
              onChange={(e) => setOptions({
                ...options,
                errorCorrectionLevel: e.target.value as QROptions['errorCorrectionLevel']
              })}
              className="w-full p-2 border rounded"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Margin Size</label>
            <input
              type="number"
              value={options.margin}
              onChange={(e) => setOptions({
                ...options,
                margin: parseInt(e.target.value)
              })}
              className="w-full p-2 border rounded"
              min="0"
              max="10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">QR Code Color</label>
            <input
              type="color"
              value={options.color.dark}
              onChange={(e) => setOptions({
                ...options,
                color: { ...options.color, dark: e.target.value }
              })}
              className="w-full p-1 border rounded h-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <input
              type="color"
              value={options.color.light}
              onChange={(e) => setOptions({
                ...options,
                color: { ...options.color, light: e.target.value }
              })}
              className="w-full p-1 border rounded h-10"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={generateQR}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generate QR Code
          </button>
          {qrImage && (
            <button
              onClick={downloadQR}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download PNG
            </button>
          )}
        </div>

        {qrImage && (
          <div className="mt-4 flex justify-center">
            <img
              src={qrImage}
              alt="Generated QR Code"
              className="border rounded-lg p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};