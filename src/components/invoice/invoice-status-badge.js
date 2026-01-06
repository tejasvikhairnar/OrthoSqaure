import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";



export function InvoiceStatusBadge({ status }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Partial":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Unpaid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Badge className={cn("capitalize", getStatusClasses(status))}>
      {status}
    </Badge>
  );
}