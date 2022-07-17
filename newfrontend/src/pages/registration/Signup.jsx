import "./signup.css"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

export default function Signup() {
  return (
    <div className='bg'>
    <div className='form1'>
      <span>Registration</span>
        
        <form>
        <div className='username'>
          <PersonIcon  className='icon1'/> <input type='text'  placeholder='Username'/>
           

          </div>
          <div className='username'>
          <MailOutlineIcon className='icon1'/> <input type='text'  placeholder='Enter the e-mail id'/>
           

          </div>
          <div className='password'>
          <LockIcon className='icon2' /><input type='password'  placeholder='Enter your password'/>
          </div>
          <div className='password'>
          <PasswordIcon className='icon2' /><input type='password'  placeholder='Re-Enter your password'/>
          </div>
          <div>
           <button className='button1'>Login</button>
          </div>

        </form>
        
        {/* <div class="login-signup">
                   <span class="text">Not a member?
                      <a href=''> Signup Now</a>
                   </span>
               </div> */}


    </div>

   </div>
  )
}
