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
import { ArrowLeftRight } from 'lucide-react'
  

const VCContainer = () => {
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
            <Button variant='outline' className='cursor-pointer'>
                <ArrowLeftRight />
                Sync Changes
            </Button>
        </div>
        <Branch />
    </div>
  )
}

export default VCContainer