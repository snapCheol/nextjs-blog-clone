'use client';

import Link from 'next/link';
import { FC } from 'react';

import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsRobot } from 'react-icons/bs';
import IconButton from './IconButton';
import { useSidebar } from './Providers';

const Header: FC = () => {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <header className="flex h-16 items-center justify-between border-b lg:px-10">
      <IconButton
        onClick={() => setIsOpen((t) => !t)}
        Icon={isOpen ? AiOutlineClose : AiOutlineMenu}
        label="sidebarToggle"
        className="p-2"
      />
      <Link href="/">
        <h1 className="text-3xl font-medium text-slate-600">Blog</h1>
      </Link>
      <IconButton
        Icon={BsRobot}
        component={Link}
        label="chatbotLink"
        href="/search"
      />
    </header>
  );
};

export default Header;
