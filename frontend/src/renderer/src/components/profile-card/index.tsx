import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@renderer/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { Button } from "@renderer/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@renderer/components/ui/command"

import avatar from "../../assets/self.jpg"
import { Check, ChevronsUpDown } from 'lucide-react'


const ProfileCard = () => {
    const [profileMenuOpen, setProfileMenuOpen] = React.useState(false)
    const [currentProfile, setCurrentProfile] = React.useState("")

  return (
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
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
  )
}

export default ProfileCard