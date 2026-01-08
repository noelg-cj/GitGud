import { useUIStore } from '@renderer/store/ui-store'
import { SendHorizontal } from 'lucide-react';

const CommandBar = () => {
    const { isCommandBarOpen, toggleCommandBar } = useUIStore();
    if (isCommandBarOpen) console.log("HI");
  return (
    <div className='fixed flex items-center justify-between p-1 bottom-8 bg-[#05041C] border border-white/15 w-[560px] rounded-[8px] left-1/2 -translate-x-1/2'>
      <div className='p-2 rounded-[6px] text-white/15 px-4 w-fit h-fit border border-white/15'>/</div>
      <div className='pr-16 text-white/15'>Type / or Cmd K to type a command</div>
      <div className='p-2 rounded-[6px] text-black/50 bg-[#313576] w-fit h-fit border border-white/15'>
        <SendHorizontal />
      </div>
    </div>
  )
}

export default CommandBar