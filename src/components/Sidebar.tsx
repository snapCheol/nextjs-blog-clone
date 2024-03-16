import { cn } from '@/utils/style';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from './IconButton';

type SidebarProps = {
  close: () => void;
  isOpen: boolean;
};

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  return (
    <div
      className={cn(
        'absolute z-10 min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <IconButton Icon={AiOutlineClose} onClick={close} />
      </div>
      <Link href="/" className="w-48 to-gray-600 font-medium hover:underline">
        홈
      </Link>
      <Link
        href="/tag"
        className="w-48 to-gray-600 font-medium hover:underline"
      >
        태그
      </Link>
      <Link
        href="/category/Web-Development"
        className="w-48 to-gray-600 font-medium hover:underline"
      >
        Web Development
      </Link>

      <div className="mt-10 flex items-center gap-4">
        <IconButton component={Link} Icon={AiFillInstagram} href="#none" />
        <IconButton component={Link} Icon={AiFillGithub} href="#none" />
      </div>
    </div>
  );
};

export default Sidebar;
