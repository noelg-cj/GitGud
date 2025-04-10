import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@renderer/components/ui/card"

  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@renderer/components/ui/sheet"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { Badge } from "@renderer/components/ui/badge"
import { Input } from "@renderer/components/ui/input"
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@renderer/components/ui/form"
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
  })

const BranchForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Commit Message</FormLabel>
                        <FormControl>
                            <Input placeholder="Updated readme.md" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Updated readme.md" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

const Branch = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
  return (
    <div className='w-[30%] p-2 pb-0 h-[90vh] bg-zinc-950'>
        <Card className='bg-zinc-900 h-[18%] gap-5'>
            <CardHeader>
                <CardTitle>Main</CardTitle>
                <CardDescription>origin/main</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm border border-zinc-500 inline p-1 px-2 rounded-md'>Default</p>
            </CardContent>
        </Card>
        <Card className='bg-zinc-900 mt-2 h-[60%] gap-2'>
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
                        main.cpp
                    </label>
                </div>
            </CardContent>
        </Card>
        <Card className='bg-zinc-900 mt-2 h-[18%]'>
            <CardHeader>
                <CardTitle>Remote</CardTitle>
            </CardHeader>
            <CardContent>
                <Sheet>
                    <SheetTrigger className='w-full'>
                        <Button className='w-full'>
                            Commit
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[50vw] bg-zinc-900">
                        <SheetHeader>
                            <SheetTitle>Commit</SheetTitle>
                            <SheetDescription>
                                Commit changes to the repository.
                            </SheetDescription>
                        </SheetHeader>
                        <BranchForm />
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    </div>
  )
}

export default Branch    