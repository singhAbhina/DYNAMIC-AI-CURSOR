import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  HelpCircle,
  Sparkles,
  Send,
  Code,
  Layout,
  PanelTop,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WebsiteFormProps {
  onSubmit: (idea: string, type: string | null) => void;
  defaultValue?: string;
  onHistoryClick?: () => void;
}

export default function WebsiteForm({ onSubmit, defaultValue = '', onHistoryClick }: WebsiteFormProps) {
  const [idea, setIdea] = useState(defaultValue);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const exampleIdeas = [
    "Portfolio site",
    "Landing page for a product",
    "JavaScript calculator",
    "Mini e-commerce site"
  ];

  const websiteTypes = [
    { name: "Clean", icon: PanelTop },
    { name: "Normal", icon: Layout },
    { name: "Beautiful styling", icon: Code }
  ];

  const handleUseExample = (example: string) => {
    setIdea(example);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(idea, selectedType);
  };

  return (
    <Card className="h-full border-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl shadow-blue-900/30">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-violet-500 w-1 h-6 rounded-full mr-2"></div>
              <CardTitle className="text-white font-bold">Create New Project</CardTitle>
            </div>
            <Badge variant="outline" className="bg-blue-900/40 text-blue-300 border-blue-700 animate-pulse">
              CoderArmy💗
            </Badge>
          </div>
          <CardDescription className="text-gray-400 mt-1">
            Describe your project in detail for optimal AI generation
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="space-y-6">
            {/* Website Type Selection */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Layout className="h-4 w-4 mr-2 text-blue-400" />
                <label className="text-sm font-medium text-gray-200">Project Type</label>
              </div>
              <div className="flex flex-wrap gap-2 p-1">
                {websiteTypes.map(({ name, icon: Icon }, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => setSelectedType(name)}
                    size="sm"
                    className={`text-xs relative overflow-hidden transition-all duration-300 ${
                      selectedType === name
                        ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-700/40"
                        : "bg-slate-900/80 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-700"
                    }`}
                  >
                    <Icon className={`h-3 w-3 mr-1 ${selectedType === name ? "text-blue-200" : "text-blue-400"}`} />
                    {name}
                    {selectedType === name && (
                      <span className="absolute inset-0 bg-white/10 animate-pulse-slow opacity-20"></span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Code className="h-4 w-4 mr-2 text-blue-400" />
                  <label className="text-sm font-medium text-gray-200">Project Description</label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-blue-300">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-80 bg-slate-900 text-gray-300 border-gray-700">
                      <p className="text-sm">
                        <span className="font-bold text-blue-400">Pro tip:</span> Include specific details about layout, 
                        sections, features, color schemes, and look & feel for best results.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                placeholder="Example: A sleek portfolio with hero section, about, projects, and contact form. Dark theme preferred."
                className="min-h-[180px] resize-none bg-slate-900/70 border-slate-700 focus:border-blue-500 text-gray-300 
                placeholder:text-gray-500 rounded-md focus:ring-1 focus:ring-blue-500 transition-all"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />

              {/* Suggested Example Ideas */}
              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-3 w-3 mr-1 text-blue-400" />
                  <p className="text-xs font-medium text-gray-300">Quick ideas:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exampleIdeas.map((example, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs bg-transparent border-slate-700 text-gray-300 
                      hover:bg-blue-900/20 hover:text-blue-300 hover:border-blue-700 transition-colors"
                      onClick={() => handleUseExample(example)}
                    >
                      <Sparkles className="mr-1 h-3 w-3 text-blue-400" />
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
            text-white border-0 font-medium py-5 shadow-lg shadow-blue-900/30 transition-all hover:shadow-blue-900/50"
          >
            <Send className="mr-2 h-4 w-4" /> Generate Website
          </Button>
          
          {onHistoryClick && (
            <Button
              type="button"
              variant="outline"
              onClick={onHistoryClick}
              className="w-full bg-slate-800/60 border-slate-700 text-blue-400 hover:text-white hover:bg-blue-900/30 py-4 flex items-center justify-center"
            >
              <Clock className="h-4 w-4 mr-2" />
              <span>Show History</span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
