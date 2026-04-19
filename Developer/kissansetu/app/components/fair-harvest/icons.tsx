import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconBase({
  children,
  size = 24,
  viewBox = "0 0 24 24",
  ...props
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox={viewBox}
      width={size}
      {...props}
    >
      {children}
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.2-4.2" />
    </IconBase>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21s-6-5.4-6-11a6 6 0 1112 0c0 5.6-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </IconBase>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.5 4.5c.6-.6 1.4-.7 2.1-.2l2 1.4c.7.5.9 1.4.5 2.1l-1 1.7a14 14 0 006 6l1.7-1c.7-.4 1.6-.2 2.1.5l1.4 2c.5.7.4 1.5-.2 2.1l-1 1c-.8.8-2 1.2-3.2.9A20.7 20.7 0 013 8.7c-.3-1.2 0-2.4.9-3.2l1-1z" />
    </IconBase>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 11.5A8.5 8.5 0 105.4 18l-1 3 3.1-.8A8.5 8.5 0 1020 11.5z" />
      <path d="M9.5 8.7c.2-.4.6-.5 1-.4l1 .2c.4 0 .7.3.8.6l.4 1c.1.3 0 .7-.3 1l-.5.6a8.8 8.8 0 003.4 3.4l.6-.5c.3-.2.7-.4 1-.3l1 .4c.4.1.6.4.7.8l.2 1c0 .4-.1.8-.5 1a2.8 2.8 0 01-2.4.3A9.8 9.8 0 018.8 10a2.8 2.8 0 01.7-1.3z" />
    </IconBase>
  );
}

export function TrendUpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 16l6-6 4 4 6-6" />
      <path d="M14 8h6v6" />
    </IconBase>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M4.5 19a4.5 4.5 0 019 0" />
      <path d="M14.5 18a3.5 3.5 0 017 0" />
    </IconBase>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 10.5l3.5-3.5 3 3-2 2a2 2 0 102.8 2.8l2.2-2.2 3 3-3.5 3.4a3 3 0 01-4.2 0L3.5 14.7a3 3 0 010-4.2z" />
      <path d="M12 7l1.5-1.5a3 3 0 014.2 0l2.8 2.8a3 3 0 010 4.2l-.5.5" />
    </IconBase>
  );
}

export function UserCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.8 18a6.2 6.2 0 0110.4 0" />
    </IconBase>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5h2l2 10h9l2-7H7" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </IconBase>
  );
}

export function SignOutIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />
      <path d="M10 16l4-4-4-4" />
      <path d="M14 12H4" />
    </IconBase>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 8l8-4 8 4-8 4-8-4z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </IconBase>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M7 7l1 12h8l1-12" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </IconBase>
  );
}

