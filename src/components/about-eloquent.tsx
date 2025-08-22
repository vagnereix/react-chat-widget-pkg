import { LogoWithBrand } from "@/components/logo-with-brand";

export function AboutEloquent() {
  return (
    <div className='flex flex-col items-center gap-2 my-6'>
      <LogoWithBrand size="large" className="p-1 rounded-none" />

      <div className='flex flex-col items-center'>
        <span className='text-sm font-semibold'>Eloquent AI responds instantly</span>
        <span className='text-xs text-chat-widget-grey-30'>Ask me anything</span>
      </div>
    </div>
  )
}