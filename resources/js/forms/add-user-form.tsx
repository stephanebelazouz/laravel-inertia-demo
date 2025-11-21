import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface AddUserFormProps {
    onSubmit?: (data: FormData) => void | Promise<void>;
}

export default function AddUserForm({ onSubmit = () => {} }: AddUserFormProps) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* FIRSTNAME */}
            <Field>
                <FieldLabel>First name</FieldLabel>
                <FieldContent>
                    <Input
                        {...register('firstname', {
                            required: 'Firstname is required',
                        })}
                    />
                    <FieldError
                        errors={
                            errors.firstname
                                ? [{ message: errors.firstname.message! }]
                                : []
                        }
                    />
                </FieldContent>
            </Field>

            {/* LASTNAME */}
            <Field>
                <FieldLabel>Last name</FieldLabel>
                <FieldContent>
                    <Input
                        {...register('lastname', {
                            required: 'Lastname is required',
                        })}
                    />
                    <FieldError
                        errors={
                            errors.lastname
                                ? [{ message: errors.lastname.message! }]
                                : []
                        }
                    />
                </FieldContent>
            </Field>

            {/* EMAIL */}
            <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                    <Input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email',
                            },
                        })}
                    />
                    <FieldError
                        errors={
                            errors.email
                                ? [{ message: errors.email.message! }]
                                : []
                        }
                    />
                </FieldContent>
            </Field>

            {/* PASSWORD */}
            <Field>
                <FieldLabel>Password</FieldLabel>
                <FieldContent>
                    <Input
                        type="password"
                        {...register('password', {
                            required: 'Password required',
                            minLength: {
                                value: 8,
                                message: 'Min 8 characters',
                            },
                        })}
                    />
                    <FieldDescription>
                        Your password must be strong.
                    </FieldDescription>
                    <FieldError
                        errors={
                            errors.password
                                ? [{ message: errors.password.message! }]
                                : []
                        }
                    />
                </FieldContent>
            </Field>

            {/* PASSWORD CONFIRMATION */}
            <Field>
                <FieldLabel>Confirm password</FieldLabel>
                <FieldContent>
                    <Input
                        type="password"
                        {...register('password_confirmation', {
                            required: 'Confirmation required',
                            validate: (value) =>
                                value === getValues('password') ||
                                'Password did not match',
                        })}
                    />
                    <FieldError
                        errors={
                            errors.password_confirmation
                                ? [
                                      {
                                          message:
                                              errors.password_confirmation
                                                  .message!,
                                      },
                                  ]
                                : []
                        }
                    />
                </FieldContent>
            </Field>

            <Button type="submit" className="w-full">
                Create user
            </Button>
        </form>
    );
}
