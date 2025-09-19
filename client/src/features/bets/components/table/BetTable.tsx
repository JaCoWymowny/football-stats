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
    return (
      <div className='text-center p-4 text-red-600'>{errorMessage || 'An error occurred.'}</div>
    );
  }

  return (
    <div className='w-full max-w-4xl mx-auto border rounded-md bg-background_light p-2 tablet:p-6'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            {columnHeaders.map((header, index) => (
              <TableHead
                key={index}
                className={`border-b border-gray-400 text-center text-[0.66rem] tablet:text-sm ${
                  index < columnHeaders.length - 1 ? 'border-r' : ''
                }`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={
                onRowClick ? 'cursor-pointer border-gray-400 hover:bg-gray-100' : 'border-gray-400'
              }
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={`${
                    colIndex > 0 ? 'text-center border-l border-gray-400' : ''
                  } text-[0.66rem] tablet:text-sm`}
                >
                  {row[col] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center p-4 text-[0.66rem] tablet:text-sm'>
        <Button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          variant='secondary'
          className='px-4 py-2 rounded'
        >
          Previous
        </Button>
        <div className='flex flex-col'>
          <span className='text-center w-full'>Page</span>
          <span className='text-center w-full'>{`${currentPage} of ${totalPages}`}</span>
        </div>
        <Button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          variant='secondary'
          className='px-4 py-2 rounded'
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BetTable;
