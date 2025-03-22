import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@renderer/components/ui/card"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { Badge } from "@renderer/components/ui/badge"


import { Button } from '../ui/button'

const Branch = () => {
  return (
    <div className='w-1/4 p-2 h-screen bg-zinc-950'>
        <Card className='bg-zinc-900 h-[18%]'>
            <CardHeader>
                <CardTitle>Main</CardTitle>
                <CardDescription>origin/main</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm border border-zinc-500 inline p-2 px-4 rounded-md'>Default</p>
            </CardContent>
        </Card>
        <Card className='bg-zinc-900 mt-2 h-[62%]'>
            <CardHeader>
                <CardTitle className='flex items-center gap-3'>
                    Changes
                    <Badge variant="secondary" className='px-3'>1</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex items-center gap-2 hover:bg-zinc-700 p-3 rounded-sm'>
                    <Checkbox className='border-white' id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        readme.md
                    </label>
                </div>
            </CardContent>
        </Card>
        <Card className='bg-zinc-900 mt-2 h-[18%]'>
            <CardHeader>
                <CardTitle>Remote</CardTitle>
            </CardHeader>
            <CardContent>
                <Button className='w-full'>Commit</Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default Branch    