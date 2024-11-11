import {type Cookies, redirect} from '@sveltejs/kit';

/*
Set a flash message in the cookies;
 */
export const putFlash = (cookies: Cookies, messages: FlashMessage) => {
  // set max age 1 second
  const flashMessageString = btoa(JSON.stringify(messages));
  const cookiesOptions = {
    secure: false, httpOnly: false, path: '/', maxAge: 12
  };
  cookies.set('flash_message', flashMessageString, cookiesOptions);
};

/*
Set a flash message in the cookies and redirect to a new location
 */
export const flashRedirect: FlashRedirect = (
  cookies, message,
  status, location
) => {
  putFlash(cookies, {...message, path: location.toString()});
  return redirect(status, location);
};

export default flashRedirect;
