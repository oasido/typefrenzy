// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { z } from 'zod';

const schema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username should have at least 2 letters' })
      .max(15, { message: 'Username cannot be more than 15 characters' }),
    password: z.string().min(6, { message: 'Password needs to be at least 6 characters' }),
    email: z.string().email(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    const usernameSearch = await supabase.from('users').select().eq('username', username);
    const emailSearch = await supabase.from('users').select().eq('email', email);

    const zodValidation = schema.safeParse(req.body);

    if (zodValidation.success === false) {
      return res.send({
        success: false,
        error: 'Error, did you fill all the fields correctly?',
      });
    }

    // if everything is OK
    if (usernameSearch.body?.length === 0 && emailSearch.body?.length === 0) {
      // encrypt + hash passwords
      const { error } = await supabase
        .from('users')
        .insert([{ username, email, password: password }]);
      if (error) {
        return res.json({
          success: false,
          error: error.message,
        });
      } else {
        return res.json({ success: true });
      }
    }

    // if email is already used
    if (usernameSearch.body?.length === 0 && emailSearch.body?.length !== 0) {
      return res.json({ success: false, error: 'Email is already used.' });
    }

    // if username is already used
    if (usernameSearch.body?.length !== 0 && emailSearch.body?.length === 0) {
      return res.json({ success: false, error: 'Username taken.' });
    }

    // if username & email already in db
    return res.json({ success: false, error: 'I think I already know you.' });
  } else {
    return res.status(500).json({ success: false, error: 'Only POST is supported.' });
  }
}
