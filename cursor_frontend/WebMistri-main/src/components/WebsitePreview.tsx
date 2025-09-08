import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2, Download } from 'lucide-react';
import { downloadWebsiteCode } from '@/utils/download-utils';

interface WebsitePreviewProps {
  html: string;
  css: string;
  js: string;
  projectName?: string;
}

export default function WebsitePreview({ 
  html, 
  css, 
  js,
  projectName = 'website-mistri-project'
}: WebsitePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Create the full HTML document as a string
  const iframeContent = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${projectName}</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
  }, [html, css, js, projectName]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadWebsiteCode(html, css, js, projectName);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleFullscreenChange = () => {
    // Check if we're entering or exiting fullscreen mode using cross-browser approach
    const fullscreenElement = 
      document.fullscreenElement || 
      document.webkitFullscreenElement || 
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    
    const isCurrentlyFullscreen = fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  // Add event listener for fullscreen change for cross-browser compatibility
  useEffect(() => {
    const fullscreenEvents = [
      'fullscreenchange', 
      'webkitfullscreenchange', 
      'mozfullscreenchange', 
      'MSFullscreenChange'
    ];
    
    // Register all possible fullscreen change events for cross-browser compatibility
    fullscreenEvents.forEach(eventType => {
      document.addEventListener(eventType, handleFullscreenChange);
    });
    
    return () => {
      // Clean up all event listeners
      fullscreenEvents.forEach(eventType => {
        document.removeEventListener(eventType, handleFullscreenChange);
      });
    };
  }, []);

  const toggleFullscreenMode = async () => {
    try {
      // Get the current fullscreen element using a cross-browser compatible approach
      const fullscreenElement = 
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      
      if (!fullscreenElement) {
        // Enter fullscreen mode with cross-browser support
        const element = iframeRef.current?.parentElement;
        if (element) {
          if (element.requestFullscreen) {
            await element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) {
            await element.webkitRequestFullscreen();
          } else if (element.mozRequestFullScreen) {
            await element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            await element.msRequestFullscreen();
          } else {
            // Fallback if API not available
            toggleFullscreen();
          }
        }
      } else {
        // Exit fullscreen mode with cross-browser support
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        } else {
          // Fallback if API not available
          toggleFullscreen();
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen mode:", error);
      // Fallback to the CSS-based approach
      toggleFullscreen();
    }
  };

  return (
    <div className={`preview-container relative transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[9999] p-4 bg-black/90' : ''}`}>
      <Card className={`bg-white rounded-md border overflow-hidden shadow-lg ${isFullscreen ? 'h-full' : ''}`}>
        <div className="h-10 bg-gradient-to-r from-slate-100 to-gray-100 border-b flex items-center px-4">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"></div>
            <div className="h-3 w-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"></div>
          </div>
          <div className="mx-auto text-xs font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Live Preview
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDownload}
              disabled={downloading}
              className="h-7 w-7 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Download as ZIP"
            >
              <Download className={`h-4 w-4 ${downloading ? 'animate-pulse' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreenMode}
              className="h-7 w-7 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="relative bg-white h-full" id="preview-container">
          {isFullscreen && (
            <div className="absolute top-2 right-2 z-10 bg-black/50 text-xs text-white px-2 py-1 rounded-md opacity-70">
              Fullscreen Mode
            </div>
          )}
          <iframe
            ref={iframeRef}
            srcDoc={iframeContent}
            title="Website Preview"
            className={`w-full border-0 ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[500px]'}`}
            sandbox="allow-scripts allow-same-origin"
            onLoad={(e) => {
              try {
                const iframe = e.currentTarget;
                const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
                
                if (iframeDocument) {
                  // Prevent links from navigating away by handling clicks
                  const links = iframeDocument.getElementsByTagName('a');
                  for (let i = 0; i < links.length; i++) {
                    links[i].addEventListener('click', (e) => {
                      e.preventDefault();
                    });
                  }
                }
              } catch (error) {
                console.log('Could not access iframe content');
              }
            }}
          />
        </div>
      </Card>
    </div>
  );
}