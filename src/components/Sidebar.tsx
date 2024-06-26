"use client";

import {
  BellIcon,
  Cookie,
  CreditCard,
  Inbox,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import UserItem from "./UserItem";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import Link from "next/link";
export default function Sidebar() {
  const menuList = [
    {
      group: "عام",
      items: [
        // {
        //   link: "/admin/",
        //   icon: <User />,
        //   text: "المسؤولين",
        // },
        // {
        //   link: "/admin/",
        //   icon: <Inbox />,
        //   text: "الشكاوى",
        // },
        {
          link: "/admin/add-category",
          icon: <CreditCard />,
          text: "فئات",
        },
        // {
        //   link: "/admin/",
        //   icon: <BellIcon />,
        //   text: "اﻹشعارات",
        // },
      ],
    },
    {
      group: "مستخدمين",
      items: [
        {
          link: "/admin/stores",
          icon: <Settings />,
          text: "متاجر",
        },
        {
          link: "/admin/users",
          icon: <Cookie />,
          text: "مستخدمين",
        },
        // {
        //   link: "/admin/",
        //   icon: <MessageSquare />,
        //   text: "Logs",
        // },
      ],
    },
  ];
  return (
    <div className="fixed flex flex-col gap-4  p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                  <Link href={option.link} key={optionKey}>
                    <CommandItem className="flex gap-2 cursor-pointer">
                      {option.icon}
                      {option.text}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
