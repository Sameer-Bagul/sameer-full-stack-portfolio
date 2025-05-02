
import { BookOpen, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StudyMaterial } from '@/data/studyData';

interface StudyTableProps {
  materials: StudyMaterial[];
  onReadMaterial: (id: number) => void;
}

export function StudyTable({ materials, onReadMaterial }: StudyTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id} className="group">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                    <material.icon size={16} />
                  </div>
                  <div>
                    {material.title}
                    <div className="text-sm text-muted-foreground">{material.description.substring(0, 30)}...</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">{material.category}</Badge>
              </TableCell>
              <TableCell>{material.date}</TableCell>
              <TableCell>{material.fileSize}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100"
                    onClick={() => onReadMaterial(material.id)}
                  >
                    <BookOpen size={14} />
                    <span className="sr-only">Open</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100"
                  >
                    <Download size={14} />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
