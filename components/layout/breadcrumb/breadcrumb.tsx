import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { BreadcrumbItemType } from "@/types/breadcrumb-types";
import { HomeIcon } from "lucide-react";

interface BreadcrumbComponentProps {
  items: BreadcrumbItemType[];
}

const BreadcrumbComponent = ({ items }: BreadcrumbComponentProps) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <div className="flex justify-center items-center gap-2">
              <BreadcrumbLink href="/">
                <HomeIcon />
              </BreadcrumbLink>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </div>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {items.map((item, index) =>
            item.isCurrent ? (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage
                  className={item.color ? `text-${item.color}` : ""}
                >
                  {item.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className={item.color ? `text-${item.color}` : ""}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComponent;
