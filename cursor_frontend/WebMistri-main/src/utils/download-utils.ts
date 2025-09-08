import JSZip from 'jszip';

// Function to create a zip file from HTML, CSS, and JavaScript content
export const createZipFile = async (
  html: string, 
  css: string, 
  js: string,
  projectName: string = 'website-mistri-project'
): Promise<Blob> => {
  const zip = new JSZip();
  
  // Add files to zip
  zip.file('index.html', html);
  zip.file('styles.css', css);
  zip.file('script.js', js);
  
  // Create README file with some basic information
  const readmeContent = `# ${projectName}\n\nThis project was generated with Website Mistri AI.\n\n## Files\n\n- index.html: Main HTML file\n- styles.css: CSS styles\n- script.js: JavaScript functionality\n\n## How to use\n\n1. Extract all files to the same folder\n2. Open index.html in your browser\n3. To make edits, use any code editor`;
  
  zip.file('README.md', readmeContent);
  
  // Generate the zip file
  return await zip.generateAsync({ type: 'blob' });
};

// Function to trigger download of a file
export const downloadFile = (content: Blob, fileName: string): void => {
  // Create a download link
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  // Append to body, trigger click and remove
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

// Main function to handle the download of website code
export const downloadWebsiteCode = async (
  html: string,
  css: string,
  js: string,
  projectName: string = 'website-mistri-project'
): Promise<void> => {
  try {
    const zipBlob = await createZipFile(html, css, js, projectName);
    downloadFile(zipBlob, `${projectName}.zip`);
  } catch (error) {
    console.error('Error creating zip file:', error);
    throw new Error('Failed to create download file');
  }
};