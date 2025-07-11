import React from 'react';
import { useTheme } from '../context';

interface Column {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  width?: string | number;
}

interface TableProps {
  columns: Column[];
  dataSource: any[];
  loading?: boolean;
  pagination?: boolean;
  rowKey?: string | ((record: any) => string);
}

export const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  loading = false,
  pagination = true,
  rowKey = 'id'
}) => {
  const { theme } = useTheme();

  const getRowKey = (record: any, index: number) => {
    if (typeof rowKey === 'function') return rowKey(record);
    return record[rowKey] || index;
  };

  if (loading) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: theme.colors.textSecondary
      }}>
        Carregando...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: theme.colors.surface,
      borderRadius: '12px',
      overflow: 'hidden',
      border: `1px solid ${theme.colors.border}`
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr style={{
            backgroundColor: theme.mode === 'light' ? '#fafafa' : theme.colors.background
          }}>
            {columns.map((col, index) => (
              <th key={col.key || col.dataIndex || index} style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: 600,
                color: theme.colors.text,
                borderBottom: `1px solid ${theme.colors.border}`,
                width: col.width
              }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, rowIndex) => (
            <tr key={getRowKey(record, rowIndex)} style={{
              borderBottom: `1px solid ${theme.colors.border}`
            }}>
              {columns.map((col, colIndex) => (
                <td key={col.key || col.dataIndex || colIndex} style={{
                  padding: '16px',
                  color: theme.colors.text
                }}>
                  {col.render 
                    ? col.render(record[col.dataIndex], record, rowIndex)
                    : record[col.dataIndex]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {dataSource.length === 0 && (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: theme.colors.textSecondary
        }}>
          Nenhum dado encontrado
        </div>
      )}
    </div>
  );
};