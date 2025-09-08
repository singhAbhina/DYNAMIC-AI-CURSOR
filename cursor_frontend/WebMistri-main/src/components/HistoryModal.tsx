import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Clock,
  Edit,
  Trash2,
  Search,
  Code,
  XCircle
} from 'lucide-react';
import { formatTimestamp, getHistory, deleteHistoryItem, WebsiteHistoryItem } from '@/utils/history-utils';

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  onSelectItem: (item: WebsiteHistoryItem) => void;
}

export default function HistoryModal({ open, onClose, onSelectItem }: HistoryModalProps) {
  const [history, setHistory] = useState<WebsiteHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (open) {
      refreshHistory();
    }
  }, [open]);
  
  const refreshHistory = () => {
    const items = getHistory();
    setHistory(items);
  };
  
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item from history?')) {
      const success = deleteHistoryItem(id);
      if (success) {
        refreshHistory();
      }
    }
  };
  
  const handleSelect = (item: WebsiteHistoryItem) => {
    onSelectItem(item);
    onClose();
  };
  
  const filteredHistory = history.filter(item => 
    item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Truncate prompt text if it's too long
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center text-white">
            <Clock className="h-5 w-5 mr-2 text-blue-400" />
            Website History
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            View and manage your previously generated websites
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by prompt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-white"
              onClick={() => setSearchTerm('')}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              {searchTerm ? (
                <>
                  <Search className="h-12 w-12 mb-2 opacity-30" />
                  <p>No matching items found</p>
                </>
              ) : (
                <>
                  <Code className="h-12 w-12 mb-2 opacity-30" />
                  <p>No history items yet</p>
                  <p className="text-sm mt-1">Generate your first website to see it here</p>
                </>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-700">
                  <TableHead className="text-gray-400 w-1/2">Prompt</TableHead>
                  <TableHead className="text-gray-400">Created</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow 
                    key={item.id} 
                    onClick={() => handleSelect(item)} 
                    className="cursor-pointer hover:bg-slate-800 border-slate-700"
                  >
                    <TableCell className="font-medium text-gray-300">{truncateText(item.prompt, 80)}</TableCell>
                    <TableCell className="text-gray-400">{formatTimestamp(item.timestamp)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-blue-500 hover:text-blue-400 hover:bg-slate-700"
                        onClick={() => handleSelect(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-slate-700"
                        onClick={(e) => handleDelete(item.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between border-t border-slate-700 pt-4">
          <div className="text-sm text-gray-500">
            {filteredHistory.length} {filteredHistory.length === 1 ? 'item' : 'items'} in history
          </div>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-slate-600 hover:bg-slate-800 text-gray-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}