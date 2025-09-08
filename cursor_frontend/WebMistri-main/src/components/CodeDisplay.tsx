import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Download } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { downloadWebsiteCode } from '@/utils/download-utils';

interface CodeDisplayProps {
  code: string;
  language: 'html' | 'css' | 'js';
  onCodeChange?: (newCode: string) => void;
  editable?: boolean;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
  projectName?: string;
}

export default function CodeDisplay({ 
  code, 
  language, 
  onCodeChange, 
  editable = true,
  htmlCode = '',
  cssCode = '',
  jsCode = '',
  projectName = 'website-mistri-project'
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    // If we're in a specific language view, use the htmlCode, cssCode, jsCode props
    // Otherwise use what's currently in the editor
    try {
      setDownloading(true);
      const html = language === 'html' ? code : htmlCode;
      const css = language === 'css' ? code : cssCode;
      const js = language === 'js' ? code : jsCode;
      
      await downloadWebsiteCode(html, css, js, projectName);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onCodeChange) {
      onCodeChange(e.target.value);
    }
  };

  const getLanguageClass = () => {
    switch (language) {
      case 'html':
        return 'language-html';
      case 'css':
        return 'language-css';
      case 'js':
        return 'language-javascript';
      default:
        return '';
    }
  };

  const getLanguagePlaceholder = () => {
    switch (language) {
      case 'html':
        return 'Edit HTML here...';
      case 'css':
        return 'Edit CSS here...';
      case 'js':
        return 'Edit JavaScript here...';
      default:
        return 'Edit code here...';
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        {(htmlCode || cssCode || jsCode) && (
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDownload}
            disabled={downloading}
            className="h-8 w-8 bg-background/90 backdrop-blur"
            title="Download as ZIP"
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 w-8 bg-background/90 backdrop-blur"
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      {editable ? (
        <Textarea
  className="font-mono text-sm text-white h-[500px] resize-none bg-black"
  value={code}
  onChange={handleCodeChange}
  placeholder={getLanguagePlaceholder()}
  spellCheck={false}
/>
      ) : (
        <div className="overflow-x-auto rounded-md border bg-muted p-4">
          <pre className={`text-sm ${getLanguageClass()}`}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}