"use client"
import { Button, ButtonProps } from "@mantine/core";
import { signIn } from "next-auth/react";

export function SignInButton({
  icon,
  ...props
}: ButtonProps &
  React.ComponentPropsWithoutRef<'button'> & {
    icon: React.ReactNode;
  }) {
    return <Button leftSection={icon} variant="default" onClick={() => signIn("google")} {...props} />;
}
