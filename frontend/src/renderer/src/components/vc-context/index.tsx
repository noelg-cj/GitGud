import React from 'react'
import Branch from '../branch'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@renderer/components/ui/breadcrumb"
import { Button } from '@renderer/components/ui/button'
import { ArrowDown, ArrowLeftRight, ArrowUp } from 'lucide-react'
import { Separator } from '@renderer/components/ui/separator'

const { ipcRenderer } = window.require("electron"); // Import ipcRenderer

const VCContainer = () => {
  const handleSyncChanges = () => {
    ipcRenderer.invoke("sync-changes"); // Send IPC message to main process
  };
  const push = () => {
    ipcRenderer.invoke("push-changes"); // Send IPC message to main process
  };

  return (
    <div className='h-screen overflow-hidden w-screen'>
        <div className='w-[100%] p-7 h-[10%] bg-zinc-900 flex items-center gap-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Origin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/main">Main</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Button
              variant='outline'
              className='cursor-pointer'
              onClick={handleSyncChanges} // Attach event handler
            >
                <ArrowDown />
                Pull
            </Button>
            <Button
              variant='outline'
              className='cursor-pointer'
              onClick={push} // Attach event handler
            >
                <ArrowUp />
                Push Changes
            </Button>
        </div>
        <div className='flex w-full h-full'>
            <Branch />
            <Separator orientation='vertical' />
            <div className='w-[70%] h-[90%] flex flex-col items-center justify-center'>
                <h6>Changes you made to a file appear here.</h6>
                <p className='text-sm text-zinc-400'>Select a file to see it's changes</p>
            </div>
        </div>
    </div>
  )
}

export default VCContainer