import { formatDistanceToNow, format, parseISO } from 'date-fns';

// Format currency (e.g., $120,000)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date as "X days/months ago" (e.g., "2 days ago")
export const formatDateFromNow = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Format date as "Month D, YYYY" (e.g., "June 15, 2023")
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};