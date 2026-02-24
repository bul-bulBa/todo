import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";


import { redirect } from '@tanstack/react-router'

export const authGuard = () => {
  const session = localStorage.getItem('session');

  if (!session) return redirect({to: '/auth/register'});
};

export const guestGuard = () => {
  const session = localStorage.getItem('session');

  if (session) return redirect({to: '/'});
};