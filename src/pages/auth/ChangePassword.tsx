import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowLeft } from "react-icons/ai";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../../components/FormInputs/TextInput2";
import { Button } from "../../components/Button/Button";
import { authServices } from "../../services/auth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../zustand/auth.store";
import { AuthActions } from "../../zustand/auth.store";
import { AxiosError } from 'axios';

interface FormValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ChangePassword() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get user info from auth store
    const profile = useAuth((state) => state.profile);
    const isLoggedIn = useAuth((state) => !!state.token);

    // Get email directly from auth store
    const email = useAuth((state) => state.email);

    // Get email from URL query params as fallback
    const queryParams = new URLSearchParams(location.search);
    const emailFromURL = queryParams.get('email');


    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const payload = {
                email: email || '',
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                role: 'MANUFACTURER_STAFF'
            };

            await authServices.changePassword(payload);

            toast.success('Password changed successfully');

            if (profile?.onboardingStep === "CHANGE_PASSWORD") {
                const updatedProfile = { ...profile, onboardingStep: null };
                AuthActions.setProfile(updatedProfile);
            }

            // Redirect to dashboard
            navigate('/distributors');
        } catch (error: unknown) {
            const axiosError = error as AxiosError<any>;
            toast.error(axiosError.response?.data?.message || 'Failed to change password');
        } finally {
            setSubmitting(false);
        }
    };

    // Add function to go back
    const goBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="max-w-md w-full py-12 px-8">
                {/* Add back button at the top */}
                <button
                    onClick={goBack}
                    className="flex items-center text-blue-500 mb-6 hover:underline"
                >
                    <AiOutlineArrowLeft className="mr-1" /> Back
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
                    {(profile?.email || emailFromURL) && (
                        <p className="mt-1 text-sm text-gray-600">
                            For email: <span className="font-medium">{profile?.email || emailFromURL}</span>
                        </p>
                    )}
                    <p className="mt-1 text-sm text-gray-600">
                        Email: <span className="font-medium">{email}</span>
                    </p>
                    <p className="mt-2 text-gray-600">
                        {profile?.onboardingStep === "CHANGE_PASSWORD"
                            ? "You need to change your password before continuing"
                            : "Update your password"}
                    </p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div className="space-y-4">
                                <div className="relative">
                                    <TextInput
                                        label="Current Password"
                                        name="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Enter your current password"
                                        rightIcon={
                                            showOldPassword ? (
                                                <AiOutlineEye size={24} className='cursor-pointer' />
                                            ) : (
                                                <AiOutlineEyeInvisible size={24} />
                                            )
                                        }
                                        onRightIconClick={() => setShowOldPassword(!showOldPassword)}
                                    />
                                </div>

                                <div className="relative">
                                    <TextInput
                                        label="New Password"
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        rightIcon={
                                            showPassword ? (
                                                <AiOutlineEye size={24} className='cursor-pointer' />
                                            ) : (
                                                <AiOutlineEyeInvisible size={24} />
                                            )
                                        }
                                        onRightIconClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>

                                <div className="relative">
                                    <TextInput
                                        label="Confirm New Password"
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        rightIcon={
                                            showPassword ? (
                                                <AiOutlineEye size={24} className='cursor-pointer' />
                                            ) : (
                                                <AiOutlineEyeInvisible size={24} />
                                            )
                                        }
                                        onRightIconClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                            </div>

                            <Button
                                label="Change Password"
                                isLoading={isSubmitting}
                                type="submit"
                                className="w-full"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
} 