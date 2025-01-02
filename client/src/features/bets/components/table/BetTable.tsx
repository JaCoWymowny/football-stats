import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import GlobalLoader from '@/components/ui/GLobalLoader';

interface TableProps<T> {
  data: T[];
  columns: (keyof T)[];
  columnHeaders: string[];
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  onNextPage: () => void;
  onPreviousPage: () => void;
  currentPage: number;
  totalPages: number;
  onRowClick?: (row: T) => void;
}

const BetTable = <T,>({
  data,
  columns,
  columnHeaders,
  isPending,
  isError,
  errorMessage,
  onNextPage,
  onPreviousPage,
  currentPage,
  totalPages,
  onRowClick,
}: TableProps<T>) => {
  if (isPending) {
    return <GlobalLoader />;
  }

  if (isError) {
    return <div className='text-center p-4 text-red-600'>{errorMessage || 'Wystąpił błąd.'}</div>;
  }

  return (
    <div className='w-[90%] border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            {columnHeaders.map((header, index) => (
              <TableHead key={index} className={`border-l border-gray-300 text-center`}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-100' : ''}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={`${colIndex > 0 ? 'text-center border-l border-gray-300' : ''}`}
                >
                  {row[col] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center p-4'>
        <Button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Poprzednia
        </Button>
        <span>
          Strona {currentPage} z {totalPages}
        </span>
        <Button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Następna
        </Button>
      </div>
    </div>
  );
};

export default BetTable;
