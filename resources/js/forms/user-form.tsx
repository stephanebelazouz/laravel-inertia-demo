import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
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
interface UserFormProps {
    mode?: 'create' | 'update';
    defaultValues?: Partial<FormData>;
    onSubmit?: (data: FormData) => void | Promise<void>;
}

export default function UserForm({
    mode = 'create',
    defaultValues = {},
    onSubmit = () => {},
}: UserFormProps) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues,
    });

    const isUpdate = mode === 'update';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        {...register('email', {
                            required: 'Email is required',
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

            {/* PASSWORD only when creating */}
            {!isUpdate && (
                <>
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
                            <FieldError
                                errors={
                                    errors.password
                                        ? [
                                              {
                                                  message:
                                                      errors.password.message!,
                                              },
                                          ]
                                        : []
                                }
                            />
                        </FieldContent>
                    </Field>

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
                                                      errors
                                                          .password_confirmation
                                                          .message!,
                                              },
                                          ]
                                        : []
                                }
                            />
                        </FieldContent>
                    </Field>
                </>
            )}

            <Button type="submit" className="w-full">
                {isUpdate ? 'Update user' : 'Create user'}
            </Button>
        </form>
    );
}
