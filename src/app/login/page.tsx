'use client';

import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { loginSP } from '../apis/login.api';

const Login = async () => {
  return (
    <div className='w-full h-full bg-gray-50 mt-[200px] flex'>
      <Card className='w-[300px] m-auto'>
        <CardHeader className='text-indigo-300'>Login Form</CardHeader>
        <CardBody>
          <form
            className=' flex'
            action={async (formData) => {
              // 'use server';
              const res = await loginSP(formData);
              if (res?.data?.auth_token) {
                redirect('/dashboard');
              } else {
                redirect('/login');
              }
            }}
          >
            <div className='flex flex-col gap-2 m-auto '>
              <Input name='email' type='text' placeholder='Username' />
              <Input name='password' type='password' placeholder='Password' />
              <Button type='submit'>Login</Button>
            </div>
          </form>
          {/* <form
            action={async () => {
              'use server';
              await logout();
              redirect('/login');
            }}
          >
            <div className='flex flex-col gap-2 m-auto w-[170px] mt-2'>
              <Button type='submit' color='danger'>
                Logout
              </Button>
            </div>
          </form> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
