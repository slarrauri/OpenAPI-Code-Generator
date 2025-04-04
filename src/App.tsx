import React, { useState, useEffect } from 'react';
import { Code, FileJson, Server, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { fetchLanguages, generateClient, generateServer } from '@/services/api';

function App() {
  const [generatorType, setGeneratorType] = useState<'client' | 'server'>('client');
  const [language, setLanguage] = useState<string>('');
  const [specSource, setSpecSource] = useState<'url' | 'file'>('url');
  const [specUrl, setSpecUrl] = useState<string>('');
  const [specFile, setSpecFile] = useState<File | null>(null);
  const [clientLanguages, setClientLanguages] = useState<string[]>([]);
  const [serverLanguages, setServerLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const { clientLanguages, serverLanguages } = await fetchLanguages();
        setClientLanguages(clientLanguages);
        setServerLanguages(serverLanguages);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load available languages",
          variant: "destructive",
        });
      }
    };

    loadLanguages();
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSpecFile(e.target.files[0]);
    }
  };

  const readFileAsJson = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          resolve(json);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      let spec;
      
      if (specSource === 'url') {
        if (!specUrl) {
          throw new Error('Please enter a valid URL');
        }
        
        // Fetch the spec from the URL
        const response = await fetch(specUrl);
        spec = await response.json();
      } else {
        if (!specFile) {
          throw new Error('Please select a file');
        }
        
        // Read the spec from the file
        spec = await readFileAsJson(specFile);
      }
      
      // Generate code based on the type
      let result;
      if (generatorType === 'client') {
        result = await generateClient(language, spec);
      } else {
        result = await generateServer(language, spec);
      }
      
      setGeneratedLink(result.link);
      
      toast({
        title: "Success!",
        description: `Your ${generatorType} code has been generated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            {generatorType === 'client' ? 
              <FileJson className="h-10 w-10 text-blue-500" /> : 
              <Server className="h-10 w-10 text-green-500" />
            }
          </div>
          <CardTitle className="text-2xl">OpenAPI Code Generator</CardTitle>
          <CardDescription>
            Generate client or server code from your OpenAPI specification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Generator Type</Label>
              <RadioGroup 
                defaultValue="client" 
                className="flex space-x-4"
                onValueChange={(value) => setGeneratorType(value as 'client' | 'server')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="client" />
                  <Label htmlFor="client" className="cursor-pointer">Client</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="server" id="server" />
                  <Label htmlFor="server" className="cursor-pointer">Server</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language / Framework</Label>
              <Select onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {generatorType === 'client' 
                    ? clientLanguages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))
                    : serverLanguages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>OpenAPI Specification</Label>
              <Tabs defaultValue="url" onValueChange={(value) => setSpecSource(value as 'url' | 'file')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-2">
                  <Input 
                    placeholder="https://example.com/api-spec.json" 
                    value={specUrl}
                    onChange={(e) => setSpecUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Enter the URL of your OpenAPI specification JSON</p>
                </TabsContent>
                <TabsContent value="file" className="space-y-2">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="openapi-file">Upload OpenAPI JSON</Label>
                    <Input 
                      id="openapi-file" 
                      type="file" 
                      accept=".json"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500">
                      {specFile ? `Selected: ${specFile.name}` : 'Upload your OpenAPI specification JSON file'}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reset
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !language}>
            {isLoading ? (
              <>Generating...</>
            ) : (
              <>
                Generate {generatorType === 'client' ? 'Client' : 'Server'} <Code className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedLink && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download Generated Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Download Generated Code</DialogTitle>
              <DialogDescription>
                Your code has been generated successfully. Click the link below to download.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <a 
                href={generatedLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Download Generated Code
              </a>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Generate Another
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Toaster />
    </div>
  );
}

export default App;
