import { cn } from "@/lib/utils"

export default function LoadingCircle({
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div
      {...rest}
      className={cn(
        "w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin aspect-square",
        className
      )}
    />
  )
}
