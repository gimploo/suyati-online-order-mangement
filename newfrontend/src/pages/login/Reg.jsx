import './reg.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';

export default function Reg() {
  return (
    <div className='bg'>
     <div className='form'>
       <span>Login</span>
         
         <form>
           <div className='username'>
           <MailOutlineIcon className='icon1'/> <input type='text'  placeholder='Enter the e-mail id'/>
            

           </div>
           <div className='password'>
           <LockIcon className='icon2' /><input type='password'  placeholder='Enter the password'/>
           </div>
           <div>
            <button className='button1'>Login</button>
           </div>

         </form>
         
         <div class="login-signup">
                    <span class="text">Not a member?
                       <a> Signup Now</a>
                    </span>
                </div>


     </div>

    </div>
  )
}
