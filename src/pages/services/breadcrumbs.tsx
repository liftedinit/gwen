import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@liftedinit/ui";
import { Link } from "react-router-dom";

export function Breadcrumbs({ title }: { title: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/settings">
          Services
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{title}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
