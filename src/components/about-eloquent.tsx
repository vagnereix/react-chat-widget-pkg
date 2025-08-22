import { Logo } from "@/assets/logo";

export function AboutEloquent() {
  return (
    <div className='flex flex-col items-center gap-2 my-6'>
      <div className="bg-chat-widget-brand p-1">
        <Logo className=" text-white size-10" />
      </div>

      <div className='flex flex-col items-center'>
        <span className='text-sm font-semibold'>Eloquent AI responds instantly</span>
        <span className='text-xs text-chat-widget-grey-30'>Ask me anything</span>
      </div>
    </div>
  )
}