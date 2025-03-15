import React from 'react'
import { Button } from "@renderer/components/ui/button"
import avatar from "../../assets/self.jpg"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@renderer/components/ui/card"
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@renderer/components/ui/sidebar"
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@renderer/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@renderer/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { cn } from '@renderer/lib/utils'
import { Check, ChevronsUpDown, CircleDot, Dot, Plus } from 'lucide-react'

const branches = [
  {
    name: "Main",
    url: "#",
    icon: () => <CircleDot />,
  },
  {
    name: "Feature",
    url: "#",
    icon: () => <Dot />,
  },
  {
    name: "Bugfix",
    url: "#",
    icon: () => <Dot />,
  }
]

const repositories = [
  {
    value: "versioncontrolsystem",
    label: "Version-Control-System",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]


type CardProps = React.ComponentProps<typeof Card>

const SideBar = ({ className, ...props }: CardProps) => {
  const [repoMenuOpen, setRepoMenuOpen] = React.useState(false)
  const [currentRepo, setCurrentRepo] = React.useState("")

  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false)
  const [currentProfile, setCurrentProfile] = React.useState("")
  return (
    <Sidebar>
      <SidebarHeader>
        <Popover open={repoMenuOpen} onOpenChange={setRepoMenuOpen}>
          <PopoverTrigger>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={repoMenuOpen}
              className="w-full py-6 cursor-pointer justify-between"
            >
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/67109815?v=4" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              {currentRepo
                ? repositories.find((repository) => repository.value === currentRepo)?.label
                : "Select repository..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search repository..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {repositories.map((repository) => (
                    <CommandItem
                      key={repository.value}
                      value={repository.value}
                      onSelect={(currentValue) => {
                        setCurrentRepo(currentValue === currentRepo ? "" : currentValue)
                        setRepoMenuOpen(false)
                      }}
                    >
                      {repository.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          currentRepo === repository.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Branches</SidebarGroupLabel>
          <SidebarGroupAction title="Add Branch">
            <Plus /> <span className="sr-only">Add Branch</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {branches.map((branch) => (
                <SidebarMenuItem key={branch.name}>
                  <SidebarMenuButton asChild>
                    <a href={branch.url}>
                      <branch.icon />
                      <span>{branch.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>     
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Popover open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
          <PopoverTrigger>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={profileMenuOpen}
              className="w-full py-6 cursor-pointer justify-between"
            >
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              {currentProfile
                ? repositories.find((repository) => repository.value === currentProfile)?.label
                : "Noel George"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search repository..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {repositories.map((repository) => (
                    <CommandItem
                      key={repository.value}
                      value={repository.value}
                      onSelect={(currentValue) => {
                        setCurrentRepo(currentValue === currentRepo ? "" : currentValue)
                        setRepoMenuOpen(false)
                      }}
                    >
                      {repository.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          currentRepo === repository.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SideBar