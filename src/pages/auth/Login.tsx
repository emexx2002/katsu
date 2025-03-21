import { useEffect } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import TextInput from "../../components/FormInputs/TextInput2";
import { useMutation } from "react-query";
import { authServices } from "../../services/auth";
import Spinner from "../../components/spinner/Spinner";
import { AuthActions } from "../../zustand/auth.store";



// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("*Email must be a valid address")
    .required("*Email is required"),
  password: Yup.string().trim().required("*Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { showPassword, handleClickShowPassword } = usePasswordToggle();
  const router = useLocation();

  // const [isLoading, setIsLoading] = useState(false);

  // Login detail
  const userLoginInfo = {
    email: "",
    password: "",
    role: "MANUFACTURER_STAFF"
  };

  const handleLogin = useMutation(
    async (values: any) => {
      // Store email for later access
      window.sessionStorage.setItem('login_email', values.email);
      return await authServices.login(values);
    }, {
    onSuccess: (data) => {


      // Check user data structure
      const email = window.sessionStorage.getItem('login_email') || '';


      // Store email explicitly
      AuthActions.setEmail(email);

      toast.success("Login successful");


      if (data.onboardingStep === "CHANGE_PASSWORD") {
        window.location.href = '/change-password'; // Use hard redirect\
        // navigate('/change-password');

      } else {
        AuthActions.setProfile(data);
        AuthActions.setToken(data.jwt);
        navigate('/distributors');
      }
    }
  });



  return (
    <main className='h-full'>
      <div className=" h-full flex justify-center items-center">
        <div className='bg-white rounded-2xl lg:w-[560px] py-11 px-9'>
          <h2 className='text-2xl font-extrabold font-satoshi text-black mb-2'>
            Sign In
          </h2>

          <Formik
            initialValues={userLoginInfo}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              if (values) {
                // handleSubmit(values);
                handleLogin.mutate(values)
              }
            }}
          >
            {() => {
              return (
                <Form className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4'>
                    <TextInput
                      name='email'
                      type='email'
                      placeholder='Email address'

                    />
                    <TextInput
                      name='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Enter your password'

                      rightIcon={
                        showPassword ? (
                          <AiOutlineEye size={24} className='cursor-pointer' />
                        ) : (
                          <AiOutlineEyeInvisible size={24} />
                        )
                      }
                      onRightIconClick={handleClickShowPassword}
                    />
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-2 rounded'>
                      <input
                        id='remember-me'
                        type='checkbox'
                        className='w-5 h-5'
                      />
                      <label htmlFor='remember-me' className='text-xs'>
                        Remember me
                      </label>
                    </div>
                    <Link to='/forgot-password'>
                      <a className='text-xs text-primary font-satoshiBold'>
                        Forgot password?
                      </a>
                    </Link>
                  </div>
                  <button
                    type='submit'
                    disabled={false}
                    className='bg-primary w-full text-white inline-flex items-center justify-center text-center p-2.5 font-extrabold font-satoshiBold disabled:bg-opacity-50'
                  >

                    {handleLogin.isLoading ? <Spinner /> : "Sign In"}
                  </button>
                  {/* <p className='text-sm text-left'>
                    Don't have an account?{" "}
                    <Link to='/onboarding'>
                      <a className='text-primary font-bold'>Sign up</a>
                    </Link>
                  </p> */}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </main>
  );
}
